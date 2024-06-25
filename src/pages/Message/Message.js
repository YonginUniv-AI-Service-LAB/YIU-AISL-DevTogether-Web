import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Row, Col, Flex, message } from "antd";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import SectionHeader from "../../components/Group/SectionHeader/SectionHeader";
import MessageDetail from "./MessageDetail";
import {
  MessageAtom,
  MessageListAtom,
  MessageViewStatusAtom,
} from "../../recoil/atoms/message";
import {
  MessageSelector,
  ReceivedMessagesSelector,
} from "../../recoil/selectors/messageSelector";
import axios from "axios";
import { data_message } from "../../assets/data/message";
import PageHeaderImage from "../../assets/images/PageHeaderImage/message.svg";
import PageHeaderImage_White from "../../assets/images/PageHeaderImage/message_white.svg";
import { authAPI, refreshAccessToken } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import PleaseLoginView from "../../components/Result/PleaseLogin";

const MessagePage = () => {
  const fetchMessageData = async (isRetry) => {
    const admin = sessionStorage.getItem("role") == 1 ? "mentor" : "mentee";
    try {
      const res = await authAPI.get(`/message/${admin}`);
      let curMessage = res.data.filter(
        (message) =>
          message.toUserId == sessionStorage.getItem("user_profile_id")
      )[0];
      setMessages(res.data);
      setCurMessage(res.data.length > 0 ? curMessage : null);
      return res.data;
    } catch (err) {
      if (err.response && err.response.status === 401 && !isRetry) {
        const isTokenRefreshed = await refreshAccessToken();
        if (isTokenRefreshed) {
          return fetchMessageData(true); // 갱신 후 재시도
        } else {
          throw new Error("토큰 갱신 실패");
        }
      } else if (err.response && err.response.status === 403) {
        message.error("권한이 없습니다.");
        throw new Error("권한 없음");
      } else {
        throw err;
      }
    }
  };

  const useMessageQuery = () => {
    return useQuery({
      queryKey: ["msg"],
      queryFn: () => fetchMessageData(false),
      retry: false, // 401이나 403 에러를 위해 자동 재시도를 비활성화
    });
  };

  const { data: msg, isLoading, error } = useMessageQuery();
  // useEffect(() => {
  //   console.log("receivedMessages? ", msg, receivedMessages[0]);
  //   setCurMessage(msg.length > 0 ? receivedMessages[0] : null);
  // }, []);
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 전체 쪽지 목록
  const [messages, setMessages] = useRecoilState(MessageListAtom);
  // 현재 선택된 쪽지 내용
  const [curMessage, setCurMessage] = useRecoilState(MessageAtom);
  // 받은 쪽지함 데이터 => 첫번째 데이터를 default로 설정하기 위해
  const receivedMessages = useRecoilValue(ReceivedMessagesSelector);
  // 현재 선택된 왼쪽 뷰 => 상세보기 | 작성폼
  const [leftView, setLeftView] = useRecoilState(MessageViewStatusAtom);

  // const { data } = useQuery(["data_message"], getMessageData);

  if (!sessionStorage.getItem("name")) {
    return (
      <div>
        <PageHeader
          title="쪽지"
          subtitle="멘토/멘티와 주고받은 쪽지를 확인해보세요."
          image={PageHeaderImage_White}
        />
        <PleaseLoginView onClick={() => navigate("/signin")} />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (error) {
    return <GetDataErrorView />;
  }

  return (
    <div>
      <PageHeader
        title="쪽지"
        subtitle="멘토/멘티와 주고받은 쪽지를 확인해보세요."
        image={PageHeaderImage_White}
      />

      <div
        style={{
          margin: 50,
          marginLeft: isMobile ? 50 : 100,
          marginRight: isMobile ? 50 : 100,
        }}
      >
        <Flex
          vertical={isMobile || isTablet ? true : false}
          justify="space-between"
          align="flex-start"
          gap="large"
        >
          {leftView === true ? <MessageDetail /> : <MessageForm />}
          <MessageList />
        </Flex>
      </div>
    </div>
  );
};

export default MessagePage;
