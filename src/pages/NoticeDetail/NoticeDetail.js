import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../assets/colors";
import DefaultSeparator from "../../components/Separator/DefaultSeparator";
import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";

const NoticeDetailPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();

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
          {location.state.data.title}
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
              marginTop: 30,
              marginBottom: 30,
              whiteSpace: "pre-wrap",
            }}
          >
            <span>{location.state.data.createdAt}</span>
            {"  |  "}
            <span>{location.state.data.category}</span>
          </p>
          <Button
            type="text"
            icon={<MoreOutlined />}
            onClick={() => alert("아직 구현안했지롱~~~")}
          />
        </div>

        {/* 구분선 */}
        <DefaultSeparator color={colors.gray_light} />

        {/* 내용 */}
        <p style={{ fontWeight: "600", whiteSpace: "pre-line", marginTop: 30 }}>
          {location.state.data.contents}
        </p>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
