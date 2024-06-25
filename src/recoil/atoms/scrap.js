import { atom, selector } from 'recoil';

// 포스트마다 고유한 스크랩 상태를 관리하기 위해 동적으로 key를 생성합니다.
const posterScrapState = atom({
  key: 'posterScrapState',
  default: false // 각 포스트의 스크랩 상태는 기본적으로 false로 설정합니다.
});

const matchingScrapState = atom({
  key: 'matchingScrapState',
  default: false // 각 매칭프로필의 스크랩 상태는 기본적으로 false로 설정합니다.
});

// 스크랩한 프로필 목록을 관리하는 Recoil 아톰
const scrappedProfilesState = atom({
  key: 'scrappedProfilesState',
  default: [], // 기본값은 빈 배열로 설정
});

// 사용자가 스크랩한 게시물의 ID를 저장하는 배열
const posterScrapIdState = atom({
  key: 'posterScrapIdState',
  default: [], // 사용자가 스크랩한 게시물의 ID를 저장하는 배열
});

// 사용자가 스크랩한 포스트의 ID 목록을 가져오는 selector
const userScrapedPostIdsSelector = selector({
  key: 'userScrapedPostIdsSelector',
  get: ({get}) => {
    return get(posterScrapIdState);
  }
});

// 사용자가 스크랩한 포스트를 가져오는 selector
const userScrapedPostsSelector = selector({
  key: 'userScrapedPostsSelector',
  get: ({get}) => {
    const scrapIds = get(userScrapedPostIdsSelector);
    return scrapIds.map(postId => ({
      id: postId,
      // 포스트의 기타 정보들을 필요에 따라 가져올 수 있습니다.
    }));
  }
});

export { posterScrapState, posterScrapIdState, userScrapedPostIdsSelector, userScrapedPostsSelector, matchingScrapState, scrappedProfilesState };