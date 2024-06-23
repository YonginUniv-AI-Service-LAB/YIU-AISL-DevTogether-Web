import { defaultAPI, authAPI, authFileAPI } from ".";

// 🌈 회원가입
// const 회원가입 = useMutation({
//   mutationFn: async (data) =>
//     await defaultAPI.post("/register", {
//       email: data.eamil,
//       pwd: data.pwd,
//       name: data.name,
//       nickname: data.nickname,
//       role: data.role,
//       gender: data.gender,
//       age: data.age,
//       birth: data.birth,
//       question: data.question,
//       answer: data.answer,
//     }),
//   onSuccess: () => {
//     // 회원가입 성공 후 1) 회원가입 성공 메세지 => 로그인 화면 OR 2) 회원가입 성공 화면
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
//     // 400: 데이터 미입력
//     // 409: 데이터 중복(nickname) // 예외
//     // 409: 데이터 중복(email)
//   },
// });

// 🌈 로그인
const 로그인 = useMutation({
  mutationFn: async (data) =>
    await defaultAPI.post("/login", {
      email: data.eamil,
      pwd: data.pwd,
      role: data.role,
    }),
  onSuccess: () => {
    // 로그인 후 필요한 정보 저장
    const { email, user_profile_id, name, nickname, role, token } =
      response.data;
    sessionStorage.setItem("accessToken", token["accessToken"]);
    sessionStorage.setItem("refreshToken", token["refreshToken"]);
    sessionStorage.setItem("user_profile_id", user_profile_id);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("role", role);

    // 메인 화면으로 이동
  },
  onError: (e) => {
    console.log("실패: ", e);
    message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    // 400: 데이터 미입력
    // 401: 회원정보 불일치
    // 404: 회원없음
  },
});

// 🌈 메인
// => Main.js 확인

// 🌈 회원가입 시 이메일 인증
// => Register.js 확인

// 🌈 비밀번호 변경 시 이메일 인증
const 비밀번호_변경_이메일_인증 = useMutation({
  mutationFn: async (email) =>
    await defaultAPI.post("/pwd/email", {
      email: email,
    }),
  onSuccess: () => {
    message.success("인증번호가 전송되었습니다.");
    setSelectedButton(true);
    setRemainingTime(180);
  },
  onError: (e) => {
    console.log("실패: ", e);
    message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
  },
});

// 🌈 비밀번호 변경
const 비밀번호_변경 = useMutation({
  mutationFn: async (data) =>
    await defaultAPI.post("/pwd/change", {
      email: data.email,
      pwd: data.pwd,
    }),
  onSuccess: () => {
    message.success("비밀번호 변경에 성공하였습니다!");
    // 로그인 화면으로 이동
  },
  onError: (e) => {
    console.log("실패: ", e);
    message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    //400: 데이터 미입력
  },
});

// 🌈 액세스토큰 재발급
const 액세스토큰_재발급 = useMutation({
  mutationFn: async (data) =>
    await defaultAPI.post("/token/refresh", {
      accessToken: sessionStorage.getItem("accessToken"),
      refreshToken: sessionStorage.getItem("refreshToken"),
    }),
  onSuccess: () => {
    const { accessToken, refreshToken } = response.data;
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    // 로그인 화면으로 이동
  },
  onError: (e) => {
    // 403: 권한 없음 => 세션 만료 처리 하고 다시 로그인 하도록
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user_profile_id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("role");
    navigate("/", { replace: true });
    message.error("로그인 세션이 만료되어 로그아웃 됩니다.");
  },
});

// 🌈 멘토/멘티 변경시 accessToken 재발급
const 역할변경_액세스토큰_재발급 = useMutation({
  mutationFn: async (data) =>
    await defaultAPI.post("/token/change", {
      accessToken: sessionStorage.getItem("accessToken"),
      refreshToken: sessionStorage.getItem("refreshToken"),
      role: data,
    }),
  onSuccess: () => {
    const { accessToken, refreshToken } = response.data;
    const role = sessionStorage.getItem("role") == 1 ? 0 : 1; // 현재 role 반대로
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("role", role);
    // 로그인 화면으로 이동
  },
  onError: (e) => {
    // 403: 권한 없음
    // message.error("로그인 세션이 만료되어 로그아웃 됩니다.");
  },
});

// 🌈 닉네임 중복 검사
const 닉네임_중복_검사 = useMutation({
  mutationFn: async (data) =>
    await defaultAPI.post("/nickname", {
      nickname: data,
    }),
  onSuccess: () => {
    message.success("사용가능한 닉네임입니다");
  },
  onError: (e) => {
    //   409: 중복
    message.error("이미 존재하는 닉네임입니다. 다른 닉네임을 지어주세요!");
  },
});

// 🌈 이메일 찾기
const 이메일_찾기 = useMutation({
  mutationFn: async (data) =>
    await defaultAPI.post("/email", {
      name: data.name,
      birth: data.birth,
      question: data.question,
      answer: data.answer,
    }),
  onSuccess: () => {
    // response로 이메일 받아서 유저에게 보여주기
    // 후에 로그인 화면으로 이동할 수 있도록 버튼
  },
  onError: (e) => {
    message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    // 400: 데이터 없음 (한개라도 없으면 데이터 없음 )
    // 401: 정보 불일치( 답변, 질문 일치 x)
    // 404: 회원없음 (name, birth 이 불일치 경우)
  },
});

// 🌈 역할 추가
// const 역할_추가 = useMutation({
//   mutationFn: async () => await authAPI.put("/role"),
//   onSuccess: () => {
//     message.success("회원님의 역할이 추가되었습니다!");
//   },
//   onError: (e) => {
//     message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
//     // 403: 권한 없음
//   },
// });

// 🌈 과목 프론트 넘겨주기
// async () => {
//   const res = await authAPI.get("/subject");
//   return res.data;
// },

// 🌈 파일 다운로드
async (data) => {
  const res = await defaultAPI.get("/download", { fileId: data });
  return res.data;
};
