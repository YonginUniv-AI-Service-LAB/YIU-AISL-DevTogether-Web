import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { List } from "antd";
import MessageListItem from "../../components/Group/MessageListItem/MessageListItem";
import { MessageAtom } from "../../recoil/atoms/message";
import { ReceivedMessagesSelector } from "../../recoil/selectors/messageSelector";
import dayjs from "dayjs";

const ReceiveList = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // Recoil 현재 쪽지
  const [curMessage, setCurMessage] = useRecoilState(MessageAtom);
  const receivedMessages = useRecoilValue(ReceivedMessagesSelector);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={receivedMessages}
        renderItem={(item, index) => {
          // item이 null인지 확인하고 처리
          if (!item || !item.messageId) {
            console.error("Invalid item data:", item);
            return null; // item이 유효하지 않으면 렌더링하지 않음
          }

          return (
            <MessageListItem
              key={item.messageId} // key prop 추가
              selected={item.messageId === curMessage?.messageId}
              title={item.title}
              person={item.fromUserNickName}
              date={dayjs(item.createdAt).format("YYYY.MM.DD")}
              onClick={() => setCurMessage(item)}
            />
          );
        }}
      />
    </div>
  );
};

export default ReceiveList;
