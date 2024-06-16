// 🌈 쪽지 조회
//   const {
//     data: myMessages,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myMessages"],
//     queryFn: async () => {
//   const res = await authAPI.get("/message")
//       return res.data;
//     },
//   });

// 🌈 쪽지 보내기
// const 쪽지_보내기 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/message", {
//       data: {
//         title: data.title,
//         contents: data.contents,
//         to_user_id: data.to_user_id,
//         from_user_id: data.from_user_id,
//       },
//     }),
//   onSuccess: () => {
//     // 문의 답변 등록 성공 메시지
//     // message.success("답변을 성공적으로 등록했습니다.");
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
