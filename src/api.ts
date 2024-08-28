interface ReviewsParams {
  currentPage?: number;
  pageSize: number;
  orderBy: string;
}
interface FormData {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string;
}
const baseURL = "https://panda-market-api.vercel.app";
const productURL = `${baseURL}/products`;
const authURL = `${baseURL}/auth`;
const token = localStorage.getItem("accessToken");

export async function getReviews({
  currentPage = 1,
  pageSize,
  orderBy,
}: ReviewsParams) {
  const response = await fetch(
    `${productURL}?page=${currentPage}&pageSize=${pageSize}&orderBy=${orderBy}`
  );
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getProductId({ productId }: { productId: string }) {
  const response = await fetch(`${productURL}/${productId}`);
  if (!response.ok) {
    throw new Error("상품을 찾을 수 없습니다");
  }
  const body = await response.json();
  return body;
}

export async function getProductIdComments({
  productId,
}: {
  productId: string;
}) {
  const response = await fetch(`${productURL}/${productId}/comments?limit=3`);
  if (!response.ok) {
    throw new Error("댓글을 찾을 수 없습니다");
  }
  const body = await response.json();
  return body;
}

export async function postSignup(formData: any) {
  try {
    const response = await fetch(`${authURL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("회원 생성에 실패했습니다");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`회원 생성에 실패했습니다: ${error.message}`);
  }
}

export async function postSignIn(formData: any) {
  try {
    const response = await fetch(`${authURL}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("로그인에 실패했습니다");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`로그인에 실패했습니다: ${error.message}`);
  }
}

//내 정보 가져오기
export async function getUser() {
  const response = await fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("내 정보를 가져오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

//상품 등록하기
export async function postAddItem(ProductData: FormData) {
  try {
    const response = await fetch(productURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ProductData),
    });
    if (!response.ok) {
      throw new Error("상품 등록에 실패했습니다");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`상품 등록에 실패했습니다: ${error.message}`);
  }
}

//등록한 상품 가져오기
export async function getAddItem(productId: number) {
  const response = await fetch(`${productURL}/${productId}`);
  if (!response.ok) {
    throw new Error("상품을 찾을 수 없습니다");
  }
  const body = await response.json();
  return body;
}

//등록한 상품 수정하기
export async function patchAddItem(ProductData: FormData, productId: number) {
  try {
    const response = await fetch(`${productURL}/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ProductData),
    });
    if (!response.ok) {
      throw new Error("상품 수정에 실패했습니다");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`상품 수정에 실패했습니다: ${error.message}`);
  }
}

//등록한 상품 삭제하기
export async function deleteAddItem(productId: number) {
  try {
    const response = await fetch(`${productURL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("상품 삭제에 실패했습니다");
    }
  } catch (error: any) {
    throw new Error(`상품 삭제에 실패했습니다: ${error.message}`);
  }
}

//댓글 등록
export async function postComment(productId: number, content: string) {
  try {
    const response = await fetch(`${productURL}/${productId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({content}),
    });
    if (!response.ok) {
      throw new Error("댓글 등록에 실패했습니다");
    }
  } catch (error: any) {
    throw new Error(`댓글 등록에 실패했습니다: ${error.message}`);
  }
}

//댓글 수정
export async function patchComment(commentId: number, content: string) {
  try {
    const response = await fetch(`${baseURL}/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("댓글 수정에 실패했습니다");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`댓글 수정에 실패했습니다: ${error.message}`);
  }
}
//댓글 삭제
export async function deleteComment(commentId: number) {
  try {
    const response = await fetch(`${baseURL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("댓글 삭제에 실패했습니다");
    }
  } catch (error: any) {
    throw new Error(`댓글 삭제에 실패했습니다: ${error.message}`);
  }
}

//이미지 등록
export async function postImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${baseURL}/images/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("이미지 업로드에 실패했습니다");
    }

    const data = await response.json();
    return data.url;
  } catch (error: any) {
    throw new Error(`이미지 업로드에 실패했습니다: ${error.message}`);
  }
}
