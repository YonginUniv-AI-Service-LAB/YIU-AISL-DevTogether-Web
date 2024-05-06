import React from "react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { List } from "antd";
import MessageListItem from "../../components/Group/MessageListItem/MessageListItem";
import { data_message } from "../../assets/data/message";
import { MessageAtom } from "../../recoil/atoms/message";

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

  return (
    <div>
      {" "}
      <List
        itemLayout="horizontal"
        dataSource={data_message}
        renderItem={(item, index) =>
          item.from_user_id == "누들잉" ? (
            <MessageListItem
              selected={item.id === curMessage.id ? true : false}
              title={item.title}
              person={item.to_user_id}
              date={item.createdAt}
              onClick={() => setCurMessage(item)}
            />
          ) : null
        }
      />
    </div>
  );
};

export default SendList;
