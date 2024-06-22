import { atom } from 'recoil';

export const scrollPositionState = atom({
  key: 'scrollPositionState',
  default: 0, // 기본값은 페이지 맨 위 (스크롤이 맨 위에 위치할 경우)
});