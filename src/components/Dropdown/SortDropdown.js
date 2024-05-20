import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: '최신순',
    key: '1',
  },
  {
    label: '조회순',
    key: '2',
  },
  {
    label: '추천순',
    key: '3',
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const SortDropdown = () => (
        <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        정렬
        </Dropdown.Button>
);

export default SortDropdown;