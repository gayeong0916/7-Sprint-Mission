import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import "./Auth.css";
import logo from "../images/logo2X.png";
import google from "../images/google-logo.png";
import kakao from "../images/kakao-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import { postSignIn } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email: initalEmail="", password: initalPassword="" } = location.state || {};
  const { errors, validateEmail, validatePassword } = useFormValidation();
  const [formValues, setFormValues] = useState({
    email: initalEmail || "",
    password: initalPassword || "",
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlur = (name: string, value: string) => {
    switch (name) {
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isFormValid = Object.values(errors).every((error) => !error);
    if (isFormValid) {
        try{
          const {accessToken,user}=await postSignIn(formValues);
          if(accessToken){
            localStorage.setItem("accessToken", accessToken); 
            localStorage.setItem("userId",user.id);
          navigate("/"); 
          }
        }catch(error:any){
          console.error("로그인에 실패했습니다: ", error.message);
        }
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
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
            <span className="error-message-on">{errors.email}</span>
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
                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
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
          <button
            type="submit"
            className={`signup_submit ${
              isButtonActive ? "active" : "inactive"
            }`}
            disabled={!isButtonActive}
          >
            로그인
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
        <span className="auth-description-text">판다마켓이 처음이신가요?</span>
        <Link to="/signup" className="login-signup">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
