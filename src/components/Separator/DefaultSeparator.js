import React from "react";
import { Button, ConfigProvider } from "antd";
import { colors } from "../../assets/colors";

const DefaultSeparator = (props) => {
  return <div style={{ height: 2, backgroundColor: props.color }} />;
};
export default DefaultSeparator;
