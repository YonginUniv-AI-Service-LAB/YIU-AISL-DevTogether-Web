import { atom } from "recoil";
import { data_message } from "../../assets/data/message";

export const MessageStatusAtom = atom({
  key: "MessageStatusAtom",
  default: true,
});

export const MessageAtom = atom({
  key: "MessageAtom",
  default: {},
});

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
