import React from "react";
import { Button, Result } from "antd";
import DefaultButton from "../Button/DefaultButton";
import HoverEventButton from "../Button/HoverEventButton";
import { colors } from "../../assets/colors";

const PleaseLoginView = (props) => {
  return (
    <Result
      status="warning"
      title="로그인 후에 이용해주세요!"
      extra={
        <HoverEventButton
          title={"로그인 화면으로 이동"}
          onClick={props.onClick}
          size={"middle"}
          bgColor={colors.sub}
          bgColor_hover={colors.main}
          fontColor={"white"}
          fontColor_hover={"white"}
        />
      }
    />
  );
};
export default PleaseLoginView;
