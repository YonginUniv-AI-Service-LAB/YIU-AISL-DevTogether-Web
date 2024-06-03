import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from "react-responsive";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from './Searchbar.module.css'

const Searchbar = ({ defaultSearchText, onSearch }) => {
     // 반응형 화면
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        const searchTextValue = event.target.value;
        setSearchText(searchTextValue);
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
            style={{ width: !isMobile ? '300px': '250px', paddingTop: !isMobile ? '20px':'10px', paddingBottom: !isMobile ? '20px':'10px', fontWeight: 800 }}
            className={style.body}
            ref={inputRef}
            size="large"
            placeholder={defaultSearchText} // placeholder를 defaultSearchText로 변경
            prefix={<SearchOutlined style={{ marginRight: "20px" }} />}
            suffix={searchText !== defaultSearchText && searchText !== "" && <div className={style.clearButton} onClick={() => setSearchText("")}>X</div>}
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
    );
};

export default Searchbar;
