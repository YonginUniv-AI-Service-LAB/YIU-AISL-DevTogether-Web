import React from 'react';
import { Button, Dropdown, Space,  Menu } from 'antd';
const menu = (
    <Menu>
        
            <Menu.Item key="edit" style={{ borderBottom: "none" }}>
                수정
            </Menu.Item>
       
            <Menu.Item key="delete" style={{ borderBottom: "none" }}>
                삭제
            </Menu.Item>
 
            <Menu.Item key="report" style={{ borderBottom: "none" }}>
                신고
            </Menu.Item>
    </Menu>
);


const MenuDropdown = () => {
    return (
        <Dropdown
        overlay={menu} trigger={['click']} placement="bottom" arrow
      >
        <Button>bottom</Button>
      </Dropdown>
    );
};

export default MenuDropdown;