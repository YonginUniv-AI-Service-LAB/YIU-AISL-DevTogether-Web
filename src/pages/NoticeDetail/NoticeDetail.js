import React from "react";
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
import { useQuery } from "@tanstack/react-query";
import { defaultAPI } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import styles from "./NoticeDetail.module.css";

const NoticeDetailPage = (props) => {
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
      console.log("공지사항 상세보기: ", res.data);
      return res.data;
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
    // message.success("Click on Yes");
    setFormType("update");
    setFormData(notice);
    setFormFiles(notice.filesList);
    navigate("/notice/form");
  };
  const updateCancel = (e) => {
    console.log(e);
  };

  const deleteConfirm = (e) => {
    console.log(e);
    message.success("공지사항 삭제 완료");
    navigate(-1);
  };
  const deleteCancel = (e) => {
    console.log(e);
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            {/* 임시 - 컬럼명 오류 */}
            <span>{dayjs(notice.createdAt).format("YYYY.MM.DD")}</span>
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
                  onClick={() => handleDownload(file.url, file.originName)}
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
