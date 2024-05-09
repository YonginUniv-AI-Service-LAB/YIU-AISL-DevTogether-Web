import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Row, Col, Flex } from "antd";
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

const getMessageData = async () => {
  const response = axios({
    method: "GET",
    // url: process.env.REACT_APP_LOGIN,
    url: "http://localhost:8080/message", // 테스트
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    // }
    // data: {
    //   // email: data.email,
    //   // pwd: data.pwd
    //   email: 202033013, // 테스트
    //   pwd: "a123", // 테스트
    // },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.status;
    });
  return data_message;
};

const MessagePage = () => {
  useEffect(() => {
    setCurMessage(receivedMessages[0]);
  }, []);
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 현재 선택된 쪽지 내용
  const [curMessage, setCurMessage] = useRecoilState(MessageAtom);
  // 받은 쪽지함 데이터 => 첫번째 데이터를 default로 설정하기 위해
  const receivedMessages = useRecoilValue(ReceivedMessagesSelector);
  // 현재 선택된 왼쪽 뷰 => 상세보기 | 작성폼
  const [leftView, setLeftView] = useRecoilState(MessageViewStatusAtom);

  // const { data } = useQuery(["data_message"], getMessageData);

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
