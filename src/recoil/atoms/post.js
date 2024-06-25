import { atom } from "recoil";
import { data_board } from "../../assets/data/board";
import { data_comment } from "../../assets/data/comment";

// 각 포스트마다 고유한 좋아요 수를 관리하기 위해 동적으로 key를 생성합니다.
const postViewsState = (postId) =>
  atom({
    key: `postViewsState`,
    default: data_board.find((post) => post.id === postId)?.views || 0,
  });

const postViewState = (postId) =>
  atom({
    key: `postViewState`,
    default: false, // 각 포스트의 조회 상태는 기본적으로 false로 설정합니다.
  });

const postCommentsState = (postId) =>
  atom({
    key: `postCommentsState`,
    default:
      data_comment.filter((comment) => comment.post_id === postId).length || 0,
  });

// 현재 boardId
export const CurrentBoardIdAtom = atom({
  key: "CurrentBoardIdAtom",
  default: null,
});

export { postViewState, postViewsState, postCommentsState };
