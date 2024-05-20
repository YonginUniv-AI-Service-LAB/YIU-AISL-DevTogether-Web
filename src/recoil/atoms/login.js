import { atom } from "recoil";

const pageState = atom({
    key: 'pageState',
    default: '', // 기본 페이지 상태는 'signin'
});

export default pageState;