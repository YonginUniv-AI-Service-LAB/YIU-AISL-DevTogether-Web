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
          fontSize: isTablet ? 15 : 20,
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "default",
        }}
        onClick={props.onClick}
      >
        <span>
          <Image width={isTablet ? 20 : 40} src={LOGO} preview={false} />
        </span>
        <span>DevTogether</span>
      </a>
    </div>
  );
};

export default LogoTitle_Footer;
