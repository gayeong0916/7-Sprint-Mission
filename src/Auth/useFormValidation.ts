import { useState } from "react";

const useValidationForm= () => {
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const validateEmail = (email: string) => {
    let emailError = "";
    if (!email) {
      emailError = "이메일을 입력해주세요.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)
    ) {
      emailError = "잘못된 형식의 이메일입니다.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const validateNickname = (nickname: string) => {
    let nicknameError = "";
    if (!nickname) {
      nicknameError = "닉네임을 입력해주세요";
    }
    setErrors((prevErrors) => ({ ...prevErrors, nickname: nicknameError }));
  };

  const validatePassword = (password: string) => {
    let passwordError = "";
    if (!password) {
      passwordError = "비밀번호를 입력해주세요";
    } else if (password.length < 8) {
      passwordError = "비밀번호를 8자 이상 입력해주세요";
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const validatePasswordConfirm = (
    password: string,
    passwordConfirmation: string
  ) => {
    let passwordConfirmError = "";
    if (!passwordConfirmation) {
      passwordConfirmError = "비밀번호 확인을 입력해주세요.";
    } else if (password !== passwordConfirmation) {
      passwordConfirmError = "비밀번호가 일치하지 않습니다.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordConfirm: passwordConfirmError,
    }));
  };

  type FieldName="email" | "nickname" | "password" | "passwordConfirmation";

  const handleBlur = (name: FieldName, value: string, password:string) => {
    switch (name) {
      case "email":
        validateEmail(value);
        break;
      case "nickname":
        validateNickname(value);
        break;
      case "password":
        validatePassword(value);
        break;
      case "passwordConfirmation":
        validatePasswordConfirm(password, value);
        break;
      default:
        break;
    }
  };
  return {
    errors,
    validateEmail,
    validateNickname,
    validatePassword,
    validatePasswordConfirm,
    handleBlur,
  };
};

export default useValidationForm;
