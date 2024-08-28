import React, { useEffect, useRef, useState } from "react";
import detail_heart from "../images/detail-heart.svg";
import morebutton from "../images/morebutton.svg";
import user from "../images/user.svg";
import { deleteAddItem, getUser} from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

function formatNumber(number: number): string {
  return new Intl.NumberFormat("ko-KR").format(number) + "원";
}

interface DetailInfoItem {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

interface DetailInfoProps {
  detailItem: DetailInfoItem;
}

interface UserProps {
  images: string;
  nickname: string;
  updatedAt: string;
}

function extractDate(date: string) {
  return date.split("T")[0];
}

const ProductDetailInfo = ({ detailItem }: DetailInfoProps) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setIsUser] = useState<UserProps>();
  const dropdownRef=useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUser();
      setIsUser(userInfo);
    };

    fetchUserInfo();
  }, []);

  const deletemutation = useMutation({
    mutationFn: deleteAddItem,
    onSuccess: () => {
      navigate("/items");
    },
    onError: (error) => {
      console.error("상품 삭제 실패: ", error);
    },
  });

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      deletemutation.mutate(Number(productId));
    } catch (error: any) {
      console.log("상품 삭제에 실패했습니다: ", error.message);
    }
  };

  const handlePatchClick = () => {
    navigate(`/edit/${productId}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="detailInfo">
      <img
        className="img-detail"
        src={detailItem.images[0]}
        alt="상품 상세 사진"
        width={"486px"}
        height={"486px"}
      />
      <div className="detail-info-wrapper">
        <div className="Info-wrapper">
          <div className="Info-wrapper-name">
            <h1 className="detailItem-name">{detailItem.name}</h1>
            <button
              className="dropdown-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={morebutton} alt="더보기" width="24" height="24" />
              {isOpen && (
                <div className="dropdown-container" ref={dropdownRef}>
                  <button
                    className="dropdown-item-edit"
                    onClick={handlePatchClick}
                  >
                    수정하기
                  </button>
                  <button
                    className="dropdown-item-delete"
                    onClick={handleDeleteClick}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </button>
          </div>

          <h1 className="detailItem-price">{formatNumber(detailItem.price)}</h1>
          <div className="top-wrapper-line"></div>
          <p className="top-wrapper-title">상품 소개</p>
          <p className="detailItem-description">{detailItem.description}</p>
          <p className="top-wrapper-title">상품 태그</p>
          {detailItem.tags.map((tag, index) => (
            <p key={index} className="detailItem-tags">
              {`#${tag}`}
            </p>
          ))}
        </div>
        <div className="addItem-user-container">
          <img
            src={user || isUser?.images}
            width="40"
            height="40"
            alt="등록 사용자"
          />
          <div className="addItem-user-info">
            <div className="addItem-user-name-container">
              <span className="addItem-user-name">{isUser?.nickname}</span>
              <span className="addItem-user-date">
                {extractDate(detailItem.updatedAt || "")}
              </span>
            </div>
            <div className="addItem-favorite-count">
              <div className="addItem-line"></div>
              <button className="favorite-count">
                <img src={detail_heart} alt="좋아요" width="32" height="32" />
                <span className="favorite-count-number">
                  {detailItem.favoriteCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
