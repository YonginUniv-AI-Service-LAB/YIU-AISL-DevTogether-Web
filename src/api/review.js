// 🌈 보낸 리뷰 조회
// const {
//   data: sendedReviews,
//   isLoading,
//   error,
// } = useQuery({
//   queryKey: ["sendedReviews"],
//   queryFn: async (data) => {
//     const res = await authAPI.get("/review/send", { role: data });
//     return res.data;
//   },
// });

// 🌈 받은 리뷰 조회
// const {
//   data: receivedReviews,
//   isLoading,
//   error,
// } = useQuery({
//   queryKey: ["receivedReviews"],
//   queryFn: async () => {
//     const res = await authAPI.get("/review/receive", { role: data });
//     return res.data;
//   },
// });

// 🌈 리뷰 작성
// const 리뷰_작성 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/review", {
//       matching_id: data.matching_id,
//       contents: data.contents,
//       hide: data.hide,
//       category: data.category,
//     }),
//   onSuccess: () => {
//     message.success("리뷰를 작성했습니다!");
//   },
//   onError: (e) => {
//     // 400: 데이터 미입력
//     // 404: id 없음
//     // 403: 권한없음
//   },
// });

// 🌈 리뷰 숨기기
// const 리뷰_숨기기 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.put("/review/hide", {
//       review_id: data.review_id,
//       hide: data.hide,
//     }),
//   onSuccess: () => {
//     message.success("리뷰를 숨겼습니다!");
//   },
//   onError: (e) => {
//     // 403: 권한 없음
//     // 404: id 없음
//   },
// });
