import { atom } from 'recoil';
import {data_comment} from '../../assets/data/comment';

// 각 포스트마다 고유한 좋아요 수를 관리하기 위해 동적으로 key를 생성합니다.
const commentLikesState = (commentId) => atom({
    key: `commentLikesState`,
    default: data_comment.find(comment => comment.id === commentId)?.likes || 0,
  });
  
  const commentLikeState = (commentId) => atom({
      key: `commentLikeState`,
      default: false, // 각 포스트의 좋아요 상태는 기본적으로 false로 설정합니다.
  });
  
  export { commentLikeState, commentLikesState };