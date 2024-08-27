import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import "./AddItem.css";
import FileInputImage from "./FileInputImage";
import deleteTag from "../images/deleteTag.svg";
import Header from "../headers/Header";
import { postAddItem } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string;
}

function AddItem() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: "",
  });
  const [productTagInput, setProductTagInput] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postAddItem,
    onSuccess: (data) => {
      const id = data.id;
      navigate(`/items/${id}`);
    },
    onError: (error) => {
      console.error("상품 등록 실패: ", error);
    },
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "price") {
      value = value.replace(/[^0-9]/g, "");
      const formatNumber = parseFloat(value) || 0;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formatNumber,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      mutation.mutate(formData);
    } catch (error: any) {
      console.log("상품 등록에 실패했습니다: ", error.message);
    }
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductTagInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = productTagInput.trim();

      if (newTag !== "") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          tags: [...prevFormData.tags, newTag],
        }));
        setProductTagInput("");
      }
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: url,
    }));
  };

  console.log(formData);

  useEffect(() => {
    const { name, description, price, tags } = formData;
    if (name && description && price && tags) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  return (
    <>
      <Header />
      <div className="all-wrapper">
        <div className="wrapper">
          <div className="add-top">
            <h2 className="register">상품 등록하기</h2>
            <button
              className={`add-button ${isDisabled ? "disabled" : ""}`}
              type="submit"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              등록
            </button>
          </div>
          <div className="add-total">
            <FileInputImage
              onImageUpload={handleImageUpload}
              initialImage={formData.images}
            />
            <div className="add-product">
              <label className="add-label" htmlFor="product-name">
                상품명
              </label>
              <input
                name="name"
                value={formData.name}
                className="add-product-input product-name"
                id="product-name"
                type="text"
                placeholder="상품명을 입력해주세요"
                onChange={handleInput}
              />
            </div>
            <div className="add-product">
              <label className="add-label" htmlFor="product-introduce">
                상품 소개
              </label>
              <textarea
                name="description"
                value={formData.description}
                className="add-product-input introduction"
                id="product-introduce"
                placeholder="상품 소개를 입력해주세요"
                onChange={handleInput}
              ></textarea>
            </div>
            <div className="add-product">
              <label className="add-label" htmlFor="product-price">
                판매 가격
              </label>
              <input
                name="price"
                value={formData.price.toLocaleString()}
                className="add-product-input product-price"
                id="product-price"
                type="text"
                placeholder="판매 가격을 입력해주세요"
                onChange={handleInput}
              />
            </div>
            <div className="add-product">
              <label className="add-label" htmlFor="product-tag">
                태그
              </label>
              <input
                name="tags"
                value={productTagInput}
                className="add-product-input tag"
                id="product-tag"
                type="text"
                placeholder="태그를 입력해주세요"
                onChange={handleTagInputChange}
                onKeyDown={handleKeyDown}
              />
              <div className="tag-container">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="tag-container-value">
                    {tag}
                    <button
                      className="delete-tag"
                      onClick={() => handleRemoveTag(index)}
                    >
                      <img src={deleteTag} alt="태그 삭제" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
