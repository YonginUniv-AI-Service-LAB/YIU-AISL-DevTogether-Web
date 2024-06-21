// 🌈 나의 문의 조회
//   const {
//     data: myAsks,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myAsks"],
//     queryFn: async () => {
//   const res = await authAPI.get("/ask")
//       return res.data;
//     },
//   });

// 🌈 관리자 문의 조회
//   const {
//     data: asks,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["asks"],
//     queryFn: async () => {
//   const res = await authAPI.get("/admin/ask")
//       return res.data;
//     },
//   });

// 🌈 문의 작성
// const 문의_작성 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("contents", data.contents);
//     formData.append("askCategory", data.askCategory);

//     files.forEach((file) => {
//       formData.append("file", file);
//     });

//     await authFileAPI.post("/ask", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 문의 업로드 성공 메세지
//     message.success("문의가 등록되었습니다.");
//     // 뒤로가기 => 리스트?
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//     //  400: 데이터 미입력
//     //  404: 회원없음
//   },
// });

// 🌈 문의 수정
// const 문의_수정 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("askId", data.askId);
//     formData.append("title", data.title);
//     formData.append("contents", data.contents);
//     formData.append("askCategory", data.askCategory);

//     files.forEach((file) => {
//       formData.append("file", file);
//     });

//     await authFileAPI.put("/ask", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 문의 수정 성공 메세지
//     message.success("문의가 수정되었습니다.");
//     // 뒤로가기 => 리스트?
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//     //       404:회원없음
//     // 404: id 없음
//     // 400: 데이터 미입력
//     // 404수정 불가(관리자가 답변을 남겼는데 수정하려는 경우)
//     // 403- 권한없음(자기가 쓴 글이 아닌데 수정하려는 경우)
//   },
// });

// 🌈 문의 삭제
// const 문의_삭제 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.delete("/ask", {
//       askId: data.askId,
//     }),
//   onSuccess: () => {
//     // 문의 삭제 성공 메시지
//     // message.success("문의가 삭제 되었습니다.");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     //       404:회원없음
//     // 404: id 없음
//     // 400: 데이터 미입력
//     // 403- 권한없음(자기가 쓴 글이 아닌데 삭제하려는 경우)
//   },
// });

// 🌈 문의 답변
// const 문의_답변 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/admin/ask/answer", {
//       askId: data.askId,
//       answer: data.answer,
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
//     // 404: id 없음
//     // 400: 데이터 미입력
//     // 403 권한 없음
//   },
// });
