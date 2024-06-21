// 🌈 신고하기
// const 신고하기 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/report", {
//       contents: data.contents,
//       to_user_id: data.to_user_id,
//       from_user_id: data.from_user_id,
//       type: data.type,
//       type_id: data.type_id,
//       category: data.category,
//     }),
//   onSuccess: () => {
//     // 신고 접수 성공 메시지
//     // message.success("신고가 접수되었습니다!");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     //       400: 데이터 미입력
//     // 403: 권한없음
//     // 404: to_user_id 없음
//   },
// });

// 🌈 관리자용 신고 목록 조회
//   const {
//     data: reports,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["reports"],
//     queryFn: async () => {
//   const res = await authAPI.get("/report")
//       return res.data;
//     },
//   });

// 🌈 신고 처리
// const 신고_처리 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.put("/report", {
//       reportId: data.reportId,
//       status: data.status,
//     }),
//   onSuccess: () => {
//     // 신고 처리 성공 메시지
//     // message.success("신고가 성공적으로 처리되었습니다!");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     //       400: 데이터 미입력
//     // 403: 권한없음
//   },
// });
