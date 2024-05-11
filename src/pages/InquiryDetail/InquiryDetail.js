import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultTag from "../../components/Tag/DefaultTag";
import FormLabelText from "../../components/Text/FormLabel";
import { colors } from "../../assets/colors";
import BottomLineText from "../../components/Text/BottomLineText";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const InquiryDetailPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();
  // 페이지 이동
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image1.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image2.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image3.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image4.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

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
        <BottomLineText text={"문의"} fontSize={25} />
        <div style={{ padding: 20 }}>
          <span style={{ fontWeight: "bold" }}>
            {location.state.data.category}
          </span>

          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text_black_color,
              marginBottom: 30,
            }}
          >
            {location.state.data.title}
          </p>

          <p
            style={{
              whiteSpace: "pre-line",
              marginBottom: 30,
            }}
          >
            {location.state.data.contents}
          </p>
          <Upload
            {...props}
            fileList={fileList}
            listType={"text"}
            showUploadList={{ showRemoveIcon: false }}
          >
            {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
          </Upload>
        </div>

        {location.state.data.status != 2 ? (
          <div style={{ marginTop: 100 }}>
            <BottomLineText text={"답변"} fontSize={25} />
            <p
              style={{
                whiteSpace: "pre-line",
                padding: 20,
                // borderStyle: "solid",
                // borderWidth: 2,
                // borderColor: colors.gray_light,
                // backgroundColor: colors.background,
              }}
            >
              {location.state.data.contents}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InquiryDetailPage;
