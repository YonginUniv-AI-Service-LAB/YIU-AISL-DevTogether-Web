import React from "react";
import { colors } from "../../assets/colors";

const BottomLineText = (props) => {
  return (
    <p
      style={{
        fontWeight: "bold",
        fontSize: props.fontSize,
        color: colors.text_black_color,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomStyle: "solid",
        borderBottomColor: colors.text_black_color,
      }}
    >
      {props.text}
    </p>
  );
};
export default BottomLineText;
