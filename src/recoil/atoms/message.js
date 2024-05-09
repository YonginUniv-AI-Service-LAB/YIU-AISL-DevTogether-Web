import { atom } from "recoil";
import { data_message } from "../../assets/data/message";

// 쪽지 왼쪽 뷰 => 상세보기 | 작성폼
export const MessageViewStatusAtom = atom({
  key: "MessageViewStatusAtom",
  default: true,
});

// 쪽지 오른쪽 뷰 => 받은 쪽지함 | 보낸 쪽지함
export const MessageStatusAtom = atom({
  key: "MessageStatusAtom",
  default: true,
});

// 현재 쪽지 수신자
export const MessageReceiverAtom = atom({
  key: "MessageReceiverAtom",
  default: '',
});

// 현재 선택된 쪽지 내용
export const MessageAtom = atom({
  key: "MessageAtom",
  default: {},
});

// 쪽지 목록
export const MessageListAtom = atom({
  key: "MessageListAtom",
  default: data_message,
});

// export const ReceivedMessageListAtom = atom({
//   key: "ReceivedMessageListAtom",
//   default: [],
// });

// export const SentMessageListAtom = atom({
//   key: "SentMessageListAtom",
//   default: [],
// });
