import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input, Table, Tag } from "antd";
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

const InquriyListPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

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
          // columns={columns}
          dataSource={data_ask}
          // title={() => InquriyListHeader()}
          // footer={() => "Footer"}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate("/inquiry/detail", { state: { data: record } });
              }, // click row
            };
          }}
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
