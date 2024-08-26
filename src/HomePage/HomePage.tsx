import React, { useEffect, useState } from "react";
import "./HomePage.css";
import "../reset.css";
import logo from "../images/logo.png";
import hotItem from "../images/hot-item.png";
import search from "../images/search.png";
import register from "../images/register.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import instagram from "../images/instagram.png";
import youtube from "../images/youtube.png";
import { Link } from "react-router-dom";
import Header from "../headers/Header";

const HomePage = () => {

  return (
    <div className="homepage-container">
      <Header />
      <div className="banner">
        <div className="homepage-wrapper">
          <h2>
            일상의 모든 물건을 <br />
            거래해 보세요
          </h2>
          <Link to="/header" className="items">
            구경하러 가기
          </Link>
        </div>
      </div>

      <div className="section_container">
        <section className="homepage-section">
          <img className="section_image" src={hotItem} alt="hot item" />
          <div className="feature">
            <span className="homepage-span">Hot item</span>
            <h2>
              인기상품을 <br />
              확인해보세요
            </h2>
            <p className="homepage-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해보세요
            </p>
          </div>
        </section>

        <section className="section_reverse">
          <img className="section_image" src={search} alt="search" />
          <div className="feature-reverse">
            <span className="homepage-span">Search</span>
            <h2>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <p className="homepage-description">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </section>

        <section className="homepage-section">
          <img className="section_image" src={register} alt="register" />
          <div className="feature">
            <span className="homepage-span">Register</span>
            <h2>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <p className="homepage-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </section>
      </div>

      <div className="bottom-banner">
        <div className="homepage-wrapper">
          <h2>
            믿을 수 있는 <br />
            판다마켓 중고거래
          </h2>
        </div>
      </div>

      <footer>
        <div className="codeit">©codeit - 2024</div>
        <div className="PF">
          <Link to="/" id="Privacy">
            Privacy Policy
          </Link>
          <Link to="/" id="FAQ">
            FAQ
          </Link>
        </div>
        <div className="icon-wrapper">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              className="icon_width"
              alt="페이스북"
              width="20"
              height="20"
            />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={twitter}
              className="icon_width"
              alt="트위터"
              width="20"
              height="20"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={youtube}
              className="icon_width"
              alt="유튜브"
              width="20"
              height="20"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              className="icon_width"
              alt="인스타그램"
              width="20"
              height="20"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
