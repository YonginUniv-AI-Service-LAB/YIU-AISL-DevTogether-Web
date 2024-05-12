import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NoticeFormDataAtom,
  NoticeFormTypeAtom,
} from "../../recoil/atoms/notice";

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

const NoticeFormPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();

  // 작성 || 수정
  // const [formType, setFormType] = useState(formType);

  // 폼 타입 => 작성 || 수정
  const formType = useRecoilValue(NoticeFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(NoticeFormDataAtom);

  // 데이터
  const [form, setForm] = useState({
    noticeid: {
      value: formType === "update" ? formData.noticeid : 0,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    category: {
      value: formType === "update" ? formData.category : null,
      type: "textInput",
      rules: {
        isRequired: true,
      },
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
    console.log("카테고리 선택 온채인지: ", e.target);
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

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = () => {
    navigate(-1);
  };

  return (
    <div>
      <PageHeader
        title={formType == "create" ? "공지사항 작성" : "공지사항 수정"}
        subtitle="오타 없이 공지사항 작성 똑디 해라잉~"
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
          id={"category"}
        >
          <Select
            id={"category"}
            value={form.category.value}
            defaultValue={form.category.value}
            onChange={handleChange}
            placeholder={`카테고리 선택`}
            size="large"
          >
            <Select.Option value={0}>공지사항</Select.Option>
            <Select.Option value={1}>이벤트</Select.Option>
            <Select.Option value={2}>업데이트</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="제목" />}
          name="title"
          style={{ marginBottom: 30 }}
          required
        >
          <Input
            id={"title"}
            value={form.title.value}
            defaultValue={form.title.value}
            onChange={onChange}
            count={{
              show: true,
              max: 100,
            }}
            placeholder={`제목 입력`}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          label={<FormLabelText text="내용" />}
          name="contents"
          style={{ marginBottom: 30 }}
          required
        >
          {/* {console.log("데이터: ", form.contents.value)} */}
          <TextArea
            id={"contents"}
            value={form.contents.value}
            defaultValue={form.contents.value}
            onChange={onChange}
            placeholder={`내용 입력`}
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

        <Form.Item>
          <DefaultButton text="게시" onClick={() => onFinish()} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoticeFormPage;
