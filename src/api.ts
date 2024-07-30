interface ReviewsParams {
  currentPage?: number;
  pageSize: number;
  orderBy: string;
}
const baseURL = "https://panda-market-api.vercel.app";
const productURL = `${baseURL}/products`;
const authURL = `${baseURL}/auth`;

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
    throw new Error("상품을 찾을 수 없습니다");
  }
  const body = await response.json();
  return body;
}

export async function postSignup(formData: any) {
  try {
    const response = await fetch(`${authURL}/signUp}`, {
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
    const response = await fetch(`${authURL}/signIn}`, {
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
