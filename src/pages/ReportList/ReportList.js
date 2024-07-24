import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PageHeader from "../../components/Group/PageHeader/PageHeader";
import styles from "./ReportList.module.css";
import Column from "antd/es/table/Column";
import ReportCategoryTag from "../../components/Tag/ReportCategoryTag";

const InquriyListPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 신고 내역 데이터 상태
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('/report', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        console.log("Fetched report data:", response.data); // 콘솔에 데이터 출력
        setReportData(response.data);
      } catch (error) {
        console.error('신고 내역을 가져오는 중 오류 발생:', error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <PageHeader title="신고내역" subtitle="신고내역을 확인해보세요." />
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
          dataSource={reportData}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate("/report/detail", { state: { data: record } });
              },
            };
          }}
          pagination={{
            position: ["bottomCenter"],
          }}
          rowClassName={styles.table_row}
        >
          <Column title="번호" dataIndex="id" key="id" width={40} />
          <Column title="카테고리" dataIndex="type" key="type" width={60} />
          <Column
            title="신고 사유"
            dataIndex="category"
            key="category"
            width={90}
            render={(v) => <ReportCategoryTag category={v} />}
          />
          <Column
            title="문의 날짜"
            dataIndex="createdAt"
            key="createdAt"
            width={50}
          />
        </Table>
      </div>
    </div>
  );
};

export default InquriyListPage;
