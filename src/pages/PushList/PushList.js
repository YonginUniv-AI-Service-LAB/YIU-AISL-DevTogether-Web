import React, { useState } from "react";
import { Layout, Menu, List, Skeleton } from "antd";
import { data_push } from "../../assets/data/push"; // 알림 데이터

const { Content, Sider } = Layout;

const PushListPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <Layout style={{ minHeight: "100vh", marginLeft:'15%', marginRight:'15%' }}>
      <Sider width={300} style={{ background: "#fff" }}>
        <Menu mode="vertical">
          <Menu.Item key="header" style={{ fontWeight: "bold", fontSize: "16px" }}>
            알림 목록
          </Menu.Item>
          <List
            itemLayout="horizontal"
            dataSource={data_push}
            renderItem={(item) => (
              <List.Item onClick={() => handleNotificationClick(item)} style={{ cursor: "pointer" }}>
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    title={item.title}
                    description={item.createdAt}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px', background: '#fff' }}>
          {selectedNotification ? (
            <div>
              <h1>{selectedNotification.title}</h1>
              <p>{selectedNotification.createdAt}</p>
              <div>{selectedNotification.contents}</div>
            </div>
          ) : (
            <div>알림을 선택하세요.</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PushListPage;
