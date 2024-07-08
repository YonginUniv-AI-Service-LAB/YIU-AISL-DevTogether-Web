import React, { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImgUpload = ({ currentImage, onImageChange, isEditing }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentImage || "");
  const [removedImage, setRemovedImage] = useState(null); // 삭제된 이미지를 기억합니다.

  useEffect(() => {
    setPreviewImage(currentImage);
  }, [currentImage]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => {
    onImageChange(fileList[0]?.originFileObj);
  };

  const handleRemove = () => {
    setRemovedImage(previewImage); // 삭제된 이미지를 기억합니다.
    onImageChange(null); // 이미지를 삭제하면 null을 전달하여 부모 컴포넌트에서 처리
  };

  const handleCancelEdit = () => {
    if (removedImage) {
      setPreviewImage(removedImage); // 삭제된 이미지를 복원합니다.
      setRemovedImage(null); // 삭제된 이미지 상태를 초기화합니다.
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={currentImage ? [{ uid: "-1", url: currentImage }] : []}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={isEditing ? handleRemove : false} // 수정 중일 때만 삭제 기능 활성화
        // beforeUpload={() => false}
        // maxCount={1}
      >
        {currentImage ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      {!isEditing && removedImage && (
        // 수정이 취소될 때 삭제된 이미지가 있으면 보여줍니다.
        <Image
          style={{ display: "none" }} // 보이지 않도록 스타일을 적용합니다.
          src={removedImage}
        />
      )}
    </>
  );
};

export default ImgUpload;
