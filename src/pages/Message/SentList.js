import React, { useDeferredValue } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { List } from "antd";
import MessageListItem from "../../components/Group/MessageListItem/MessageListItem";
import { data_message } from "../../assets/data/message";
import { MessageAtom } from "../../recoil/atoms/message";
import { SentMessagesSelector } from "../../recoil/selectors/messageSelector";
import dayjs from "dayjs";

const SendList = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // recoil 현재 쪽지
  const [curMessage, setCurMessage] = useRecoilState(MessageAtom);
  const sentMessages = useRecoilValue(SentMessagesSelector);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={sentMessages}
        renderItem={(item, index) => (
          <MessageListItem
            selected={item.messageId === curMessage.messageId ? true : false} // 와 오류가 생기누?
            title={item.title}
            person={item.toUserNickName} // 오타
            date={dayjs(item.createdAt).format("YYYY.MM.DD HH:mm")}
            onClick={() => setCurMessage(item)}
          />
        )}
      />
    </div>
  );
};

export default SendList;
