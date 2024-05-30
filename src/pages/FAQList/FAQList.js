import { Button, Collapse, Popconfirm, Spin, theme } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { data_faq } from "../../assets/data/faq";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import { colors } from "../../assets/colors";
import Accordion from "react-bootstrap/Accordion";
import { message } from "antd";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import styles from "./FAQList.module.css";
import PageHeaderImage from "../../assets/images/PageHeaderImage/faq.svg";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { defaultAPI } from "../../api";
import HoverEventButton from "../../components/Button/HoverEventButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FAQFormDataAtom, FAQFormTypeAtom } from "../../recoil/atoms/faq";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import LoadingSpin from "../../components/Spin/LoadingSpin";

const FAQListPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const {
    data: faq,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const res = await defaultAPI.get("/faq");
      return res.data;
    },
  });

  // 임시
  const manager = true;

  // 페이지 이동
  const navigate = useNavigate();
  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(FAQFormTypeAtom);

  const updateConfirm = (e) => {
    // console.log("FAQ 폼데이터", e);
    // message.success("Click on Yes");
    setFormType("update");
    setFormData(e);
    navigate("/faq/form");
  };
  const updateCancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  const deleteConfirm = (e) => {
    console.log(e);
    message.success("FAQ 삭제 완료");
    // navigate(-1);
  };
  const deleteCancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(FAQFormDataAtom);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      // setFormData(eventKey)
      console.log(children, eventKey)
    );

    return (
      <a
        type="button"
        style={{
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          width: "100%",
        }}
        className={styles.faq_title}
        onClick={decoratedOnClick}
      >
        {children}
      </a>
    );
  }

  if (isLoading) return <LoadingSpin />;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <PageHeader title="자주묻는질문" subtitle="" image={PageHeaderImage} />
      <div style={{ padding: isMobile ? "10%" : "15%" }}>
        {manager ? (
          <div style={{ textAlign: "end", marginBottom: 30 }}>
            <HoverEventButton
              title={"FAQ 작성"}
              onClick={() => {
                setFormType("create");
                navigate("/faq/form");
              }}
              size={"middle"}
              bgColor={colors.sub}
              bgColor_hover={colors.main}
              fontColor={"white"}
              fontColor_hover={"white"}
            />
          </div>
        ) : null}
        <Accordion defaultActiveKey="0" flush={true}>
          {faq.map((data, index) => {
            return (
              <Card style={{ marginBottom: 30, borderRadius: 10 }}>
                <CustomToggle eventKey={index.toString()}>
                  <span
                    style={{
                      color: colors.gray_dark,
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      fontSize: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          color: colors.main,
                          fontWeight: "bold",
                          fontSize: 30,
                          marginRight: 10,
                        }}
                      >
                        Q{" "}
                      </span>
                      {data.title}
                    </span>
                    <span>
                      <Popconfirm
                        title="FAQ 수정"
                        description="FAQ를 수정하시겠습니까?"
                        onConfirm={() => updateConfirm(data)}
                        onCancel={updateCancel}
                        okText="수정"
                        cancelText="취소"
                      >
                        <Button type="text" icon={<EditOutlined />} />
                      </Popconfirm>
                      <Popconfirm
                        title="공지사항 삭제"
                        description="FAQ를 삭제하시겠습니까?"
                        onConfirm={deleteConfirm}
                        onCancel={deleteCancel}
                        okText="삭제"
                        cancelText="취소"
                        icon={
                          <ExclamationCircleOutlined
                            style={{
                              color: "red",
                            }}
                          />
                        }
                      >
                        <Button type="text" icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </span>
                  </span>
                </CustomToggle>
                <Accordion.Collapse
                  eventKey={index.toString()}
                  style={{
                    backgroundColor: colors.gray_light,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Card.Body>
                    <span
                      style={{
                        color: colors.gray_mid,
                        fontWeight: 700,
                        fontSize: 18,
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: colors.main,
                          fontWeight: "bold",
                          fontSize: 25,
                          marginLeft: 30,
                          marginRight: 10,
                        }}
                      >
                        A{" "}
                      </span>
                      <span style={{ paddingTop: 5 }}>{data.contents}</span>
                    </span>{" "}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQListPage;
