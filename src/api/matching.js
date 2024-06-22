// 🌈 멘토 조회
//   const {
//     data: mentor,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["mentor"],
//     queryFn: async () => {
//   const res = await authAPI.get("/mentor")
//       return res.data;
//     },
//   });

// 🌈 멘티 조회
//   const {
//     data: mentee,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["mentee"],
//     queryFn: async () => {
//   const res = await authAPI.get("/mentee")
//       return res.data;
//     },
//   });

// 🌈 멘토 스크랩
// const 멘토_스크랩 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/scrap/mentor", {
//       scrapId: data
//     }),
//   onSuccess: () => {
// 메시지 따로 없이 그냥 스크랩 표시만 해주면 될듯?
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  403: 권한없음
//   },
// });

// 🌈 멘티 스크랩
// const 멘티_스크랩 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/scrap/mentee", {
//     scrapId: data
//     }),
//   onSuccess: () => {
// 메시지 따로 없이 그냥 스크랩 표시만 해주면 될듯?
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  403: 권한없음
//   },
// });

// 🌈 멘티가 멘토에게 신청하기
// const 멘티가_멘토에게_신청하기 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/matching/application/mentor"),
//   onSuccess: () => {
//  message.success("OOO 멘토에게 과외를 신청했습니다!");
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  400: 데이터 미입력
//  403: 권한없음
//   },
// });

// 🌈 멘토가 멘티에게 신청하기
// const 멘토가_멘티에게_신청하기 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/matching/application/mentee"),
//   onSuccess: () => {
//  message.success("OOO 멘티에게 과외를 신청했습니다!");
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  400: 데이터 미입력
//  403: 권한없음
//   },
// });

// 🌈 신청 수락
// const 신청_수락 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.put("/matching/application", {
//       matchingId: data
//     }),
//   onSuccess: () => {
//  message.success("신청을 수락했습니다!");
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  400: 데이터 미입력
//  403: 권한없음
// 404: id 없음
//   },
// });

// 🌈 신청 삭제
// const 신청_삭제 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.delete("/matching/application", {
//       matchingId: data
//     }),
//   onSuccess: () => {
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  403: 권한없음
//   },
// });

// 🌈 신청 거절
// const 신청_거절 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.put("/matching/refusal", {
//      matchingId: data
//     }),
//   onSuccess: () => {
//  message.success("신청을 거절했습니다!");
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  400: 데이터 미입력
//  403: 권한없음
// 404: id 없음
//   },
// });

// 🌈 신청 확정
// const 신청_확정 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/matching/confirmation", {
//        matchingId: data
//     }),
//   onSuccess: () => {
//  message.success("매칭이 확정되었습니다!");
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  403: 권한없음
//   },
// });

// 🌈 신청 종료
// const 신청_종료 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/matching/end", {
//         matchingId: data
//     }),
//   onSuccess: () => {
//  message.success("매칭이 종료되었습니다!");
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//  403: 권한없음
//   },
// });
