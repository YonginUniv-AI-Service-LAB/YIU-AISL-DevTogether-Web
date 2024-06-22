import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";
import React from "react";

const NoticeSearchInput = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {},
        },
        token: {},
      }}
    >
      <Input
        style={{ width: "50%" }}
        size="large"
        placeholder="검색어 입력"
        variant="filled"
        prefix={<SearchOutlined />}
      />
    </ConfigProvider>
  );
};
export default NoticeSearchInput;
