import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MessageAtom,
  MessageReceiverAtom,
  MessageStatusAtom,
  MessageViewStatusAtom,
} from "../../recoil/atoms/message";

import { colors } from "../../assets/colors";
import LabelTextGroup_Middle from "../../components/Group/LabelTextGroup_Middle/LabelTextGroup_Middle";
import HoverEventButton from "../../components/Button/HoverEventButton";

const MessageDetail = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [contents, setContents] = useState();

  // 현재 선택된 왼쪽 뷰 => 상세보기 | 작성폼
  const [leftView, setLeftView] = useRecoilState(MessageViewStatusAtom);
  // 현재 선택된 쪽지 내용
  const curMessage = useRecoilValue(MessageAtom);
  // 쪽지 목록 뷰 상태 => 받은 쪽지함 | 보낸 쪽지함
  const messageStatus = useRecoilValue(MessageStatusAtom);
  // 쪽지 수신자 설정
  const setMessageReceiver = useSetRecoilState(MessageReceiverAtom);

  return (
    <div
      style={{
        width: isMobile || isTablet ? "100%" : "70%",
      }}
    >
      <div
        style={
          {
            // borderTopWidth: 3,
            // borderTopStyle: "solid",
            // borderTopColor: colors.main,
          }
        }
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: 22,
            color: colors.text_black_color,
            alignItems: "center",
            margin: 0,
            padding: 15,
            backgroundColor: colors.gray_light,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {curMessage.title}
        </p>
        <p
          style={{
            fontWeight: "600",
            color: colors.text_body_color,
            fontSize: 15,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderColor: colors.background,
            padding: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <LabelTextGroup_Middle
              label={messageStatus ? "글쓴이" : "받는이"}
              text={
                messageStatus ? curMessage.from_user_id : curMessage.to_user_id
              }
            />
            <span style={{ whiteSpace: "pre-wrap" }}>{"         "}</span>
            <LabelTextGroup_Middle
              label={messageStatus ? "받은날짜" : "보낸날짜"}
              text={curMessage.createdAt}
            />
          </div>
          <HoverEventButton
            title={"쪽지 보내기"}
            onClick={() => {
              setMessageReceiver(
                messageStatus ? curMessage.from_user_id : curMessage.to_user_id
              );
              setLeftView(false);
            }}
            size={"middle"}
            bgColor={colors.sub}
            bgColor_hover={colors.main}
            fontColor={"white"}
            fontColor_hover={"white"}
          />
        </p>
        <p
          style={{
            whiteSpace: "pre-line",
            fontWeight: "600",
            color: colors.text_body_color,
            padding: 15,
          }}
        >
          {curMessage.contents}
        </p>
      </div>
    </div>
  );
};

export default MessageDetail;
