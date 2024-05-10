import React from "react";
import styled from "styled-components";
import { colors } from "../../../assets/colors";

const SectionHeader = (props) => {
  return (
    <p
      style={{
        fontWeight: "bold",
        fontSize: 25,
        color: colors.text_black_color,
      }}
    >
      {props.title}
    </p>
  );
};
export default SectionHeader;
