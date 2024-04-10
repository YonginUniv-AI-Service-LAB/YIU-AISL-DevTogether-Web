import React from "react";
import styled from "styled-components";

const PageHeader = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <SubTitle>{props.subtitle}</SubTitle>
    </Container>
  );
};
export default PageHeader;

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
