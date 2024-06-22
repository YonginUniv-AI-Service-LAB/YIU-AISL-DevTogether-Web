import React, { useState } from "react";
import { Button, Modal, Select, Space, message } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import { colors } from "../../assets/colors";
import TextArea from "antd/es/input/TextArea";
import HoverEventButton from "../../components/Button/HoverEventButton";

const TestPage = ({ data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "신고 사유를 선택하거나 입력해주세요",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    initInfo();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (
      form.category.value == null ||
      (form.category.value == 0 && form.contents.value == null)
    )
      error();
    else {
      initInfo();
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    initInfo();
    setIsModalOpen(false);
  };

  // 데이터
  const [form, setForm] = useState({
    type: {
      value: null,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    type_id: {
      value: null,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    category: {
      value: null,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value: null,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    from_user_id: {
      value: null,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    to_user_id: {
      value: null,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
  });

  const initInfo = () => {
    handleChange(null);
    setForm((prevState) => ({
      ...prevState,
      contents: {
        ...prevState.contents,
        value: null,
      },
    }));
  };

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

  // 카테고리 업데이트
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setForm((prevState) => ({
      ...prevState,
      category: {
        ...prevState.category,
        value: value,
      },
    }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      {contextHolder}
      <Button onClick={showModal}>신고 모달을 보시려면 누르세용🤪</Button>
      <Modal
        title={
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <p
              style={{
                fontSize: 20,
                color: colors.text_black_color,
                fontWeight: "bold",
              }}
            >
              신고하기
            </p>
          </div>
        }
        open={isModalOpen}
        okText={"신고"}
        onOk={handleOk}
        cancelText={"취소"}
        onCancel={handleCancel}
        footer={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 20,
              paddingRight: 30,
            }}
          >
            <HoverEventButton
              title={"취소"}
              onClick={handleCancel}
              size={"middle"}
              bgColor={colors.gray_light}
              bgColor_hover={colors.text_disable_color}
              fontColor={colors.text_body_color}
              fontColor_hover={colors.text_body_color}
            />
            <HoverEventButton
              title={"신고"}
              onClick={handleOk}
              size={"middle"}
              bgColor={colors.sub}
              bgColor_hover={colors.main}
              fontColor={"white"}
              fontColor_hover={"white"}
            />
          </div>
        }
        // style={{ backgroundColor: "Red" }}
      >
        <div style={{ padding: 30, textAlign: "center" }}>
          {/* <p>신고 사유를 선택해주세요</p> */}
          <Select
            id={"category"}
            value={form.category.value}
            defaultValue={form.category.value}
            onChange={handleChange}
            placeholder={`신고 사유를 선택해주세요`}
            size="large"
            style={{ width: "100%" }}
          >
            <Select.Option value={1}>욕설/인신공격</Select.Option>
            <Select.Option value={2}>같은 내용 도배</Select.Option>
            <Select.Option value={3}>불법 정보</Select.Option>
            <Select.Option value={4}>개인 정보 노출</Select.Option>
            <Select.Option value={5}>부적절한 거래</Select.Option>
            <Select.Option value={6}>음란성/선정성</Select.Option>
            <Select.Option value={7}>업데이트</Select.Option>
            <Select.Option value={0}>기타</Select.Option>
          </Select>
          {form.category.value == 0 ? (
            <TextArea
              id={"contents"}
              value={form.contents.value}
              defaultValue={form.contents.value}
              onChange={onChange}
              placeholder={`신고 사유에 해당되지 않지만 이용 규칙에 맞지 않는다고 판단되신다면 해당 내용을 상세하게 작성해주세요.`}
              autoSize={{
                minRows: 5,
                // maxRows: 100,
              }}
              // count={{
              //   show: true,
              //   max: 3000,
              // }}
              size={"middle"}
              style={{ marginTop: 20 }}
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default TestPage;
