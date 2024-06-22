import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultTag from "../../components/Tag/DefaultTag";
import FormLabelText from "../../components/Text/FormLabel";
import { colors } from "../../assets/colors";
import BottomLineText from "../../components/Text/BottomLineText";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import HoverEventButton from "../../components/Button/HoverEventButton";
import TextArea from "antd/es/input/TextArea";
import DefaultButton from "../../components/Button/DefaultButton";

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

  // 임시설정
  const manager = true;

  const [answerInput, setAnswerInput] = useState(false);
  const [answer, setAnswer] = useState("");
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

  // 답변 렌더링 함수
  function showAnswerSection() {
    // status 1이면 => 답변을 보여줌
    if (location.state.data.status === 1) {
      return (
        <p
          style={{
            whiteSpace: "pre-line",
            padding: 20,
          }}
        >
          {location.state.data.contents}
        </p>
      );
    } else {
      if (manager) {
        // stauts 0 && 매니저이면서 && answerInput이 true이면 => O & 텍스트 인풋
        if (answerInput) {
          return (
            <>
              <TextArea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={`문의에 대한 답변을 작성해주세요`}
                autoSize={{
                  minRows: 10,
                  // maxRows: 100,
                }}
                // count={{
                //   show: true,
                //   max: 3000,
                // }}
                size={"large"}
                style={{ marginBottom: 15 }}
              />
              <DefaultButton
                text="완료"
                onClick={() => setAnswerInput(false)}
              />
            </>
          );
        }
        // status 0 && 매니저이면 => O & 댓글 작성 버튼
        else {
          return (
            <div style={{ textAlign: "center", padding: 50 }}>
              <HoverEventButton
                title={"답변 작성"}
                onClick={() => setAnswerInput(true)}
                size={"middle"}
                bgColor={colors.sub}
                bgColor_hover={colors.main}
                fontColor={"white"}
                fontColor_hover={"white"}
              />
            </div>
          );
        }
      }
      // status 0 && 일반 유저이면 => 잠시 기다려달라는 메세지
      else
        return (
          <p style={{ textAlign: "center", fontWeight: "bold", padding: 50 }}>
            답변을 준비중입니다 : )
          </p>
        );
    }
  }

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
        <div style={{ marginTop: 100 }}>
          <BottomLineText text={"답변"} fontSize={25} />
          {showAnswerSection()}
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailPage;
