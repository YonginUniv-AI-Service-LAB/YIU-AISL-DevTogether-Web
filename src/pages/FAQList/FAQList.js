import { Button, Collapse, Popconfirm, Spin, theme } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import { colors } from "../../assets/colors";
import Accordion from "react-bootstrap/Accordion";
import { message } from "antd";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import styles from "./FAQList.module.css";
import PageHeaderImage from "../../assets/images/PageHeaderImage/faq.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI, defaultAPI, refreshAccessToken } from "../../api";
import HoverEventButton from "../../components/Button/HoverEventButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FAQFormDataAtom, FAQFormTypeAtom } from "../../recoil/atoms/faq";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import axios from "axios";

const FAQListPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // FAQ 조회
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

  // FAQ 삭제
  const deleteData = useMutation({
    mutationFn: async () =>
      await axios({
        method: "DELETE",
        url: "/admin/faq",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          faqId: data,
        },
      }),
    onSuccess: (data, variables) => {
      message.success("FAQ 삭제 완료");
      // FAQ 목록 리로드
      queryClient.invalidateQueries("faq");

      // FAQ 목록 중 삭제한 faqId만 삭제하는 로직 => 현재 보류...
      // queryClient.setQueryData("faq", (oldData) => {
      //   // oldData가 배열인지 확인하고, 맞다면 filter 메소드를 사용
      //   return oldData ? oldData.filter((faq) => faq.faqId !== variables) : [];
      // });
    },
    onError: async (e) => {
      console.log("에러: ", e.request);
      console.log("faqId: ", data);
      // 데이터 미입력
      if (e.request.status == 400) message.error("faq를 다시 선택해주세요.");
      // 데이터 미입력
      else if (e.request.status == 404) {
        message.error("존재하지 않는 FAQ입니다. ");
        queryClient.invalidateQueries("faq");
        // FAQ 목록으로 이동
        navigate(-1);
      }
      // 권한 없음 OR 액세스 토큰 만료
      else if (e.request.status == 401 || e.request.status == 403) {
        // 액세스토큰 리프레시
        if (refresh === false) {
          const isTokenRefreshed = await refreshAccessToken();
          setRefresh(true);
          if (isTokenRefreshed) {
            deleteData.mutate();
          } else navigate("/");
        } else message.error("권한이 없습니다.");
      }
      // 서버 오류
      else if (e.request.status == 500)
        message.error("잠시 후에 다시 시도해주세요.");
    },
  });

  // 페이지 이동
  const navigate = useNavigate();
  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(FAQFormTypeAtom);

  // FAQ 수정 페이지로 이동
  const updateConfirm = (data) => {
    setFormType("update");
    setFormData(data);
    navigate("/faq/form");
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
  if (error) return <GetDataErrorView />;

  return (
    <div>
      <PageHeader title="자주묻는질문" subtitle="" image={PageHeaderImage} />
      <div
        style={{
          marginTop: isMobile ? 50 : 100,
          marginBottom: isMobile ? 0 : 100,
          marginLeft: isMobile ? 10 : isTablet ? 80 : "15%",
          marginRight: isMobile ? 10 : isTablet ? 80 : "15%",
        }}
      >
        {sessionStorage.getItem("role") == 0 ? (
          <div style={{ textAlign: "end", marginBottom: 30 }}>
            <HoverEventButton
              title={"FAQ 등록"}
              onClick={() => {
                setFormType("create");
                setFormData({ faqId: 0, title: "", contents: "" });
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
                        okText="수정"
                        cancelText="취소"
                      >
                        <Button type="text" icon={<EditOutlined />} />
                      </Popconfirm>
                      <Popconfirm
                        title="FAQ 삭제"
                        description="FAQ를 삭제하시겠습니까?"
                        onConfirm={() => {
                          setData(data.faqId);
                          deleteData.mutate();
                        }}
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
