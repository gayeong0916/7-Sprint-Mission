import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import "../ProductItem.css";
import { getReviews } from "../api";
import { Link } from "react-router-dom";

interface RequestParams {
  currentPage: number;
  pageSize: number;
  orderBy: string;
}
interface Product {
  id: string;
  name: string;
  price: number;
  favoriteCount: number;
  images: string[];
}
type OrderBy = "favorite";

function BestProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<OrderBy>("favorite");

  const changeBestPageSize = () => {
    if (window.innerWidth >= 1200) {
      setPageSize(4);
      return;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
      setPageSize(2);
      return;
    }
    if (window.innerWidth >= 375 && window.innerWidth <= 767) {
      setPageSize(1);
      return;
    }
  };

  const getBestProduct = async ({
    currentPage,
    pageSize,
    orderBy,
  }: RequestParams) => {
    const data = await getReviews({ currentPage, pageSize, orderBy });
    setProductList(data.list);
  };

  useEffect(() => {
    getBestProduct({ currentPage, pageSize, orderBy });
  }, [orderBy, pageSize, currentPage]);

  useEffect(() => {
    window.addEventListener("resize", changeBestPageSize);
    return () => window.removeEventListener("resize", changeBestPageSize);
  }, []);

  return (
    <div className="container best">
      <h2 className="productlist-h2">베스트 상품</h2>
      <ul className="best-productlist">
        {productList.map((item) => (
          <Link to={`./${item.id}`} key={item.id} className="link">
            <ProductItem
              imgUrl={item.images[0]}
              name={item.name}
              price={item.price}
              favoriteCount={item.favoriteCount}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default BestProductList;
