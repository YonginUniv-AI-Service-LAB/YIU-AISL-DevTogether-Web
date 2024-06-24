import { atom } from "recoil";

// 문의 목록 조회
export const Ask = atom({
  key: "Ask",
  default: "create",
});

// 문의 form 타입 => 작성 || 수정
export const AskFormTypeAtom = atom({
  key: "AskFormTypeAtom",
  default: "create",
});

// 문의 데이터
export const AskDataAtom = atom({
  key: "AskDataAtom",
  default: {},
});

// 문의 파일 데이터
export const AskFilesAtom = atom({
  key: "AskFilesAtom",
  default: [],
});

// 문의 form 데이터 [등록, 수정]
export const AskFormDataAtom = atom({
  key: "AskFormDataAtom",
  default: {},
});

// 문의 form 파일 데이터 [등록, 수정]
export const AskFormFilesAtom = atom({
  key: "AskFormFilesAtom",
  default: [],
});

// 문의 삭제할 form 파일 데이터
export const AskDeleteFilesAtom = atom({
  key: "AskDeleteFilesAtom",
  default: [],
});
