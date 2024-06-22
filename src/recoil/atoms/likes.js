
import { atom } from 'recoil';
import { data_board } from '../../assets/data/board';

// 각 포스트마다 고유한 좋아요 수를 관리하기 위해 동적으로 key를 생성합니다.
const postLikesState = (postId) => atom({
  key: `postLikesState_${postId}`,
  default: data_board.find(post => post.id === postId)?.likes || 0,
});

const postLikeState = (postId) => atom({
    key: `postLikeState_${postId}`,
    default: false, // 각 포스트의 좋아요 상태는 기본적으로 false로 설정합니다.
});

export { postLikeState, postLikesState };