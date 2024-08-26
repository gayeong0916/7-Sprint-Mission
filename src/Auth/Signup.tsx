import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import "./Auth.css";
import logo from "../images/logo2X.png";
import google from "../images/google-logo.png";
import kakao from "../images/kakao-logo.png";
import { Link, useNavigate } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import { postSignup } from "../api";

type FieldName="email" | "nickname" | "password" | "passwordConfirmation";

const Signup = () => {
  const navigate = useNavigate();
  const { errors, handleBlur } = useFormValidation();
  const [formValues, setFormValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, nickname, password, passwordConfirmation } = formValues;
    console.log(email, nickname, password, passwordConfirmation);

    try {
      const result = await postSignup(formValues);
      console.log(result);
      navigate("/login", { state: { email, password } });
    } catch (error: any) {
      console.error("회원 생성에 실패했습니다:", error.message);
    }
  };

  useEffect(() => {
    const allFieldsValid = !!(
      Object.values(formValues).every((value) => !!value) &&
      Object.values(errors).every((error) => !error)
    );

    setIsButtonActive(allFieldsValid);
  }, [formValues, errors]);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordConfirm = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-logo">
        <Link to="/">
          <img
            className="login-logo-img"
            src={logo}
            alt="판다마켓"
            width="396"
            height="132"
          />
        </Link>
      </div>

      <form onSubmit={handleSubmit} id="signupForm">
        <div className="email-password">
          <div className="input-system">
            <label htmlFor="email">이메일</label>
            <input
              className={`email-input ${errors.email ? "input-error" : ""}`}
              type="text"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={formValues.email}
              onChange={handleInput}
              onBlur={(e) =>
                handleBlur(e.target.name as FieldName, e.target.value, formValues.password)
              }
            />
            <span className="error-message-on">{errors.email}</span>
          </div>
          <div className="input-system">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              className={`nickname-input ${
                errors.nickname ? "input-error" : ""
              }`}
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              value={formValues.nickname}
              onChange={handleInput}
              onBlur={(e) =>
                handleBlur(e.target.name as FieldName, e.target.value, formValues.password)
              }
            />
            <span className="error-message-on">{errors.nickname}</span>
          </div>
          <div>
            <div className="input-system">
              <label htmlFor="passwordInput">비밀번호</label>
              <input
                type={passwordVisible ? "text" : "password"}
                className={`password-input ${
                  errors.password ? "input-error" : ""
                }`}
                id="passwordInput"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handleInput}
                onBlur={(e) =>
                  handleBlur(e.target.name as FieldName, e.target.value, formValues.password)
                }
              />
              <button
                type="button"
                className={`password-button ${
                  passwordVisible ? "visible" : ""
                }`}
                onClick={togglePassword}
              />
            </div>
            <span className="error-message-on">{errors.password}</span>
          </div>
          <div>
            <div className="input-system">
              <label htmlFor="passwordconfirm">비밀번호 확인</label>
              <input
                type={passwordConfirmVisible ? "text" : "password"}
                className={`password-confirm-input ${
                  errors.passwordConfirmation ? "input-error" : ""
                }`}
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={formValues.passwordConfirmation}
                onChange={handleInput}
                onBlur={(e) =>
                  handleBlur(e.target.name as FieldName, e.target.value, formValues.password)
                }
              />
              <button
                type="button"
                className={`password-confirm-button ${
                  passwordConfirmVisible ? "visible" : ""
                }`}
                onClick={togglePasswordConfirm}
              />
            </div>
            <span className={errors.passwordConfirmation ? "error-message-on" : ""}>
              {errors.passwordConfirmation}
            </span>
          </div>

          <button
            type="submit"
            className={`signup_submit ${
              isButtonActive ? "active" : "inactive"
            }`}
            disabled={!isButtonActive}
          >
            회원가입
          </button>
        </div>
      </form>

      <div className="simple-login">
        <div className="simple-login-text">간편 로그인하기</div>
        <div className="login-icon-wrapper">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="google"
              src={google}
              alt="구글"
              width="42"
              height="42"
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="kakao"
              src={kakao}
              alt="카카오톡"
              width="42"
              height="42"
            />
          </a>
        </div>
      </div>
      <div className="auth-description">
        <span className="auth-description-text">이미 회원이신가요?</span>
        <Link to="/login" className="login-signup">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Signup;
