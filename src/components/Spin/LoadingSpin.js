import React from "react";
import { Spin, ConfigProvider, Image } from "antd";
import { colors } from "../../assets/colors";
import LOGO from "../../assets/images/devtogether_logo.png";

const LoadingSpin = (props) => {
  return (
    <div
      style={{ textAlign: "center", alignContent: "center", minHeight: 500 }}
    >
      <Spin
        size="large"
        // fullscreen
        // indicator={<Image width={30} src={LOGO} preview={false} />}
      />
    </div>
  );
};
export default LoadingSpin;
