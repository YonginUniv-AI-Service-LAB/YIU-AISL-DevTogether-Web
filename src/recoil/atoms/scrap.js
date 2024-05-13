import { atom } from 'recoil';

export const posterScrapState = atom({
  key: 'posterScrapState',
  default: {}, // 스크랩 상태를 포스터 ID를 키로 하는 객체로 관리합니다.
});
