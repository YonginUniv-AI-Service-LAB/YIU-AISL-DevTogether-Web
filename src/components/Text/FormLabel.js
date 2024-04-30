import React from "react";
import { colors } from "../../assets/colors";

const FormLabelText = (props) => {
  return (
    <span
      style={{
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text_black_color,
      }}
    >
      {props.text}
    </span>
  );
};
export default FormLabelText;
