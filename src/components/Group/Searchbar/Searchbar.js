import React, { useState, useEffect, useRef } from 'react';
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from './Searchbar.module.css'

const Searchbar = ({ defaultSearchText, onSearch }) => {
    const [searchText, setSearchText] = useState(defaultSearchText);
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        const searchTextValue = event.target.value;
        setSearchText(searchTextValue);
    };

    const handleInputClick = () => {
        if (searchText === defaultSearchText) {
            setSearchText("");
        }
    };

    useEffect(() => {
        if (searchText === defaultSearchText || searchText === "") {
            // 검색어가 defaultSearchText일 때 모든 프로필을 보여줌
            onSearch("");
        }
    }, [searchText, onSearch, defaultSearchText]);

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
            placeholder={defaultSearchText} // placeholder를 defaultSearchText로 변경
            prefix={<SearchOutlined style={{ marginRight: "20px" }} />}
            suffix={searchText !== defaultSearchText && searchText !== "" && <div className={style.clearButton} onClick={() => setSearchText("")}>X</div>}
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyPress={handleKeyPress}
        />
    );
};

export default Searchbar;
