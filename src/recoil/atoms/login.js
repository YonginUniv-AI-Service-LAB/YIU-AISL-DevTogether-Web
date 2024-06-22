import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: "", // 기본 페이지 상태는 'signin'
});

export const loginRoleStateAtom = atom({
  key: "loginRoleStateAtom",
  default: 1,
});
