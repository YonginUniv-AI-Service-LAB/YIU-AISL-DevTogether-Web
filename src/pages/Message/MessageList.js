import React from "react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Tabs, ConfigProvider } from "antd";
import { colors } from "../../assets/colors";
import ReceiveList from "./ReceiveList";
import SendList from "./SendList";
import { MessageStatusAtom } from "../../recoil/atoms/message";

const MessageList = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 쪽지 상태 변경(받은 쪽지함 / 보낸 쪽지함)
  const [messageStatus, setMessageStatus] = useRecoilState(MessageStatusAtom);

  // tabs 변경될 때 => 쪽지 상태 변경
  const onChange = (key) => setMessageStatus(key === 1 ? true : false);

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
