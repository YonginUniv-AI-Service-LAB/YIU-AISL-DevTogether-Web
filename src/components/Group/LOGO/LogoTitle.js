import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { Image } from "antd";
import { colors } from "../../../assets/colors";
import LOGO from "../../../assets/images/devtogether_logo.png";

const LogoTitle = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div>
      <a
        href="/"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: props.fontSize,
          color: colors.main,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <span style={{ marginLeft: isMobile ? 5 : 10, marginRight: 10 }}>
          <Image width={props.logoWidth} src={LOGO} preview={false} />
        </span>
        <span>DevTogether</span>
      </a>
    </div>
  );
};

export default LogoTitle;
