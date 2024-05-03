import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../../components/Text/FormLabel";
import { Input, Form } from "antd";
import DefaultButton from "../../components/Button/DefaultButton";
const FAQFormPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  return (
    <div>
      <PageHeader
        title="FAQ 작성"
        // subtitle="DevTogether의 다양한 소식을 알려드립니다."
      />
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
        style={{
          margin: 300,
          marginTop: 80,
        }}
      >
        <Form.Item
          label={<FormLabelText text="질문" />}
          name="contents"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="질문 입력"
            autoSize={{
              minRows: 5,
              // maxRows: 100,
            }}
            // count={{
            //   show: true,
            //   max: 3000,
            // }}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          label={<FormLabelText text="답변" />}
          name="contents"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="답변 입력"
            autoSize={{
              minRows: 15,
              // maxRows: 100,
            }}
            // count={{
            //   show: true,
            //   max: 3000,
            // }}
            size={"large"}
          />
        </Form.Item>

        <Form.Item label=" ">
          <DefaultButton text="게시" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FAQFormPage;
