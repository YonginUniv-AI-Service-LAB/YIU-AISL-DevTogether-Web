import React, { useState, useEffect, useRef } from 'react';
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from './Searchbar.module.css'

const Searchbar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("닉네임으로 검색");
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        const searchTextValue = event.target.value;
        setSearchText(searchTextValue);
    };

    const handleInputClick = () => {
        if (searchText === "닉네임으로 검색") {
            setSearchText("");
        }
    };

    useEffect(() => {
        if (searchText === "닉네임으로 검색" || searchText === "") {
            // 검색어가 "닉네임으로 검색"일 때 모든 프로필을 보여줌
            onSearch("");
        }
    }, [searchText, onSearch]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && searchText !== "") {
            onSearch(searchText);
        }
    };

    return (
        <Input
            style={{ width:"30%",fontWeight: 800 }}
            className={style.body}
            ref={inputRef}
            size="large"
            placeholder="닉네임으로 검색"
            prefix={<SearchOutlined style={{ marginRight: "20px" }} />}
            suffix={searchText !== "닉네임으로 검색" && searchText !== "" && <div className={style.clearButton} onClick={() => setSearchText("")}>X</div>}
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyPress={handleKeyPress}
        />
    );
};

export default Searchbar;
