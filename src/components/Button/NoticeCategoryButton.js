import { Button, ConfigProvider } from "antd";
import React from "react";
import { colors } from "../../assets/colors";

const NoticeCategoryButton = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: colors.gray_dark,
          },
        },
        token: {
          colorPrimary: colors.gray_light,
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
      >
        {props.title}
      </Button>
    </ConfigProvider>
  );
};
export default NoticeCategoryButton;
