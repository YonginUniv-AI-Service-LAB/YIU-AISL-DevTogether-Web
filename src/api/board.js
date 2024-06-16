// 🌈 게시글 조회
//   const {
//     data: board,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["board"],
//     queryFn: async () => {
//   const res = await defaultAPI.get("/board")
//       return res.data;
//     },
//   });

// 🌈 게시글 상세조회
//   const {
//     data: post,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["post"],
//     queryFn: async () => {
//   const res = await defaultAPI.get(`/board/post?id=${data}`)
//       return res.data;
//     },
//   });

// 🌈 게시글 작성
// const 게시글_작성 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("contents", data.contents);

//     files.forEach((file) => {
//       formData.append("file", file);
//     });

//     await authFileAPI.post("/board", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 게시글 업로드 성공 메시지
//     message.success("게시글이 업로드 되었습니다.");
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

// 🌈 게시글 수정
// const 게시글_수정 = useMutation({
//   mutationFn: async (data, files) => {
//     // FormData 형식에 데이터를 넣어줘야 함!
//     const formData = new FormData();
//     formData.append("boardId", data.boardId);
//     formData.append("title", data.title);
//     formData.append("contents", data.contents);
//     formData.append("deletedId", data.deletedId);

//     files.forEach((file) => {
//       formData.append("file", file);
//     });

//     await authFileAPI.put("/board", formData, {
//       transformRequest: [
//         function () {
//           return formData;
//         },
//       ],
//     });
//   },
//   onSuccess: (data, variables) => {
//     // 게시글 수정 성공 메시지
//     message.success("게시글이 수정 되었습니다.");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     console.log("실패: ", e);
//     message.error("잠시 후에 다시 시도해주세요");
//     //  400: 데이터 미입력
//     //  403: 권한없음
//     //  404: id 없음
//   },
// });

// 🌈 게시글 삭제
// const 게시글_삭제 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.delete("/board", {
//       data: {
//         boardId: data.boardId,
//       },
//     }),
//   onSuccess: () => {
//     // 게시글 삭제 성공 메시지
//     // message.success("게시글이 삭제 되었습니다.");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     //     //  400: 데이터 미입력
//     //     //  403: 권한없음
//     //     //  404: id 없음
//   },
// });

// 🌈 게시글 좋아요
// const 게시글_좋아요 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/board/like", {
//       data: {
//         boardId: data.boardId,
//         count: data.count,
//       },
//     }),
//     onSuccess: () => {
//       // 메시지 없이 좋아요 버튼 표시만 하면 될듯?
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 403: 권한 없음
//     // 404: id 없음
//     // 409: 데이터 중복
//   },
// });

// 🌈 게시글 스크랩
// const 게시글_스크랩 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/board/scrap", {
//       data: {
//         boardId: data.boardId,
//       },
//     }),
//   onSuccess: () => {
//     // 메시지 없이 스크랩 버튼 표시 하면 될듯?
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 403: 권한 없음
//     // 404: id 없음
//   },
// });

// 🌈 댓글 등록
// const 댓글_등록 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/board/comment", {
//       data: {
//         boardId: data.boardId,
//         contents: data.contents,
//       },
//     }),
//     onSuccess: () => {
//       // 화면 업데이트 진행
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 403: 권한 없음
//     // 404: id 없음
//     // 400: 데이터 미입력
//   },
// });

// 🌈 댓글_삭제
// const 댓글_삭제 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.delete("/board/comment", {
//       data: {
//         commentId: data.commentId,
//       },
//     }),
//     onSuccess: () => {
//     message.success("댓글이 삭제되었습니다");
//     // 화면 업데이트
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 403: 권한 없음
//     // 404: id 없음
//     // 400: 데이터 미입력
//   },
// });

// 🌈 댓글 수정
// const 댓글_수정 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.put("/board/comment", {
//       data: {
//         commentId: data.commentId,
//         contents: data.contents,
//       },
//     }),
//     onSuccess: () => {
//       // 화면 업데이트 진행
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 403: 권한 없음
//     // 404: id 없음
//     // 400: 데이터 미입력
//   },
// });

// 🌈 댓글 좋아요
// const 댓글_좋아요 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/board/comment/like", {
//       data: {
//         id: data.id,
//       },
//     }),
//     onSuccess: () => {
//       // 메시지 없이 댓글 좋아요 버튼 표시만 하면 될듯?
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 403: 권한 없음
//     // 404: id 없음
//     // 409: 데이터 중복
//   },
// });
