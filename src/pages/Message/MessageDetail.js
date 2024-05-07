import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MessageAtom, MessageStatusAtom } from "../../recoil/atoms/message";

import { colors } from "../../assets/colors";
import LabelTextGroup_Middle from "../../components/Group/LabelTextGroup_Middle/LabelTextGroup_Middle";

const MessageDetail = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [contents, setContents] = useState();

  const curMessage = useRecoilValue(MessageAtom);
  const messageStatus = useRecoilValue(MessageStatusAtom);

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
