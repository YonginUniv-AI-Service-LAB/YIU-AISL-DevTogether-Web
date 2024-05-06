import { atom } from "recoil";

export const MessageStatusAtom = atom({
  key: "MessageStatusAtom",
  default: true,
});

export const MessageAtom = atom({
  key: "MessageAtom",
  default: {
    id: 1,
    title: "이번 겨울 매우 추울 예정",
    contents: `꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다.`,
    from_user_id: "누들잉",
    to_user_id: "조마이누",
    status: 0,
    createdAt: "2024.04.14 (15:28)",
    updatedAt: "2024.04.14 (15:28)",
  },
});

export const MessageListAtom = atom({
  key: "MessageListAtom",
  default: [],
});

// export const ReceivedMessageListAtom = atom({
//   key: "ReceivedMessageListAtom",
//   default: [],
// });

// export const SentMessageListAtom = atom({
//   key: "SentMessageListAtom",
//   default: [],
// });
