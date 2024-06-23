import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Result, Table, Tag } from "antd";
import React from "react";
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
import { authAPI } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import PleaseLoginView from "../../components/Result/PleaseLogin";

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

  // 문의사항 조회
  const {
    data: ask,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ask"],
    queryFn: async () => {
      let res;
      if (sessionStorage.getItem("role") == 0) res = await authAPI.get("/ask");
      else res = await authAPI.get("/admin/ask");
      return res.data;
    },
  });

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
              navigate("/inquiry/detail", { state: { data: record } });
            },
          })}
          pagination={{
            position: ["bottomCenter"],
          }}
          rowClassName={styles.table_row}
        >
          <Column title="번호" dataIndex="id" key="id" width={30} />
          {!isMobile ? (
            <Column
              title="문의 유형"
              dataIndex="category"
              key="category"
              width={90}
            />
          ) : null}
          <Column title="제목" dataIndex="title" key="title" />
          <Column
            title="문의 날짜"
            dataIndex="createdAt"
            key="createdAt"
            width={40}
          />
          <Column
            title="상태"
            dataIndex="status"
            width={isMobile ? 20 : 30}
            render={(status) => (
              <>
                {status === 0 ? (
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
