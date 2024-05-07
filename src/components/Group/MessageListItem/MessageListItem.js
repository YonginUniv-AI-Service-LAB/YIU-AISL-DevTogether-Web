import React from "react";
import styled from "styled-components";
import { Flex } from "antd";
import { colors } from "../../../assets/colors";
import { css } from "@emotion/react";
import styles from "./MessageListItem.module.css";

const MessageListItem = (props) => {
  return (
    <div
      className={styles.container}
      style={{
        marginBottom: 10,
        borderLeftStyle: "solid",
        borderLeftWidth: 10,
        borderColor: props.selected ? colors.sub : colors.background,
        padding: 10,
        backgroundColor: props.selected ? colors.background : null,
        borderRadius: 5,
      }}
      onClick={props.onClick}
    >
      <span
        style={{
          fontWeight: "bold",
          fontSize: 17,
          color: colors.text_black_color,
          maxLines: 2,
        }}
      >
        {props.title}
      </span>
      <Flex
        justify="space-around"
        style={{
          fontSize: 15,
          fontWeight: "500",
          color: colors.text_body_color,
        }}
      >
        <div style={{ width: "40%" }}>
          <span>{props.person}</span>
        </div>
        <div style={{ width: "60%", textAlign: "end" }}>
          <span>{props.date}</span>
        </div>
      </Flex>
    </div>
  );
};
export default MessageListItem;

const Container = styled.div`
  background: linear-gradient(to right bottom, #68568e, #9f5d83);
  color: white;
  padding: 7%;
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.text`
  font-weight: bold;
  font-size: 4vh;
  padding-top: 1%;
  padding-bottom: 1%;
`;

const SubTitle = styled.text`
  font-weight: bold;
  font-size: 2vh;
`;
