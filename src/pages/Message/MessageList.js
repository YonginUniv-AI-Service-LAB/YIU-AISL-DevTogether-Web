import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Tabs, ConfigProvider } from "antd";
import { colors } from "../../assets/colors";
import ReceiveList from "./ReceivedList";
import SendList from "./SentList";
import {
  MessageAtom,
  MessageListAtom,
  MessageReceiverAtom,
  MessageStatusAtom,
  MessageViewStatusAtom,
} from "../../recoil/atoms/message";
import {
  ReceivedMessagesSelector,
  SentMessagesSelector,
} from "../../recoil/selectors/messageSelector";

const MessageList = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // recoil 현재 쪽지
  const [curMessage, setCurMessage] = useRecoilState(MessageAtom);
  // 전체 쪽지
  const [messages, setMessage] = useRecoilState(MessageListAtom);
  // 쪽지 상태 변경(받은 쪽지함 / 보낸 쪽지함)
  const [messageStatus, setMessageStatus] = useRecoilState(MessageStatusAtom);
  // 받은 쪽지함
  const receivedMessages = useRecoilValue(ReceivedMessagesSelector);
  // 보낸 쪽지함
  const sentMessges = useRecoilValue(SentMessagesSelector);
  // 현재 선택된 왼쪽 뷰 => 상세보기 | 작성폼
  const setLeftView = useSetRecoilState(MessageViewStatusAtom);

  // tabs 변경될 때 => 쪽지 상태 변경
  const onChange = (key) => {
    setMessageStatus(key === 1 ? true : false);
    console.log("받은 쪽지들: ", receivedMessages);
    console.log("보낸 쪽지들: ", sentMessges);
    let data;
    switch (key) {
      case 1:
        data = messages.filter(
          (message) =>
            message.toUserId == sessionStorage.getItem("user_profile_id")
        )[0];
        break;
      case 2:
        data = messages.filter(
          (message) =>
            message.fromUserId == sessionStorage.getItem("user_profile_id")
        )[0];
        break;
    }

    setCurMessage(data);
    setLeftView(true);
  };

  return (
    <div
      style={{
        width: isMobile || isTablet ? "100%" : "30%",
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Tabs: {},
          },
          token: {
            colorPrimary: colors.sub,
            colorPrimaryHover: colors.main,
            colorPrimaryTextHover: "white",
          },
        }}
      >
        <Tabs
          style={{ fontWeight: "bold", color: colors.text_black_color }}
          onChange={onChange}
          type="card"
          size="large"
          defaultActiveKey={1}
          onClick={() => setLeftView(true)}
          items={[
            {
              label: "받은 쪽지함",
              key: 1,
              children: <ReceiveList />,
            },
            {
              label: "보낸 쪽지함",
              key: 2,
              children: <SendList />,
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
};

export default MessageList;
