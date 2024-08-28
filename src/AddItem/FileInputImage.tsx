import "./AddItem.css";
import plus from "../images/plus.svg";
import deleteIcon from "../images/deleteIcon.svg";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postImage } from "../api";

interface Props {
  onImageUpload: (url: string) => void;
  initialImage: string;
}

function FileInputImage({ onImageUpload, initialImage }: Props) {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [imageUrl, setImageUrl] = useState<string>(initialImage);

  const mutation = useMutation({
    mutationFn: postImage,
    onSuccess: useCallback(
      (url: string) => {
        setImageUrl(url);
        onImageUpload(url);
      },
      [onImageUpload]
    ),
    onError: (error) => {
      console.error("이미지 업로드 오류: ", error);
    },
  });

  useEffect(() => {
    if (!currentImage && initialImage) {
      setImageUrl(initialImage);
      setPreviewImage(initialImage);
    } else if (currentImage) {
      const objectURL = URL.createObjectURL(currentImage);
      setPreviewImage(objectURL);

      return () => {
        setPreviewImage(undefined);
        URL.revokeObjectURL(objectURL);
      };
    }
  }, [currentImage, initialImage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentImage(file);
      mutation.mutate(file);
    } else {
      setCurrentImage(null);
    }
  };

  const handleFileDelete = () => {
    setCurrentImage(null);
    setImageUrl("");
    setPreviewImage(undefined);
    onImageUpload("");
  };

  console.log(currentImage);
  console.log(previewImage);

  return (
    <div className="add-product image">
      <label className="add-label">상품 이미지</label>
      <div className="add-img">
        <label className="custom-file-upload">
          <img src={plus} alt="이미지 등록" className="upload-icon" />
          <span className="upload-text">이미지 등록</span>
          <input
            className="add-product-input image"
            type="file"
            onChange={handleFileChange}
          />
        </label>
        {imageUrl && (
          <div className="img-delete">
            <img
              className="current-Image"
              src={previewImage}
              alt="현재 이미지"
            />
            <button className="img-delete-button " onClick={handleFileDelete}>
              <img
                src={deleteIcon}
                alt="삭제"
                className="img-delete-button-img"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileInputImage;
