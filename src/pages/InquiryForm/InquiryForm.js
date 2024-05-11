import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/skeleton/Title";
import { colors } from "../../assets/colors";
import { FormLabel } from "react-bootstrap";
import FormLabelText from "../../components/Text/FormLabel";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Input, Form, Select, Upload } from "antd";
import DefaultButton from "../../components/Button/DefaultButton";
import PageHeaderImage from "../../assets/images/PageHeaderImage/inquiry.svg";

const { Dragger } = Upload;
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const InquiryFormPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <PageHeader
        title="문의하기"
        subtitle={`문의하실 내용을 작성해주시면 빠른 시일 내에 답변해드리겠습니다.`}
        image={PageHeaderImage}
      />
      <Form
        name="wrap"
        labelCol={
          {
            // flex: "120px",
          }
        }
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          marginTop: 100,
          marginBottom: 150,
          marginLeft: isMobile ? 30 : isTablet ? 100 : "25%",
          marginRight: isMobile ? 30 : isTablet ? 100 : "25%",
        }}
        layout="vertical"
        variant="filled"
      >
        <Form.Item
          label={<FormLabelText text="카테고리" />}
          style={{ marginBottom: 30 }}
          required
        >
          <Select placeholder={`문의 유형을 선택해주세요`} size="large">
            <Select.Option value={1}>매칭</Select.Option>
            <Select.Option value={2}>IDE</Select.Option>
            <Select.Option value={3}>시스템 오류(버그)</Select.Option>
            <Select.Option value={0}>기타</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="제목" />}
          name="title"
          style={{ marginBottom: 30 }}
          required
        >
          <Input
            count={{
              show: true,
              max: 100,
            }}
            placeholder={`제목을 입력해주세요`}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          label={<FormLabelText text="내용" />}
          name="contents"
          style={{ marginBottom: 30 }}
          required
        >
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`문의 내용을 작성해주세요`}
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

        {/* <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item
          label={<FormLabelText text="파일" />}
          style={{ marginBottom: 30 }}
          extra={"jpg, png, hwp 등"}
        >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do" maxCount={5}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                업로드하려면 파일을 클릭하거나 이 영역으로 드래그하세요.
              </p>
              <p className="ant-upload-hint">최대 5개 업로드 가능</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item label=" ">
          <DefaultButton text="게시" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InquiryFormPage;
