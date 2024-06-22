import { Button, ConfigProvider } from "antd";
import { useMediaQuery } from "react-responsive";
import React from "react";
import { colors } from "../../assets/colors";

const NoticeCategoryButton = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: props.current ? "white" : colors.gray_dark,
          },
        },
        token: {
          colorPrimary: props.current ? colors.main : colors.gray_light,
          colorPrimaryHover: colors.main,
          colorPrimaryTextHover: "white",
          fontWeightStrong: 700,
        },
      }}
    >
      <Button
        type="primary"
        size={"large"}
        style={{ fontWeight: 700 }}
        styles={{}}
        onClick={props.onClick}
      >
        {props.title}
      </Button>
    </ConfigProvider>
  );
};
export default NoticeCategoryButton;
