import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { postComment } from "../api";
import { useParams } from "react-router-dom";

const ProductInqury = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const { productId } = useParams();
  const [comment, setComment] = useState("");

  const postMutation = useMutation({
    mutationFn: (content: string) => postComment(Number(productId), content),
    onSuccess: () => {
      console.log("댓글 등록 성공");
      setComment("");
      if(onSuccess) onSuccess();
    },
    onError: (error) => {
      console.log("댓글 등록 실패: ", error);
    },
  });

  const handlePostClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      postMutation.mutate(comment);
    } catch (error: any) {
      console.log("댓글 등록에 실패했습니다: ", error.message);
    }
  };

  return (
    <div className="middle-wrapper">
      <h3 className="inquiry">문의하기</h3>
      <textarea
        className="inquiry-box"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setIsFormValid(!!e.target.value);
        }}
      />
      <div className="button-container">
        <button
          className="middle-wrapper-button"
          disabled={!isFormValid}
          onClick={handlePostClick}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default ProductInqury;
