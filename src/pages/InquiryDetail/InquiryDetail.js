import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultTag from "../../components/Tag/DefaultTag";
import FormLabelText from "../../components/Text/FormLabel";
import { colors } from "../../assets/colors";
import BottomLineText from "../../components/Text/BottomLineText";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import { Button, Form, Popconfirm, Upload, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import HoverEventButton from "../../components/Button/HoverEventButton";
import TextArea from "antd/es/input/TextArea";
import DefaultButton from "../../components/Button/DefaultButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AskDataAtom,
  AskFilesAtom,
  AskFormDataAtom,
  AskFormFilesAtom,
  AskFormTypeAtom,
} from "../../recoil/atoms/ask";
import axios from "axios";
import { refreshAccessToken } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const InquiryDetailPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();
  // 페이지 이동
  const navigate = useNavigate();

  const [answerInput, setAnswerInput] = useState(false);
  const [answer, setAnswer] = useState("");

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(AskFormTypeAtom);
  // 문의 데이터
  const [data, setData] = useRecoilState(AskDataAtom);
  // 문의 파일 데이터
  const [files, setFiles] = useRecoilState(AskFilesAtom);
  // 문의 데이터 [등록 및 수정용]
  const [formData, setFormData] = useRecoilState(AskFormDataAtom);
  // 문의 파일 데이터 [등록 및 수정용]
  const [formFiles, setFormFiles] = useRecoilState(AskFormFilesAtom);

  const [refresh, setRefresh] = useState(false);

  const downloadFile = async (fileId) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/download",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          fileId: fileId,
        },
      });

      const { fileData, mimeType, originName } = response.data;

      // base64 문자열을 디코딩하여 Blob 객체로 변환합니다.
      const byteString = atob(fileData);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ia], { type: mimeType });
      const downloadUrl = URL.createObjectURL(blob);
      return { downloadUrl, originName };
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      message.error("파일 다운로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDownload = async (fileId, fileName) => {
    const { downloadUrl, originName } = await downloadFile(fileId);
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = originName || fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl); // 메모리 해제
    }
  };

  const updateConfirm = (e) => {
    console.log(e);
    setFormType("update");
    setFormData(data);
    setFormFiles(files);
    navigate("/inquiry/form");
  };
  const updateCancel = (e) => {
    console.log(e);
  };

  const deleteConfirm = (e) => {
    deleteData.mutate();
  };
  const deleteCancel = (e) => {
    console.log(e);
  };

  const deleteData = useMutation({
    mutationFn: async () =>
      await axios({
        method: "DELETE",
        url: "/ask",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          askId: data.askId,
        },
      }),
    onSuccess: () => {
      message.success("문의가 삭제되었습니다");
      navigate(-1);
    },
    onError: async (e) => handleMutationError(e),
  });

  const answerData = useMutation({
    mutationFn: async () =>
      await axios({
        method: "POST",
        url: "/admin/ask/answer",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          askId: data.askId,
          answer: answer,
        },
      }),
    onSuccess: () => {
      message.success("답변이 등록되었습니다.");
      queryClient.invalidateQueries("ask");
      setAnswerInput(false);
      navigate(-1);
    },
    onError: async (e) => handleMutationError(e),
  });

  // 에러 핸들러
  const handleMutationError = async (e) => {
    // 데이터 미입력
    if (e.request.status == 400) message.error("미입력된 정보가 존재합니다.");
    // 데이터 미입력
    else if (e.request.status == 404) {
      message.error("존재하지 않는 문의입니다.");
      // queryClient.invalidateQueries("ask");
      // // 공지사항 목록으로 이동
      // navigate(-1);
    }
    // 권한 없음 OR 액세스 토큰 만료
    else if (e.request.status == 401 || e.request.status == 403) {
      // 액세스토큰 리프레시
      if (refresh === false) {
        const isTokenRefreshed = await refreshAccessToken();
        setRefresh(true);
        if (isTokenRefreshed) {
          deleteData.mutate();
        } else navigate("/");
      } else message.error("권한이 없습니다.");
    }
    // 서버 오류
    else if (e.request.status == 500)
      message.error("잠시 후에 다시 시도해주세요.");
  };

  // // 유효성 검사 함수
  // const validateForm = (form) => {
  //   let isValid = true;
  //   const updatedForm = Object.keys(form).reduce((acc, key) => {
  //     const isRequired = form[key].rules?.isRequired || false;
  //     const value = form[key].value;
  //     let valid = true;

  //     if (isRequired && !value.trim()) {
  //       valid = false;
  //       isValid = false;
  //     }

  //     acc[key] = { ...form[key], valid };
  //     return acc;
  //   }, {});

  //   setForm(updatedForm);
  //   return isValid;
  // };

  // 제출
  const onSubmitForm = () => {
    // 데이터 준비
    console.log("데이터: ", answer, data.askId);
    if (answer.length > 0 && answerInput === true) answerData.mutate();
    else message.error("답변을 입력해주세요.");
  };

  // 답변 렌더링 함수
  function showAnswerSection() {
    // status 1이면 => 답변을 보여줌
    if (location.state.data.status === "완료") {
      return (
        <p
          style={{
            whiteSpace: "pre-line",
            padding: 20,
          }}
        >
          {data.contents}
        </p>
      );
    } else {
      if (sessionStorage.getItem("role") == 0) {
        // stauts 0 && 매니저이면서 && answerInput이 true이면 => O & 텍스트 인풋
        if (answerInput) {
          return (
            <>
              <TextArea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={`문의에 대한 답변을 작성해주세요`}
                autoSize={{
                  minRows: 10,
                  // maxRows: 100,
                }}
                // count={{
                //   show: true,
                //   max: 3000,
                // }}
                size={"large"}
                style={{ marginBottom: 15 }}
              />
              <DefaultButton text="완료" onClick={() => onSubmitForm()} />
            </>
          );
        }
        // status 0 && 매니저이면 => O & 댓글 작성 버튼
        else {
          return (
            <div style={{ textAlign: "center", padding: 50 }}>
              <HoverEventButton
                title={"답변 작성"}
                onClick={() => setAnswerInput(true)}
                size={"middle"}
                bgColor={colors.sub}
                bgColor_hover={colors.main}
                fontColor={"white"}
                fontColor_hover={"white"}
              />
            </div>
          );
        }
      }
      // status 0 && 일반 유저이면 => 잠시 기다려달라는 메세지
      else
        return (
          <p style={{ textAlign: "center", fontWeight: "bold", padding: 50 }}>
            답변을 준비중입니다 : )
          </p>
        );
    }
  }

  return (
    <div>
      <PageHeader title="문의내역" subtitle="문의내역을 확인해보세요." />
      <div
        style={{
          color: colors.text_body_color,
          marginTop: 100,
          marginBottom: isMobile ? 100 : 200,
          marginLeft: isMobile ? 30 : isTablet ? 100 : "25%",
          marginRight: isMobile ? 30 : isTablet ? 100 : "25%",
          fontSize: 17,
          fontWeight: "500",
        }}
      >
        <BottomLineText
          text={"문의"}
          fontSize={25}
          component={
            data.status === "신청" && sessionStorage.getItem("role") != 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  textAlign: "right",
                }}
              >
                <Popconfirm
                  title="문의 수정"
                  description="문의를 수정하시겠습니까?"
                  onConfirm={updateConfirm}
                  onCancel={updateCancel}
                  okText="수정"
                  cancelText="취소"
                >
                  <Button type="text" icon={<EditOutlined />} />
                </Popconfirm>
                <Popconfirm
                  title="문의 삭제"
                  description="문의를 삭제하시겠습니까?"
                  onConfirm={deleteConfirm}
                  onCancel={deleteCancel}
                  okText="삭제"
                  cancelText="취소"
                  icon={
                    <ExclamationCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  <Button type="text" icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            ) : null
          }
        />
        <div style={{ padding: 20 }}>
          <span style={{ fontWeight: "bold" }}>{data.askCategory}</span>

          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text_black_color,
              marginBottom: 30,
            }}
          >
            {data.title}
          </p>

          <p
            style={{
              whiteSpace: "pre-line",
              marginBottom: 30,
            }}
          >
            {data.contents}
          </p>
          {data.filesList && files.length > 0 && (
            <div style={{ marginTop: 50 }}>
              <p style={{ fontWeight: "bold" }}>첨부 파일</p>
              <div
                style={{
                  // marginTop: 30,
                  backgroundColor: colors.gray_light,
                  borderRadius: 10,
                  padding: 20,
                  paddingTop: 30,
                }}
              >
                {files.map((file, index) => (
                  <Button
                    key={index}
                    onClick={() => handleDownload(file.fileId, file.originName)}
                    style={{
                      marginBottom: 10,
                      marginRight: 10,
                    }}
                  >
                    {file.originName}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 100 }}>
          <BottomLineText text={"답변"} fontSize={25} />
          {showAnswerSection()}
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailPage;
