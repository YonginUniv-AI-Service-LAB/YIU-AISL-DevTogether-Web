import { selector } from "recoil";
import {
  MessageAtom,
  MessageListAtom,
  MessageStatusAtom,
} from "../atoms/message";
import { data_message } from "../../assets/data/message";
import axios from "axios";

// 쪽지 상태 - 받는 쪽지함 / 보낸 쪽지함
export const MessageStatusSelector = selector({
  key: "MessageStatusSelector",
  get: ({ get }) => {
    return get(MessageStatusAtom);
  },
});

// 현재 선택된 쪽지
export const MessageSelector = selector({
  key: "MessageSelector",
  get: ({ get }) => {
    return get(MessageAtom);
  },
});

// 쪽지 목록
export const MessageListSelector = selector({
  key: "MessageListSelector",
  get: async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return data_message;
  },
});

export const ReceivedMessagesSelector = selector({
  key: "ReceivedMessagesSelector",
  get: async ({ get }) => {
    // const { data } = await axios.get("/path/to/your/message/api");
    // const data = data_message; // 예시 데이터 사용

    // 유저가 받은 쪽지 필터링
    return data_message.filter((message) => message.to_user_id === "누들잉");
  },
});

export const SentMessagesSelector = selector({
  key: "SentMessagesSelector",
  get: async ({ get }) => {
    // const { data } = await axios.get("/path/to/your/message/api");
    // const data = data_message; // 예시 데이터 사용
    // 유저가 보낸 쪽지 필터링
    return data_message.filter((message) => message.from_user_id === "누들잉");
  },
});

// // 해당 유저가 받은 쪽지 리스트
// export const ReceivedMessagesSelector = selector({
//   key: "ReceivedMessagesSelector",
//   get: ({ get }) => {
//     const messages = get(MessageListAtom);
//     return messages.map((item, index) => {
//       return item.from_user_id === "누들잉";
//     });
//   },
// });

// // 해당 유저가 보낸 쪽지 리스트
// export const SentMessagesSelector = selector({
//   key: "SentMessagesSelector",
//   get: ({ get }) => {
//     const messages = get(MessageListAtom);
//     return messages.map((item, index) => {
//       return item.from_user_id === "누들잉";
//     });
//   },
// });

// export const TotalPriceSelector = selector({
//   key: "TotlaPriceSelector",
//   get: ({ get }) => {
//     const CurrentItem = get(CartAtom);
//     return CurrentItem.reduce(
//       (acc, cur) => acc + cur.price,
//       0
//     ).toLocaleString();
//   },
// });
