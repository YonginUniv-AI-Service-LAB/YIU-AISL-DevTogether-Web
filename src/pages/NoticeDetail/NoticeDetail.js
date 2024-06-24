import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../assets/colors";
import DefaultSeparator from "../../components/Separator/DefaultSeparator";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Spin, message, Upload } from "antd";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  NoticeFormDataAtom,
  NoticeFormFilesAtom,
  NoticeFormTypeAtom,
} from "../../recoil/atoms/notice";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI, defaultAPI, refreshAccessToken } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import styles from "./NoticeDetail.module.css";
import axios from "axios";

const NoticeDetailPage = (props) => {
  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();
  const [refresh, setRefresh] = useState(false);

  const {
    data: notice,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notice_detail"],
    queryFn: async () => {
      const res = await defaultAPI.get(
        `/notice/detail?noticeId=${location.state.data.noticeId}`
      );
      if (res.status == 404) {
        message.error("존재하지 않는 공지사항입니다.");
        return error;
      }
      return res.data;
    },
  });

  const deleteData = useMutation({
    mutationFn: async () =>
      await axios({
        method: "DELETE",
        url: "/admin/notice",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          noticeId: notice.noticeId,
        },
      }),
    onSuccess: () => {
      message.success("공지사항이 삭제되었습니다");
      navigate(-1);
    },
    onError: async (e) => {
      console.log("실패: ", e.request.status);

      // 데이터 미입력
      if (e.request.status == 400)
        message.error("공지사항을 다시 선택해주세요.");
      // 데이터 미입력
      else if (e.request.status == 404) {
        message.error("존재하지 않는 공지사항입니다. ");
        queryClient.invalidateQueries("notice");
        // 공지사항 목록으로 이동
        navigate(-1);
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
    },
  });

  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(NoticeFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(NoticeFormDataAtom);
  // 폼 파일 데이터 세팅
  const [formFiles, setFormFiles] = useRecoilState(NoticeFormFilesAtom);

  const updateConfirm = (e) => {
    console.log(e);
    setFormType("update");
    setFormData(notice);
    console.log("filesList: ", notice.filesList);
    setFormFiles(notice.filesList);
    navigate("/notice/form");
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

  if (isLoading) return <LoadingSpin />;
  if (error) return <GetDataErrorView />;

  return (
    <div>
      <div
        style={{
          marginTop: isMobile ? 50 : 100,
          // marginBottom: isMobile ? 50 : 200,
          marginLeft: isMobile ? 30 : isTablet ? 100 : "20%",
          marginRight: isMobile ? 30 : isTablet ? 100 : "20%",
        }}
      >
        {/* 제목 */}
        <p
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: colors.text_black_color,
          }}
        >
          {notice.title}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 작성일 | 카테고리 */}
          <p
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: colors.text_body_color,
              marginTop: 10,
              marginBottom: 30,
              whiteSpace: "pre-wrap",
            }}
          >
            <span
              style={
                {
                  // borderRightWidth: 3,
                  // borderRightStyle: "solid",
                  // borderRightColor: colors.text_body_color,
                  // paddingRight: 10,
                  // marginRight: 10,
                }
              }
            >
              {dayjs(notice.createdAt).format("YYYY.MM.DD")}
            </span>
            {"  |  "}
            <span>{notice.noticeCategory}</span>
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Popconfirm
              title="공지사항 수정"
              description="공지사항을 수정하시겠습니까?"
              onConfirm={updateConfirm}
              onCancel={updateCancel}
              okText="수정"
              cancelText="취소"
            >
              <Button type="text" icon={<EditOutlined />} />
            </Popconfirm>
            <Popconfirm
              title="공지사항 삭제"
              description="공지사항을 삭제하시겠습니까?"
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
        </div>

        {/* 구분선 */}
        <DefaultSeparator color={colors.gray_light} />

        {/* 내용 */}
        <p style={{ fontWeight: "600", whiteSpace: "pre-line", marginTop: 30 }}>
          {notice.contents}
        </p>
        {notice.filesList && notice.filesList.length > 0 && (
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
              {notice.filesList.map((file, index) => (
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
    </div>
  );
};

export default NoticeDetailPage;
