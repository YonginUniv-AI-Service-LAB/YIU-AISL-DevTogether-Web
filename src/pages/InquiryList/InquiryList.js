import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Result, Table, Tag, message } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { data_ask } from "../../assets/data/ask";

import styled from "styled-components";
import { colors } from "../../assets/colors";
import NoticeCategoryButton from "../../components/Button/NoticeCategoryButton";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import styles from "./InquiryList.module.css";
import Column from "antd/es/table/Column";
import PageHeaderImage from "../../assets/images/PageHeaderImage/inquiry.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI, refreshAccessToken } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import PleaseLoginView from "../../components/Result/PleaseLogin";
import HoverEventButton from "../../components/Button/HoverEventButton";
import dayjs from "dayjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AskDataAtom,
  AskFilesAtom,
  AskFormDataAtom,
  AskFormFilesAtom,
  AskFormTypeAtom,
} from "../../recoil/atoms/ask";

const fetchAskData = async (isRetry) => {
  const admin = sessionStorage.getItem("role") == 0 ? "/admin" : "";
  try {
    const res = await authAPI.get(`${admin}/ask`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401 && !isRetry) {
      const isTokenRefreshed = await refreshAccessToken();
      if (isTokenRefreshed) {
        return fetchAskData(true); // 갱신 후 재시도
      } else {
        throw new Error("토큰 갱신 실패");
      }
    } else if (err.response && err.response.status === 403) {
      message.error("권한이 없습니다.");
      throw new Error("권한 없음");
    } else {
      throw err;
    }
  }
};

const useAskQuery = () => {
  return useQuery({
    queryKey: ["ask"],
    queryFn: () => fetchAskData(false),
    retry: false, // 401이나 403 에러를 위해 자동 재시도를 비활성화
  });
};

const InquriyListPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(AskFormTypeAtom);

  const [data, setData] = useRecoilState(AskDataAtom);
  const [files, setFiles] = useRecoilState(AskFilesAtom);
  const [refresh, setRefresh] = useState(false);

  // 문의사항 조회
  const { data: ask, isLoading, error } = useAskQuery();
  // const {
  //   data: ask,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["ask"],
  //   queryFn: async () => {
  //     const admin = sessionStorage.getItem("role") == 0 ? "/admin" : "";
  //     const res = await authAPI.get(`${admin}/ask`);
  //     return res.data;
  //   },
  // });

  if (!sessionStorage.getItem("name")) {
    return (
      <div>
        <PageHeader
          title="문의내역"
          subtitle="문의내역을 확인해보세요."
          image={PageHeaderImage}
        />
        <PleaseLoginView onClick={() => navigate("/signin")} />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (error) {
    return <GetDataErrorView />;
  }

  return (
    <div>
      <PageHeader
        title="문의내역"
        subtitle="문의내역을 확인해보세요."
        image={PageHeaderImage}
      />
      {sessionStorage.getItem("role") == 0 ? null : (
        <div
          style={{
            marginTop: isMobile ? 50 : 100,
            marginBottom: isMobile ? 0 : 100,
            marginLeft: isMobile ? 10 : isTablet ? 80 : "15%",
            marginRight: isMobile ? 10 : isTablet ? 80 : "15%",
            textAlign: "right",
          }}
        >
          <HoverEventButton
            title={"문의하기"}
            onClick={() => {
              setFormType("create");
              navigate("/inquiry/form");
            }}
            size={"middle"}
            bgColor={colors.sub}
            bgColor_hover={colors.main}
            fontColor={"white"}
            fontColor_hover={"white"}
          />
        </div>
      )}
      <div
        style={{
          marginTop: isMobile ? 100 : 100,
          marginBottom: isMobile ? 0 : 100,
          marginLeft: isMobile ? 10 : isTablet ? 100 : "15%",
          marginRight: isMobile ? 10 : isTablet ? 100 : "15%",
        }}
      >
        <Table
          size={"middle"}
          dataSource={ask} // React Query가 자동으로 관리하는 데이터
          onRow={(record, rowIndex) => ({
            onClick: (event) => {
              console.log("데이터: ", record);
              setData(record);
              setFiles(record.filesList);
              navigate("/inquiry/detail", { state: { data: record } });
            },
          })}
          pagination={{
            position: ["bottomCenter"],
          }}
          rowClassName={styles.table_row}
        >
          {/* <Column title="번호" dataIndex="askId" key="askId" width={50} /> */}
          {!isMobile ? (
            <Column
              title="문의 유형"
              dataIndex="askCategory"
              key="askCategory"
              width={90}
            />
          ) : null}
          <Column title="제목" dataIndex="title" key="title" />
          <Column
            title="문의 날짜"
            dataIndex="createAt"
            key="createAt"
            width={100}
            render={(text, row, index) => {
              return <>{dayjs(text).format("YYYY.MM.DD")}</>;
            }}
          />
          <Column
            title="상태"
            dataIndex="status"
            width={isMobile ? 20 : 30}
            render={(status) => (
              <>
                {status === "신청" ? (
                  <Tag bordered={false} color="orange">
                    {isMobile ? "접수" : "문의 접수"}
                  </Tag>
                ) : (
                  <Tag bordered={false} color="processing">
                    {isMobile ? "완료" : "답변 완료"}
                  </Tag>
                )}
              </>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
export default InquriyListPage;
