import { atom } from "recoil";

// FAQ 목록 조회
export const FAQ = atom({
  key: "FAQ",
  default: "create",
});

// FAQ form 타입 => 작성 || 수정
export const FAQFormTypeAtom = atom({
  key: "FAQFormTypeAtom",
  default: "create",
});

// FAQ form 데이터
export const FAQFormDataAtom = atom({
  key: "FAQFormDataAtom",
  default: {},
});
