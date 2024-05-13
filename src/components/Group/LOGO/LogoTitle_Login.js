import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { Image } from "antd";
import { colors } from "../../../assets/colors";
import LOGO from "../../../assets/images/devtogether_logo_footer.png";

const LogoTitle_Footer = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div>
      <a
        // href="/"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: isMobile ? 20 : 30,
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "default",
        }}
        onClick={props.onClick}
      >
        <span style={{ marginRight: 10 }}>
          <Image width={isMobile ? 40 : 60} src={LOGO} preview={false} />
        </span>
        <span>DevTogether</span>
      </a>
    </div>
  );
};

export default LogoTitle_Footer;
