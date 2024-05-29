import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../../components/Text/FormLabel";
import { Input, Form } from "antd";
import DefaultButton from "../../components/Button/DefaultButton";
import { FAQFormDataAtom, FAQFormTypeAtom } from "../../recoil/atoms/faq";
import { useRecoilState, useRecoilValue } from "recoil";
const FAQFormPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  // 폼 타입 => 작성 || 수정
  const formType = useRecoilValue(FAQFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(FAQFormDataAtom);

  // 데이터
  const [form, setForm] = useState({
    faqId: {
      value: formType === "update" ? formData.faqId : 0,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    title: {
      value: formType === "update" ? formData.title : "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value: formType === "update" ? formData.contents : "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
  });

  // 텍스트인풋 업데이트
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: {
        ...prevState[e.target.id],
        value: e.target.value,
      },
    }));
  };

  return (
    <div>
      <PageHeader
        title={formType == "create" ? "FAQ 작성" : "FAQ 수정"}
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
          name="title"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            id={"title"}
            value={form.title.value}
            defaultValue={form.title.value}
            onChange={onChange}
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
            id={"contents"}
            value={form.contents.value}
            defaultValue={form.contents.value}
            onChange={onChange}
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
