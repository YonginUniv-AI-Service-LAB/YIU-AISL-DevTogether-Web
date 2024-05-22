import { Collapse, Spin, theme } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { data_faq } from "../../assets/data/faq";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import { colors } from "../../assets/colors";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import styles from "./FAQList.module.css";
import PageHeaderImage from "../../assets/images/PageHeaderImage/faq.svg";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FAQListPage = () => {
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
      const res = await axios.get("http://localhost:8080/faq");
      console.log("공지사항 목록 조회: ", res.data);
      return res.data;
    },
  });

  // 페이지 이동
  const navigate = useNavigate();

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
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

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <PageHeader title="자주묻는질문" subtitle="" image={PageHeaderImage} />
      <div style={{ padding: "10%" }}>
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
                    }}
                  >
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
