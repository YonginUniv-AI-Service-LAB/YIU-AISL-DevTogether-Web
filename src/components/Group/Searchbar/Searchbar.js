import React, { useState, useRef, useEffect } from "react";
import style from "./Searchbar.module.css";

const Searchbar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("닉네임으로 검색");
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleInputClick = () => {
        if (searchText === "닉네임으로 검색") {
            setSearchText("");
        }
    };

    const handleClickOutside = (event) => {
        if (!inputRef.current || !inputRef.current.contains(event.target)) {
            setSearchText("닉네임으로 검색");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // 검색어가 "닉네임으로 검색"일 때는 모든 프로필을 보여줍니다.
        if (searchText === "닉네임으로 검색") {
            onSearch(""); // 빈 문자열을 전달하여 모든 프로필을 보여줍니다.
        } else {
            // 검색어가 변경될 때 검색 콜백 함수 호출
            onSearch(searchText);
        }
    }, [searchText, onSearch]);

    return (
        <input
            ref={inputRef}
            className={style.body}
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onClick={handleInputClick}
        />
    );
};

export default Searchbar;
