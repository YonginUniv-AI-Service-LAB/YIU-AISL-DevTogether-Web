import React from "react";
import { colors } from "../../../assets/colors";
import styles from "./LabelTextGroup_Middle.module.css";

const LabelTextGroup_Middle = (props) => {
  return (
    <span style={{ fontSize: 15, fontWeight: "700" }}>
      <span style={{ color: colors.text_disable_color, marginRight: 15 }}>
        {props.label}
      </span>
      <span style={{ color: colors.text_body_color }}>{props.text}</span>
    </span>
  );
};
export default LabelTextGroup_Middle;
