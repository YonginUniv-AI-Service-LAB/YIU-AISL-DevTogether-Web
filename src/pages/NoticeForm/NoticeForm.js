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
  NoticeDeleteFilesAtom,
  NoticeFormDataAtom,
  NoticeFormFilesAtom,
  NoticeFormTypeAtom,
} from "../../recoil/atoms/notice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import testImg1 from "../../assets/images/yiu_logo.jpg";
import testImg2 from "../../assets/images/devtogether_logo.png";
import { authFileAPI, refreshAccessToken } from "../../api";

const { Dragger } = Upload;

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

  // 파일 관련 상태 변수
  const [files, setFiles] = useRecoilState(NoticeFormFilesAtom); // 전체 파일 데이터
  const [deleteFiles, setDeleteFiles] = useState([]); // 삭제할 기존 파일 fileId 배열
  const [newFiles, setNewFiles] = useState([]); // 새로 추가할 파일 데이터 배열

  // 서버에 전송할 데이터(파일 제외)
  const [data, setData] = useState(null);
  // 리프레시 진행 여부(액세스 토큰 재발급)
  const [refresh, setRefresh] = useState(false);

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 공지사항 생성
  const createData = useMutation({
    mutationFn: async () => {
      // FormData 형식에 데이터를 넣어줘야 함!
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("contents", data.contents);
      formData.append("noticeCategory", data.noticeCategory);
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("file", file);
        });
      } else {
        formData.append("file", new Blob()); // 빈 Blob 객체를 파일로 추가
      }
      console.log("formData", formData);

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
    onError: async (e) => handleMutationError(e),
  });

  // 공지사항 수정
  const updateData = useMutation({
    mutationFn: async () => {
      // FormData 형식에 데이터를 넣어줘야 함!
      const formData = new FormData();
      formData.append("noticeId", data.noticeId);
      formData.append("title", data.title);
      formData.append("contents", data.contents);
      formData.append("noticeCategory", data.noticeCategory);
      // 삭제할 fileId 추가
      deleteFiles.forEach((fileId) => formData.append("deleteId", fileId));

      // 새로 추가한 파일 추가
      newFiles.forEach((file) => formData.append("file", file.originFileObj));
      // formData.append("file", new Blob()); // 빈 Blob 객체를 파일로 추가

      console.log("전송할 데이터", data);
      console.log("전송할 deleteId", deleteFiles);
      console.log("전송할 새로운 file", newFiles);
      console.log("전체 파일 데이터", files);

      await authFileAPI.put("/admin/notice", formData, {
        transformRequest: [
          function () {
            return formData;
          },
        ],
      });
    },
    onSuccess: (data, variables) => {
      // 공지사항 등록 성공 메세지
      message.success("공지사항 수정 완료");
      // 공지사항 목록 리로드
      queryClient.invalidateQueries("공지사항");
      // 공지사항 목록으로 이동
      navigate(-1);
    },
    onError: async (e) => handleMutationError(e),
  });

  // 에러 핸들러
  const handleMutationError = async (e) => {
    // 데이터 미입력
    if (e.request.status === 400) message.error("제목과 내용을 입력해주세요.");
    // 공지사항 id 없음
    else if (e.request.status == 400)
      message.error("존재하지 않는 공지사항입니다.");
    // OR 액세스 토큰 만료 OR 권한 없음
    else if (e.request.status === 401 || e.request.status === 403) {
      if (!refresh) {
        const isTokenRefreshed = await refreshAccessToken();
        setRefresh(true);
        if (isTokenRefreshed) {
          formType === "create" ? createData.mutate() : updateData.mutate();
        } else {
          navigate("/");
        }
      } else {
        message.error("권한이 없습니다.");
      }
    }
    // 서버 오류
    else if (e.request.status === 500) {
      message.error("잠시 후에 다시 시도해주세요.");
    }
  };

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

  // category String -> INT
  const convertCategory = () => {
    switch (formData.noticeCategory) {
      case "공지":
        return 0;
      case "이벤트":
        return 1;
      case "업데이트":
        return 2;
      default:
        return 0;
    }
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
      noticeCategory: {
        ...prevState.noticeCategory,
        value: value,
      },
    }));
  };

  // 파일 업로드 변경 시 처리
  const handleUploadChange = ({ fileList }) => {
    setFiles(fileList);
    // 새로 추가된 파일을 newFiles 배열에 추가
    setNewFiles(fileList);
  };

  // 파일 삭제 시 처리
  const handleRemoveFile = (file) => {
    console.log("삭제할 file: ", file);
    // 기존 파일 목록에서 삭제
    setFiles(files.filter((item) => item.uid != file.uid));
    // 삭제한 파일의 fileId를 deleteFiles 배열에 추가
    if (file.uid) {
      setDeleteFiles((prev) => [...prev, parseInt(file.uid)]);
    }
  };

  useEffect(() => {
    setFiles([]);
    setDeleteFiles([]);
    setNewFiles([]);
    if (formType === "update" && files) {
      setForm((prevState) => ({
        ...prevState,
        noticeCategory: {
          ...prevState.noticeCategory,
          value: convertCategory(),
        },
      }));
      setFiles(
        files
          .filter((file) => file.originName) // originName이 있는 파일만 필터링
          .map((file, index) => ({
            uid: `${file.fileId}`,
            name: file.originName,
            status: "done",
            url: file.url,
            originFileObj: new File([file.fileData], file.originName, {
              type: file.mimeType,
            }),
            originName: file.fildId, // originName을 포함
          }))
      );
    }
  }, [formData, formType]);

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

    setData(data);

    // API 요청
    formType === "create" ? createData.mutate() : updateData.mutate();
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
