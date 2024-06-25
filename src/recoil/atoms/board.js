import { atom } from 'recoil';

export const scrollPositionState = atom({
  key: 'scrollPositionState',
  default: 0, // 기본값은 페이지 맨 위 (스크롤이 맨 위에 위치할 경우)
});

// 게시판form 타입 => 작성 || 수정
export const BoardFormTypeAtom = atom({
  key: "BoardFormTypeAtom",
  default: "create",
});

// 게시판form 데이터
export const BoardFormDataAtom = atom({
  key: "BoardFormDataAtom",
  default: {},
});

// 게시판form 파일 데이터
export const BoardFormFilesAtom = atom({
  key: "BoardFormFilesAtom",
  default: [],
});

// 게시판삭제할 form 파일 데이터
export const BoardDeleteFilesAtom = atom({
  key: "BoardDeleteFilesAtom",
  default: [],
});