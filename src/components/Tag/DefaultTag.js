import React from "react";
import { Tag } from "antd";

const DefaultTag = (props) => {
  return (
    <Tag
      style={{
        fontSize: 15,
        fontWeight: "bold",

        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
      }}
    >
      {props.text}
    </Tag>
  );
};
export default DefaultTag;
