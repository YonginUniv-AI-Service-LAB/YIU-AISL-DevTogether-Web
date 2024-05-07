import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input, Table } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { data_notice } from "../../assets/data/notice";
import PageHeaderImage from "../../assets/images/PageHeaderImage/notice.svg";

import styled from "styled-components";
import { colors } from "../../assets/colors";
import NoticeCategoryButton from "../../components/Button/NoticeCategoryButton";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import styles from "./NoticeList.module.css";

const columns = [
  {
    title: "쟉성일",
    dataIndex: "createdAt",
    width: 100,
  },
  {
    title: "카테고리",
    dataIndex: "category",
    width: 100,
    // align: "right",
  },
  {
    title: "제목",
    dataIndex: "title",
  },
];

const NoticeListPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const NoticeListHeader = () => {
    return (
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Flex
            wrap="wrap"
            gap="small"
            justify="space-between"
            style={{ width: "30%" }}
          >
            <NoticeCategoryButton title="전체" />
            <NoticeCategoryButton title="공지" />
            <NoticeCategoryButton title="서비스" />
            <NoticeCategoryButton title="업데이트" />
          </Flex>
          <Input
            style={{ width: "40%", color: colors.gray_mid, fontWeight: 800 }}
            size="large"
            placeholder="검색어 입력"
            variant="filled"
            prefix={<SearchOutlined />}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="공지사항"
        subtitle="DevTogether의 다양한 소식을 알려드립니다."
        image={PageHeaderImage}
      />
      <Container style={{ fontSize: 20 }}>
        <Table
          size="middle"
          columns={columns}
          dataSource={data_notice}
          title={() => NoticeListHeader()}
          // footer={() => "Footer"}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate("/notice/detail", { state: record.noticeid });
              }, // click row
            };
          }}
          pagination={{
            position: ["bottomCenter"],
          }}
          rowClassName={styles.table_row}
        />
      </Container>
    </div>
  );
};

export default NoticeListPage;

const Container = styled.div`
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 15%;
  padding-right: 15%;
`;
