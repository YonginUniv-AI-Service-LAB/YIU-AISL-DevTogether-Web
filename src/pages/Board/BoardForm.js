import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import boardimg from "../../assets/images/PageHeaderImage/board.svg";
import Body from "../../components/Group/Body/Body";
import { Form, Select, Input, Button, message, Upload } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "../Board/Board.module.css";
import { data_board } from "../../assets/data/board"; // data_board import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFileAPI, refreshAccessToken } from "../../api";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../../components/Text/FormLabel";
import { BoardFormFilesAtom } from "../../recoil/atoms/board";
import { useRecoilState } from "recoil";
import { InboxOutlined } from "@ant-design/icons";

const BoardForm = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 페이지 이동
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // 파일 관련 상태 변수
  const [formFiles, setFormFiles] = useRecoilState(BoardFormFilesAtom); // 전체 파일 데이터
  const [files, setFiles] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]); // 삭제할 기존 파일 fileId 배열
  const [newFiles, setNewFiles] = useState([]); // 새로 추가할 파일 데이터 배열

  // 리프레시 진행 여부(액세스 토큰 재발급)
  const [refresh, setRefresh] = useState(false);

  const create_post = useMutation({
    mutationFn: async () => {
      // FormData 형식에 데이터를 넣어줘야 함!
      const formData = new FormData();
      formData.append("title", title);
      formData.append("contents", contents);
      formData.append("category", category);

      if (newFiles.length > 0)
        newFiles.forEach((file) => {
          formData.append("file", file.originFileObj); // 새로 추가한 파일 추가
        });
      else formData.append("file", new Blob()); // 빈 Blob 객체를 파일로 추가

      await authFileAPI.post(
        `/board/${sessionStorage.getItem("role") == 1 ? "mentor" : "mentee"}`,
        formData,
        {
          transformRequest: [
            function () {
              return formData;
            },
          ],
        }
      );
    },
    onSuccess: (data, variables) => {
      message.success("게시글이 등록되었습니다.");
      queryClient.invalidateQueries("board");
      navigate(-1);
    },
    onError: (e) => handleMutationError(e),
  });

  const update_post = useMutation({
    mutationFn: async () => {
      // FormData 형식에 데이터를 넣어줘야 함!
      const formData = new FormData();
      // formData.append("boardId", boardId);
      formData.append("title", title);
      formData.append("contents", contents);
      formData.append("category", category);

      if (newFiles.length > 0)
        newFiles.forEach((file) => {
          formData.append("file", file.originFileObj); // 새로 추가한 파일 추가
        });
      else formData.append("file", new Blob()); // 빈 Blob 객체를 파일로 추가

      await authFileAPI.put(
        `/board/${sessionStorage.getItem("role") == 1 ? "mentor" : "mentee"}`,
        formData,
        {
          transformRequest: [
            function () {
              return formData;
            },
          ],
        }
      );
    },
    onSuccess: (data, variables) => {
      message.success("게시글이 수정되었습니다.");
      queryClient.invalidateQueries("board");
      navigate(-1);
    },
    onError: (e) => handleMutationError(e),
  });

  // 에러 핸들러
  const handleMutationError = async (e) => {
    // 데이터 미입력
    if (e.request.status === 400) message.error("모든 값을 입력해주세요.");
    // 공지사항 id 없음
    else if (e.request.status == 400)
      message.error("존재하지 않는 게시글입니다.");
    // OR 액세스 토큰 만료 OR 권한 없음
    else if (e.request.status === 401 || e.request.status === 403) {
      if (!refresh) {
        // const isTokenRefreshed = await refreshAccessToken();
        // setRefresh(true);
        // if (isTokenRefreshed) {
        //   formType === "create" ? create_post.mutate() : update_post.mutate();
        // } else {
        //   navigate("/");
        // }
      } else {
        message.error("권한이 없습니다.");
      }
    }
    // 서버 오류
    else if (e.request.status === 500) {
      message.error("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    // 전달된 게시글 데이터가 있는 경우, 해당 데이터로 상태를 설정
    if (location.state) {
      setTitle(location.state.title || "");
      setValue(location.state.contents || "");
      setCategory(location.state.category || "");
      setImg(location.state.img || "");
    } else {
      const tempPost = JSON.parse(localStorage.getItem("tempPost"));
      if (tempPost) {
        setTitle(tempPost.title);
        setValue(tempPost.contents);
        setCategory(tempPost.category);
        setImg(tempPost.img);
      }
    }
  }, [location.state]);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    setShowPlaceholder(!editor.getText().trim());
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleTempSave = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

    const post = {
      id: formattedDate,
      title,
      contents: value,
      category,
      createdAt: formattedDate,
      likes: 0,
      views: 0,
      comment: 0,
      img: "",
      nickname: "작성자",
      userImage: "/default_user_image.png",
      introduction: "작성자 소개",
      scraped: false,
    };

    localStorage.setItem("tempPost", JSON.stringify(post));
    message.success("임시 저장되었습니다.");
  };

  const handleComplete = () => {
    if (!title || !value || !category) {
      message.error("제목, 내용 및 카테고리를 입력해주세요.");
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

    const post = {
      id: formattedDate,
      title,
      contents: value,
      category,
      createdAt: formattedDate,
      likes: 0,
      views: 0,
      comment: 0,
      img: "",
      nickname: "작성자",
      userImage: "/default_user_image.png",
      introduction: "작성자 소개",
      scraped: false,
    };

    data_board.push(post);
    localStorage.removeItem("tempPost"); // 게시글 저장 후 임시 저장 데이터 삭제
    message.success("게시글이 저장되었습니다.");
    navigate("/board");
  };

  // 파일 업로드 변경 시 처리
  const handleUploadChange = ({ fileList }) => {
    console.log("fileList: ", fileList);
    setFiles(fileList);

    // 새로 추가된 파일만 필터링 (originFileObj가 있는 파일)
    const addedFiles = fileList.filter((file) => file.type);
    setNewFiles(addedFiles);
  };

  // 파일 삭제 시 처리
  const handleRemoveFile = (file) => {
    console.log("삭제할 file: ", file);
    // 기존 파일 목록에서 삭제
    setFiles(files.filter((item) => item.uid != file.uid));
    // 삭제한 파일의 fileId를 deleteFiles 배열에 추가
    if (file.uid) {
      setDeleteFiles((prev) => [...prev, parseInt(file.uid)]);
    }
  };

  return (
    <div>
      {!isMobile && (
        <div className={style.background2}>
          <div style={{ paddingBottom: "200px" }}></div>
          <Body
            sentence1="나와 같은 꿈을 가진 사람들과의 대화"
            sentence2="일상적인 얘기부터 필요한 정보까지"
            title="커뮤니티"
            imageSrc={boardimg} // 이미지 경로를 전달합니다.
          />
        </div>
      )}
      {isMobile && (
        <div className={style.background2}>
          <div style={{ paddingBottom: "100px" }}></div>
          <Body
            sentence1="나와 같은 꿈을 가진 사람들과의 대화"
            sentence2="일상적인 얘기부터 필요한 정보까지"
            title="커뮤니티"
          />
        </div>
      )}
      <div
        style={{
          marginLeft: isMobile ? "5%" : isTablet ? 30 : "12%",
          marginRight: isMobile ? "5%" : isTablet ? 30 : "12%",
        }}
      >
        <div className={style.line}></div>
        <div className={style.color}>
          <div className={style.background}>
            <div style={{ flex: "1", marginTop: "40px" }}>
              <div>
                <div className={style.fix_head}>
                  <div>
                    {!isMobile && (
                      <div className={style.neck}>
                        <div
                          className={style.head}
                          style={{ fontSize: "25px", marginLeft: "30px" }}
                        >
                          게시글 작성하기
                        </div>
                        <div style={{ display: "flex", marginRight: "35px" }}>
                          <div className={style.save} onClick={handleTempSave}>
                            임시 저장
                          </div>
                          <div className={style.save} onClick={handleComplete}>
                            완료
                          </div>
                        </div>
                      </div>
                    )}
                    {isMobile && (
                      <div className={style.neck}>
                        <div
                          className={style.head}
                          style={{ fontSize: "20px", marginLeft: "30px" }}
                        >
                          게시글 작성하기
                        </div>
                        <div style={{ display: "flex" }}>
                          <div
                            className={style.mobilesave}
                            style={{ fontSize: "10px" }}
                            onClick={handleTempSave}
                          >
                            임시 저장
                          </div>
                          <div
                            className={style.mobilesave}
                            style={{ fontSize: "10px" }}
                            onClick={handleComplete}
                          >
                            완료
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={style.border}>
                      <Form.Item label="카테고리">
                        <Select
                          style={{ width: "150px" }}
                          placeholder="카테고리 선택"
                          value={category}
                          onChange={handleCategoryChange}
                        >
                          <Select.Option value="free">자유</Select.Option>
                          <Select.Option value="news">뉴스</Select.Option>
                          <Select.Option value="question">
                            질문 / 공부
                          </Select.Option>
                          <Select.Option value="employment">
                            취업 / 기술
                          </Select.Option>
                          <Select.Option value="market">플리마켓</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="제목">
                        <Input
                          placeholder="제목 입력"
                          value={title}
                          onChange={handleTitleChange}
                        />
                      </Form.Item>
                      <Form.Item label="내용">
                        <TextArea
                          placeholder="내용 입력"
                          value={contents}
                          onChange={handleContentsChange}
                          autoSize={{
                            minRows: 10,
                            // maxRows: 100,
                          }}
                          // count={{
                          //   show: true,
                          //   max: 3000,
                          // }}
                          size={"large"}
                          style={{ marginBottom: 15 }}
                        />
                      </Form.Item>
                      <Form.Item label={"파일"} extra={"jpg, png, hwp 등"}>
                        <Upload.Dragger
                          name="files"
                          multiple
                          maxCount={5}
                          beforeUpload={() => false}
                          onChange={handleUploadChange}
                          fileList={files}
                          onRemove={handleRemoveFile}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            업로드하려면 파일을 클릭하거나 이 영역으로
                            드래그하세요.
                          </p>
                          <p className="ant-upload-hint">
                            최대 5개 업로드 가능
                          </p>
                        </Upload.Dragger>
                      </Form.Item>

                      {/* <div className={style.markdown}> */}
                      {/* <ReactQuill
                          style={{ height: "500px", borderRadius: "50px" }}
                          placeholder="본문 내용을 입력해주세요."
                          value={value}
                          onChange={handleChange}
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ header: "1" }, { header: "2" }, { font: [] }],
                              [{ size: [] }],
                              [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                              ],
                              [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                              ],
                              ["link", "image", "video"],
                              ["clean"],
                            ],
                          }}
                        /> */}
                      {/* </div> */}
                    </div>
                    <div style={{ paddingBottom: "100px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardForm;
