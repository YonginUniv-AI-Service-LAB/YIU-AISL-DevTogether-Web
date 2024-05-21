import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input, Spin, Table } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { data_notice } from "../../assets/data/notice";
import PageHeaderImage from "../../assets/images/PageHeaderImage/notice.svg";

import styled from "styled-components";
import { colors } from "../../assets/colors";
import NoticeCategoryButton from "../../components/Button/NoticeCategoryButton";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import styles from "./NoticeList.module.css";
import Column from "antd/es/table/Column";
import HoverEventButton from "../../components/Button/HoverEventButton";
import { useSetRecoilState } from "recoil";
import { NoticeFormTypeAtom } from "../../recoil/atoms/notice";
import { useQuery } from "@tanstack/react-query";
import { fetchNotice } from "../../api/notice";
import axios from "axios";
import dayjs from "dayjs";

const NoticeListPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const {
    data: notice,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/notice");
      console.log("공지사항 목록 조회: ", res.data);
      return res.data;
    },
  });

  // 페이지 이동
  const navigate = useNavigate();

  // 공지사항 데이터
  // const [notice, setNotice] = useState(data_notice);
  // 현재 카테고리
  const [curCategory, setCurCategory] = useState("전체");
  // 현재 검색어
  const [searchText, setSearchText] = useState("");

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(NoticeFormTypeAtom);

  // 임시
  const manager = true;

  const NoticeListHeader = () => {
    return (
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile || isTablet ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Flex
            wrap="wrap"
            gap="small"
            justify="flex-start"
            style={{
              width: isMobile || isTablet ? "100%" : "50%",
              marginBottom: isMobile || isTablet ? 20 : null,
            }}
          >
            <NoticeCategoryButton
              title="전체"
              current={curCategory === "전체" ? true : false}
              onClick={() => setCurCategory("전체")}
            />
            <NoticeCategoryButton
              title="공지"
              current={curCategory === "공지" ? true : false}
              onClick={() => setCurCategory("공지")}
            />
            <NoticeCategoryButton
              title="서비스"
              current={curCategory === "서비스" ? true : false}
              onClick={() => setCurCategory("서비스")}
            />
            <NoticeCategoryButton
              title="업데이트"
              current={curCategory === "업데이트" ? true : false}
              onClick={() => setCurCategory("업데이트")}
            />
          </Flex>
          <Input
            style={{
              width: isMobile || isTablet ? "100%" : "50%",
              color: colors.text_black_color,
            }}
            size="large"
            placeholder="검색어 입력"
            variant="filled"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
    );
  };

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <PageHeader
        title="공지사항"
        subtitle="DevTogether의 다양한 소식을 알려드립니다."
        image={PageHeaderImage}
      />
      <div
        style={{
          marginTop: isMobile ? 50 : 100,
          marginBottom: isMobile ? 0 : 100,
          marginLeft: isMobile ? 10 : isTablet ? 80 : "15%",
          marginRight: isMobile ? 10 : isTablet ? 80 : "15%",
        }}
      >
        {manager ? (
          <div style={{ textAlign: "end", marginRight: 20 }}>
            <HoverEventButton
              title={"공지사항 작성"}
              onClick={() => {
                setFormType("create");
                navigate("/notice/form");
              }}
              size={"middle"}
              bgColor={colors.sub}
              bgColor_hover={colors.main}
              fontColor={"white"}
              fontColor_hover={"white"}
            />
          </div>
        ) : null}
        <Table
          size={isMobile ? "middle" : "large"}
          // columns={columns}
          dataSource={
            curCategory == "전체"
              ? notice.filter((n) => n.title.includes(searchText))
              : notice.filter(
                  (n) =>
                    n.category == curCategory && n.title.includes(searchText)
                )
          }
          title={() => NoticeListHeader()}
          // footer={() => "Footer"}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate("/notice/detail", { state: { data: record } });
              }, // click row
            };
          }}
          pagination={{
            position: ["bottomCenter"],
          }}
          rowClassName={styles.table_row}
        >
          {/* 임시 - 컬럼 오타 */}
          <Column
            title="작성일"
            dataIndex="createAt"
            key="createAt"
            // defaultFilteredValue={(data) => dayjs(data).format("YYYY-MM-DD")}
            width={60}
            render={(text, row, index) => {
              return <>{dayjs(text).format("YYYY.MM.DD")}</>;
            }}
          />
          {/* <Column
            title="작성일"
            dataIndex="createdAt"
            key="createdAt"
            width={60}
          /> */}
          <Column
            title="카테고리"
            dataIndex="noticeCategory"
            key="noticeCategory"
            width={90}
          />
          <Column title="제목" dataIndex="title" key="title" />
        </Table>
      </div>
    </div>
  );
};

export default NoticeListPage;
