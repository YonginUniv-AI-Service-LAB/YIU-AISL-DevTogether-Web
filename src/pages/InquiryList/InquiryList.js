import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input, Table, Tag } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { data_ask } from "../../assets/data/ask";

import styled from "styled-components";
import { colors } from "../../assets/colors";
import NoticeCategoryButton from "../../components/Button/NoticeCategoryButton";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import styles from "./InquiryList.module.css";
import Column from "antd/es/table/Column";

const columns = [
  {
    title: "번호",
    dataIndex: "id",
    width: 30,
  },
  {
    title: "문의유형",
    dataIndex: "category",
    width: 50,
    // align: "right",
  },
  {
    title: "제목",
    dataIndex: "title",
    width: 200,
  },
  {
    title: "문의 날짜",
    dataIndex: "createdAt",
    width: 50,
    // align: "right",
  },
  {
    title: "상태",
    dataIndex: "status",
    width: 50,
  },
];

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
      <PageHeader title="문의내역" subtitle="문의내역을 확인해보세요." />
      <Container style={{ fontSize: 20 }}>
        <Table
          size="middle"
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
          <Column
            title="문의 유형"
            dataIndex="category"
            key="category"
            width={70}
          />
          <Column title="제목" dataIndex="title" key="title" width={230} />
          <Column
            title="문의 날짜"
            dataIndex="createdAt"
            key="createdAt"
            width={40}
          />
          <Column
            title="상태"
            dataIndex="status"
            width={30}
            render={(status) => (
              <>
                {status === 0 ? (
                  <Tag bordered={false} color="orange">
                    문의 접수
                  </Tag>
                ) : (
                  <Tag bordered={false} color="processing">
                    답변 완료
                  </Tag>
                )}
              </>
            )}
          />
        </Table>
      </Container>
    </div>
  );
};

export default InquriyListPage;

const Container = styled.div`
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 15%;
  padding-right: 15%;
`;
