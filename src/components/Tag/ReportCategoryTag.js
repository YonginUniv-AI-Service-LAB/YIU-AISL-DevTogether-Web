import React, { useState } from "react";
import { Tag } from "antd";

const ReportCategoryTag = (props) => {
  switch (props.category) {
    case "음란성/선정성":
      return (
        <Tag bordered={false} color={"red"}>
          {props.category}
        </Tag>
      );
    case "욕설/인신공격":
      return (
        <Tag bordered={false} color={"yellow"}>
          {props.category}
        </Tag>
      );
    case "불법 정보":
      return (
        <Tag bordered={false} color={"purple"}>
          {props.category}
        </Tag>
      );
    case "같은 내용 도배":
      return (
        <Tag bordered={false} color={"cyan"}>
          {props.category}
        </Tag>
      );
    case "개인 정보 노출":
      return (
        <Tag bordered={false} color={"gold"}>
          {props.category}
        </Tag>
      );
    case "부적절한 거래":
      return (
        <Tag bordered={false} color={"orange"}>
          {props.category}
        </Tag>
      );
    case "이용규칙 위반":
      return (
        <Tag bordered={false} color={"blue"}>
          {props.category}
        </Tag>
      );
    case "기타":
      return <Tag bordered={false}>{props.category}</Tag>;
  }
};
export default ReportCategoryTag;
