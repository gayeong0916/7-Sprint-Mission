import React from "react";
import morebutton from "../images/morebutton.svg";
import comment_empty from "../images/comment_empty.svg";
import user from "../images/user.svg";

interface Comment {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  writer: {
    id: number;
    image: string;
    nickname: string;
  };
}
interface Props {
  comment: Comment[];
}

function timeAgo(dateString:string):string {
  const now = new Date();
  const updatedAt = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - updatedAt.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInDays}일 전`;
  }
}

const ProductComment = ({ comment }:Props) => {
  return (
    <div className="bottom-wrapper">
      {comment.length > 0 ? (
        comment.map((com) => (
          <div key={com.id}>
            <div className="comment-content-button">
            <p className="comment-content">{com.content}</p>
            <img
              src={morebutton}
              alt="더보기 버튼"
              width="24"
              height="24"
            />
            </div>
            <div className="comment-wrapper-img">
              <img
                src={com.writer.image || user}
                alt="사용자"
                width="40"
                height="40"
              />
              <div className="comment-wrapper-user">
                <span className="comment-user">{com.writer.nickname}</span>
                <span className="comment-time">{timeAgo(com.updatedAt)}</span>
              </div>
            </div>
            <div className="line"></div>
          </div>
        ))
      ) : (
        <div className="comment-empty-wrapper">
        <img src={comment_empty} alt="문의" width="200" height="200" />
        <span className="comment-empty">아직 문의가 없습니다.</span>
        </div>
      )}
    </div>
  );
};

export default ProductComment;
