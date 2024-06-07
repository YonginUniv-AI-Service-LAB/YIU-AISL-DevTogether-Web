import React, { useEffect, useState } from "react";
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
  NoticeFormFilesAtom,
  NoticeFormTypeAtom,
} from "../../recoil/atoms/notice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import testImg1 from "../../assets/images/yiu_logo.jpg";
import testImg2 from "../../assets/images/devtogether_logo.png";
import { authFileAPI } from "../../api";

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
  // // 파일을 저장할 상태 추가
  // const [files, setFiles] = useState([]);
  // 파일 리스트 세팅
  const existingFiles = useRecoilValue(NoticeFormFilesAtom);
  const [files, setFiles] = useState(existingFiles);

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 공지사항 생성
  const createData = useMutation({
    mutationFn: async (data) => {
      // FormData 형식에 데이터를 넣어줘야 함!
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("contents", data.contents);
      formData.append("noticeCategory", data.noticeCategory);
      files.forEach((file) => {
        formData.append("file", file);
      });

      await authFileAPI.post("/admin/notice", formData, {
        transformRequest: [
          function () {
            return formData;
          },
        ],
      });
    },
    onSuccess: (data, variables) => {
      // 공지사항 등록 성공 메세지
      message.success("공지사항 등록 완료");
      // 공지사항 목록 리로드
      queryClient.invalidateQueries("공지사항");
      // 공지사항 목록으로 이동
      navigate(-1);
    },
    onError: (e) => {
      console.log("실패: ", e);
      message.error("잠시 후에 다시 시도해주세요");
    },
  });

  // 공지사항 수정
  const updateData = useMutation({
    mutationFn: async (data) => {
      // FormData 형식에 데이터를 넣어줘야 함!
      const formData = new FormData();
      formData.append("noticeId", data.noticeId);
      formData.append("title", data.title);
      formData.append("contents", data.contents);
      formData.append("noticeCategory", data.noticeCategory);
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append("file", file.originFileObj);
        }
      });

      await authFileAPI.put("/admin/notice", formData, {
        transformRequest: [
          function () {
            return formData;
          },
        ],
      });
    },
    onSuccess: (data, variables) => {
      // 공지사항 수정 성공 메세지
      message.success("공지사항 수정 완료");
      // 공지사항 목록 리로드
      queryClient.invalidateQueries("공지사항");
      // 공지사항 목록으로 이동
      navigate(-1);
    },
    onError: (e) => {
      console.log("실패: ", e);
      message.error("잠시 후에 다시 시도해주세요");
    },
  });

  // 데이터
  const [form, setForm] = useState({
    noticeId: {
      value: formType === "update" ? formData.noticeId : 0,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: true,
    },
    noticeCategory: {
      value: formType === "update" ? formData.noticeCategory : null,
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
      noticeCategory: {
        ...prevState.noticeCategory,
        value: value,
      },
    }));
  };

  const handleUploadChange = ({ fileList }) => {
    setFiles(fileList.map((file) => file.originFileObj));
  };

  // const handleUploadChange = ({ fileList }) => {
  //   setFiles(fileList);
  // };

  // 파일 삭제 핸들러
  const handleRemoveFile = (file) => {
    console.log("삭제: ", file);
    setFiles(files.filter((item) => item.uid !== file.uid));
  };

  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  // 유효성 검사 함수
  const validateForm = (form) => {
    let isValid = true;
    const updatedForm = Object.keys(form).reduce((acc, key) => {
      const isRequired = form[key].rules?.isRequired || false;
      const value = form[key].value;
      let valid = true;

      if (isRequired && !value.trim()) {
        valid = false;
        isValid = false;
      }

      acc[key] = { ...form[key], valid };
      return acc;
    }, {});

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

    // // 유효성 검사
    // const isFormValid = validateForm(form);
    // if (!isFormValid) {
    //   message.error("질문과 답변을 모두 입력해주세요");
    //   return;
    // }

    console.log("data: ", data);

    // API 요청
    formType === "create" ? createData.mutate(data) : updateData.mutate(data);
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
          id={"noticeCategory"}
        >
          <Select
            id={"noticeCategory"}
            value={form.noticeCategory.value}
            defaultValue={form.noticeCategory.value}
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

        <Form.Item
          label={<FormLabelText text="파일" />}
          style={{ marginBottom: 30 }}
          extra={"jpg, png, hwp 등"}
        >
          <Upload.Dragger
            name="files"
            multiple
            maxCount={5}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            fileList={files}
            onRemove={handleRemoveFile}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              업로드하려면 파일을 클릭하거나 이 영역으로 드래그하세요.
            </p>
            <p className="ant-upload-hint">최대 5개 업로드 가능</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <DefaultButton text="게시" onClick={() => onSubmitForm()} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoticeFormPage;
