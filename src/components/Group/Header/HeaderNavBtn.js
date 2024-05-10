import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

const HeaderNavBtn = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          fontSize: isMobile ? 11 : 14,
        },
      }}
    >
      <Button
        size={isMobile ? "small" : "large"}
        type={props.type ? props.type : "text"}
        href={props.href}
        style={props.style}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </ConfigProvider>
  );
};

export default HeaderNavBtn;
