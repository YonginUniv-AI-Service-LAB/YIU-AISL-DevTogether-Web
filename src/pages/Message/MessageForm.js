import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Form, Select, Input, Tag, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../../components/Text/FormLabel";
import DefaultButton from "../../components/Button/DefaultButton";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import { colors } from "../../assets/colors";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MessageReceiverAtom,
  MessageViewStatusAtom,
} from "../../recoil/atoms/message";
import HoverEventButton from "../../components/Button/HoverEventButton";
import DefaultTag from "../../components/Tag/DefaultTag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI, refreshAccessToken } from "../../api";

const MessageForm = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 쪽지 수신자
  const messageReceiver = useRecoilValue(MessageReceiverAtom);
  // 쪽지 수신자 설정
  const setMessageReceiver = useSetRecoilState(MessageReceiverAtom);
  // 현재 선택된 왼쪽 뷰 => 상세보기 | 작성폼
  const setLeftView = useSetRecoilState(MessageViewStatusAtom);

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  const send_message = useMutation({
    mutationFn: async () =>
      await authAPI.post(
        `/message/${sessionStorage.getItem("role") == 1 ? "mentor" : "mentee"}`,
        {
          title: title,
          contents: contents,
          toUserId: messageReceiver.id,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("msg");
      message.success(`${messageReceiver.nickname}님께 쪽지를 보냈습니다.`);
      setLeftView(true); // 폼 -> 디테일 뷰
    },
    onError: async (e) => {
      console.log("실패: ", e.request.status);

      // 데이터 미입력
      if (e.request.status == 400)
        message.error("제목과 내용을 모두 입력해주세요.");
      // 데이터 미입력
      else if (e.request.status == 404) {
        message.error("존재하지 않는 유저입니다. ");
        setLeftView(true); // 폼 -> 디테일 뷰
      } else if (e.request.status == 403) message.error("권한이 없습니다.");
      // 액세스 토큰 만료
      else if (e.request.status == 401) {
        // 액세스토큰 리프레시
        const isTokenRefreshed = await refreshAccessToken();
        //
        if (isTokenRefreshed) {
          send_message.mutate();
        } else navigate("/");
      }
      // 서버 오류
      else if (e.request.status == 500)
        message.error("잠시 후에 다시 시도해주세요.");
    },
  });

  // 제출
  const onSubmitForm = () => {
    console.log("쪽지: ", title, contents);
    if (title.length > 0 && contents.length > 0) send_message.mutate();
    else message.error("제목과 내용을 모두 입력해주세요.");
  };

  return (
    <div
      style={{
        width: isMobile || isTablet ? "100%" : "70%",
      }}
    >
      <div style={{ textAlign: "right" }}>
        <HoverEventButton
          title={"취소"}
          onClick={() => {
            setMessageReceiver("");
            setLeftView(true);
          }}
          size={"middle"}
          bgColor={colors.gray_light}
          bgColor_hover={colors.gray_mid}
          fontColor={colors.gray_mid}
          fontColor_hover={"white"}
        />
      </div>
      <Form
        name="wrap"
        labelCol={{
          flex: "120px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={
          {
            // margin: 300,
            // marginTop: 80,
          }
        }
      >
        <Form.Item
          label={<FormLabelText text="수신자" />}
          name="title"
          style={{ marginBottom: 20 }}
        >
          <DefaultTag text={messageReceiver.nickname} />
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="제목" />}
          name="title"
          style={{ marginBottom: 20 }}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            count={{
              show: true,
              max: 100,
            }}
            placeholder="제목 입력"
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          label={<FormLabelText text="내용" />}
          name="contents"
          style={{ marginBottom: 50 }}
        >
          <TextArea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            placeholder="내용 입력"
            autoSize={{
              minRows: 15,
              // maxRows: 100,
            }}
            count={{
              show: true,
              max: 3000,
            }}
            size={"large"}
          />
        </Form.Item>

        <Form.Item label=" ">
          <DefaultButton text="전송" onClick={() => onSubmitForm()} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default MessageForm;
