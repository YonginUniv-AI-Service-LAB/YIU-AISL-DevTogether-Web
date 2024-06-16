import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../../components/Text/FormLabel";
import { Input, Form, message } from "antd";
import DefaultButton from "../../components/Button/DefaultButton";
import { FAQFormDataAtom, FAQFormTypeAtom } from "../../recoil/atoms/faq";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAPI } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const FAQFormPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 폼 타입 => 작성 || 수정
  const formType = useRecoilValue(FAQFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(FAQFormDataAtom);

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 데이터
  const [form, setForm] = useState({
    faqId: {
      value: formData.faqId,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    title: {
      value: formData.title,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value: formData.contents,
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

  // FAQ 생성
  const createData = useMutation({
    mutationFn: async (data) =>
      await authAPI.post({
        method: "POST",
        url: "/faq",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer `,
        },
        data: data,
      }),
    // authAPI.post("/faq", {
    //   data: data,
    // }),
    onSuccess: (data, variables) => {
      message.success("FAQ 등록 완료");
      // FAQ 목록 리로드
      queryClient.invalidateQueries("faq");
      // FAQ 목록으로 이동
      navigate(-1);
    },
    onError: (e) => {
      console.log("실패: ", e);
      message.error("잠시 후에 다시 시도해주세요");
    },
    // onSettled: () => {
    //   console.log("결과에 관계 없이 무언가 실행됨");
    // },
  });

  // FAQ 수정
  const updateData = useMutation({
    mutationFn: async (data) =>
      await axios({
        method: "PUT",
        url: "/faq",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer`,
        },
        data: data,
      }),
    // authAPI.put("/faq", {
    //   data: data,
    // }),
    onSuccess: (data, variables) => {
      message.success("FAQ 수정 완료");
      // FAQ 목록 리로드
      queryClient.invalidateQueries("faq");
      // FAQ 목록으로 이동
      navigate(-1);
    },
    onError: (e) => {
      message.error("잠시 후에 다시 시도해주세요");
    },
    // onSettled: () => {
    //   console.log("결과에 관계 없이 무언가 실행됨");
    // },
  });

  // 유효성 검사 함수
  const validateForm = (form) => {
    let isValid = true;
    const updatedForm = Object.keys(form).reduce((acc, key) => {
      const isRequired = form[key].rules?.isRequired || false;
      const value = form[key].value;
      let valid = true;

      // 필수 입력값 검사
      if (isRequired && !value.trim()) {
        valid = false;
        isValid = false;
      }

      acc[key] = { ...form[key], valid };
      return acc;
    }, {});

    // 업데이트된 폼 상태를 설정
    setForm(updatedForm);
    return isValid;
  };

  // 제출
  const onSubmitForm = () => {
    // 데이터 준비
    let data = Object.keys(form).reduce((acc, key) => {
      acc[key] = form[key].value;
      return acc;
    }, {});

    // 유효성 검사
    const isFormValid = validateForm(form);
    if (!isFormValid) {
      message.error("질문과 답변을 모두 입력해주세요");
      return;
    }

    console.log("data: ", data);

    // API 요청
    formType === "create" ? createData.mutate(data) : updateData.mutate(data);
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
          key={"title"}
          label={<FormLabelText text="질문" />}
          name="title"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            id={"title"}
            value={form.title.value}
            defaultValue={formData.title}
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
          key={"contents"}
          label={<FormLabelText text="답변" />}
          name="contents"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            id={"contents"}
            value={form.contents.value}
            defaultValue={formData.contents}
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

        <Form.Item label="">
          <DefaultButton text="게시" onClick={() => onSubmitForm()} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FAQFormPage;
