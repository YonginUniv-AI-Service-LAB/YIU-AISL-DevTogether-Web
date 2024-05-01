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

const NoticeFormPage = () => {
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
        title="공지사항 작성"
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
          label={<FormLabelText text="카테고리" />}
          style={{ marginBottom: 50 }}
        >
          <Select placeholder="카테고리 선택" size="large">
            <Select.Option value={0}>공지사항</Select.Option>
            <Select.Option value={1}>이벤트</Select.Option>
            <Select.Option value={2}>업데이트</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="제목" />}
          name="title"
          style={{ marginBottom: 50 }}
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
          style={{ marginBottom: 50 }}
          extra={"hwp, jpg, png 여기에 무엇을 쓸까..."}
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

export default NoticeFormPage;
