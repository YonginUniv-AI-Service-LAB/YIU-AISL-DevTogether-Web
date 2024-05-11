import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Form, Select, Input, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../../components/Text/FormLabel";
import DefaultButton from "../../components/Button/DefaultButton";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import { colors } from "../../assets/colors";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MessageReceiverAtom,
  MessageViewStatusAtom,
} from "../../recoil/atoms/message";
import HoverEventButton from "../../components/Button/HoverEventButton";
import DefaultTag from "../../components/Tag/DefaultTag";

const MessageForm = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [contents, setContents] = useState();

  // 쪽지 수신자
  const messageReceiver = useRecoilValue(MessageReceiverAtom);
  // 쪽지 수신자 설정
  const setMessageReceiver = useSetRecoilState(MessageReceiverAtom);
  // 현재 선택된 왼쪽 뷰 => 상세보기 | 작성폼
  const setLeftView = useSetRecoilState(MessageViewStatusAtom);

  return (
    <div
      style={{
        width: isMobile || isTablet ? "100%" : "70%",
      }}
    >
      <div style={{ textAlign: "right" }}>
        <HoverEventButton
          title={"취소"}
          onClick={() => {
            setMessageReceiver("");
            setLeftView(true);
          }}
          size={"middle"}
          bgColor={colors.gray_light}
          bgColor_hover={colors.gray_mid}
          fontColor={colors.gray_mid}
          fontColor_hover={"white"}
        />
      </div>
      <Form
        name="wrap"
        labelCol={{
          flex: "120px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={
          {
            // margin: 300,
            // marginTop: 80,
          }
        }
      >
        <Form.Item
          label={<FormLabelText text="수신자" />}
          name="title"
          style={{ marginBottom: 20 }}
        >
          <DefaultTag text={messageReceiver} />
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="제목" />}
          name="title"
          style={{ marginBottom: 20 }}
        >
          <Input
            count={{
              show: true,
              max: 100,
            }}
            placeholder="제목 입력"
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          label={<FormLabelText text="내용" />}
          name="contents"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            value={contents}
            onChange={(e) => setContents(e.target.contents)}
            placeholder="내용 입력"
            autoSize={{
              minRows: 15,
              // maxRows: 100,
            }}
            count={{
              show: true,
              max: 3000,
            }}
            size={"large"}
          />
        </Form.Item>

        <Form.Item label=" ">
          <DefaultButton text="전송" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default MessageForm;
