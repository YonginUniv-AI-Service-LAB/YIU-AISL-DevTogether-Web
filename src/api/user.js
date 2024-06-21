// ❗️ AccessToken이 필요한 GET API에서 403은 AccessToken이 만료된 경우
//     => 액세스 토큰 재발급 진행
//         => 새로운 액세스 토큰으로 해당 API 다시 시도

// 🌈 알림내역 조회
//   const {
//     data: push,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["push"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/push")
//       return res.data;
//     },
//   });

// 🌈 알림 확인
// const 알림_확인 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.put("/user/push", {
//       id: data,
//     }),
//   onSuccess: () => {},
//   onError: (e) => {},
// });

// 🌈 내 정보 조회
//   const {
//     data: myInfo,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myInfo"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user")
//       return res.data;
//     },
//   });

// 🌈 내 정보 수정
// const 내_정보_수정 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("id", data.id);
//     formData.append("email", data.email);
//     formData.append("pwd", data.pwd);
//     formData.append("name", data.name);
//     formData.append("nickname", data.nickname);
//     formData.append("role", data.role);
//     formData.append("gender", data.gender);
//     formData.append("age", data.age);

//     formData.append("location1", data.location1);
//     formData.append("location2", data.location2);
//     formData.append("location3", data.location3);

//     formData.append("subject1", data.subject1);
//     formData.append("subject2", data.subject2);
//     formData.append("subject3", data.subject3);
//     formData.append("subject4", data.subject4);
//     formData.append("subject5", data.subject5);

//     files.forEach((file) => {
//       formData.append("img", file);
//     });

//     await authFileAPI.put("/user", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 회원정보 수정 성공 메시지
//     message.success("회원정보가 수정되었습니다!");
//     // 내 정보 리로드
//     queryClient.invalidateQueries("myInfo");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//     // 400: 데이터 미입력
//     // 403: 권한없음
//     // 404: id 없음
//     // 409: 데이터 중복(nickname)
//   },
// });

// 🌈 내 댓글 조회
//   const {
//     data: myComments,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myComments"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/comment")
//       return res.data;
//     },
//   });

// 🌈 내 게시글 조회
//   const {
//     data: myPosts,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myPosts"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/board")
//       return res.data;
//     },
//   });

// 🌈 내 스크랩 게시글 조회
//   const {
//     data: myScrapedPosts,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myScrapedPosts"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/scrap/board")
//       return res.data;
//     },
//   });

// 🌈 내 스크랩 멘티 조회
//   const {
//     data: myScrapedMentees,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myScrapedMentees"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/scrap/mentee")
//       return res.data;
//     },
//   });

// 🌈 내 스크랩 멘토 조회
//   const {
//     data: myScrapedMentors,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myScrapedMentors"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/scrap/mentor")
//       return res.data;
//     },
//   });

// 🌈 내 매칭 멘티 조회
//   const {
//     data: myMentees,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myMentees"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/matching/mentee")
//       return res.data;
//     },
//   });

// 🌈 내 매칭 멘토 조회
//   const {
//     data: myMentors,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myMentors"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/matching/mentor")
//       return res.data;
//     },
//   });

// 🌈 나의 멘티 프로필 조회 [내거]
//   const {
//     data: myMenteeProfile,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myMenteeProfile"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/mentee")
//       return res.data;
//     },
//   });

// 🌈 나의 멘토 프로필 조회 [내거]
//   const {
//     data: myMentorProfile,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myMentorProfile"],
//     queryFn: async () => {
//   const res = await authAPI.get("/user/mentor")
//       return res.data;
//     },
//   });

// 🌈 내 멘티 프로필 수정
// const 내_멘티_프로필_수정 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("introduction", data.introduction);
//     formData.append("method", data.method);
//     formData.append("schedule", data.schedule);
//     formData.append("fee", data.fee);

//     files.forEach((file) => {
//       formData.append("image", file);
//     });

//     await authFileAPI.put("/user/mentee", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 내 멘티 프로필 수정 성공 메시지
//     message.success("회원님의 멘티 프로필이 수정되었습니다!");
//     // 내 정보 리로드
//     queryClient.invalidateQueries("myMenteeProfile");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//     //  400: 데이터 미입력
//     //  403: 권한없음
//   },
// });

// 🌈 내 멘토 프로필 수정
// const 내_멘토_프로필_수정 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("introduction", data.introduction);
//     formData.append("method", data.method);
//     formData.append("schedule", data.schedule);
//     formData.append("fee", data.fee);
//     formData.append("pr", data.pr);
//     formData.append("link", data.link);
//     formData.append("contents", data.contents);

//     files.forEach((file) => {
//       formData.append("image", file);
//     });

//     await authFileAPI.put("/user/mentor", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 내 멘토 프로필 수정 성공 메시지
//     message.success("회원님의 멘토 프로필이 수정되었습니다!");
//     // 내 정보 리로드
//     queryClient.invalidateQueries("myMentorProfile");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//     //  400: 데이터 미입력
//     //  403: 권한없음
//   },
// });
