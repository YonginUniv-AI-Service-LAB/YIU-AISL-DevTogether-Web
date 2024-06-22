import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Tabs, List, Typography, Skeleton, Card, Avatar, Badge, Button } from "antd";
import { data_push } from "../../assets/data/push"; // 알림 데이터
import FilterButton from "../../components/Button/FilterButton";
import style from "./UserInfo.module.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Push = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [notifications, setNotifications] = useState(data_push);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // 알림 수를 초기화
    setUnreadCount(notifications.filter(notification => !notification.read).length);
  }, [notifications]);

  const handleNotificationClick = (notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );
    setSelectedNotification(notification);
    // 알림 수 업데이트
    setUnreadCount(notifications.filter(notification => !notification.read).length - 1);
  };

  const getGenderLabel = (gender) => {
    return gender === 0 ? "남자" : "여자";
  };

  const renderNotificationContent = (notification) => {
    switch (notification.category) {
      case "과외 신청":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
                <Avatar
                  src={notification.userImage}
                  size="large"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/profile/${notification.nickname}`)}
                />
                <div style={{ marginLeft: '10px' }}>
                  <Text strong>{notification.nickname}</Text>
                  <br />
                  <Text type="secondary">{notification.name} | {getGenderLabel(notification.gender)} | {notification.age}세</Text>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p><strong>과목:</strong> {notification.subject}</p>
                <p><strong>지역:</strong> {notification.location}</p>
                <p><strong>과외 방식:</strong> {notification.method}</p>
                <p><strong>과외비:</strong> {notification.fee}</p>
                <p><strong>과외일정:</strong> {notification.schedule}</p>
                <p><strong>추가 요구 사항:</strong> {notification.additionalRequest}</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <FilterButton name={'수락'} onClick={() => console.log('수락 클릭')}/>
              <FilterButton  name={'거절'} onClick={() => console.log('거절 클릭')}/>
            </div>
          </div>
        );
      case "과외 수락":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.nickname}님이 과외를 수락하셨습니다.</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <FilterButton name={'나의 멘티 관리'} onClick={() => navigate('/mypage/mentee')}/>
            </div>
          </div>
        );
      case "과외 거절":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.nickname}님이 과외를 거절하셨습니다.</p>
              </div>
            </div>
          </div>
        );
      case "쪽지":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.nickname}님께서 새로운 쪽지를 보냈습니다.</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <FilterButton name={'쪽지함'} onClick={() => navigate(`/message/${notification.id}`)}/>
            </div>
          </div>
        );
      case "게시글 좋아요":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.nickname}님이 '{notification.contents}' 글을 좋아합니다.</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <FilterButton name={'게시글 이동'} onClick={() => navigate(`/post/${notification.id}`)}/>
            </div>
          </div>
        );
      case "댓글":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.nickname}님이 '{notification.contents}' 글에 새로운 댓글을 남겼습니다.</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <FilterButton name={'게시글 이동'} onClick={() => navigate(`/post/${notification.id}`)}/>
            </div>
          </div>
        );
      case "댓글 좋아요":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.nickname}님이 '{notification.contents}'의 댓글을 좋아합니다.</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <FilterButton name={'게시글 이동'} onClick={() => navigate(`/post/${notification.id}`)}/>
            </div>
          </div>
        );
      case "문의":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight:'10px' }}>
                <Title level={3}>{notification.title}</Title>
                <Text type="secondary">{notification.createdAt}</Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <p>{notification.contents}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getBorderColor = (item) => {
    return selectedNotification && selectedNotification.id === item.id ? '#A499BB' : '#d9d9d9';
  };

  const getBackgroundColor = (item) => {
    return selectedNotification && selectedNotification.id === item.id ? '#f0f0f0' : 'transparent';
  };

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>알림 내역</div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {selectedNotification && (
          <Card style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '15px', marginBottom: '20px', height:'600px' }}>
            {renderNotificationContent(selectedNotification)}
          </Card>
        )}
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="과외" key="1">
            <List
              itemLayout="horizontal"
              dataSource={notifications.filter(item =>
                item.category === "과외 신청" ||
                item.category === "과외 수락" ||
                item.category === "과외 거절"
              )}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: '12px 0',
                    backgroundColor: getBackgroundColor(item),
                    borderLeft: `10px solid ${getBorderColor(item)}`,
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    minWidth: '300px'
                  }}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.title}</Text>
                          {!item.read && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.nickname}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="쪽지" key="2">
            <List
              itemLayout="horizontal"
              dataSource={notifications.filter(item => item.category === "쪽지")}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: '12px 0',
                    backgroundColor: getBackgroundColor(item),
                    borderLeft: `10px solid ${getBorderColor(item)}`,
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    minWidth: '300px'
                  }}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.title}</Text>
                          {!item.read && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.nickname}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="게시글" key="3">
            <List
              itemLayout="horizontal"
              dataSource={notifications.filter(item => item.category === "게시글 좋아요")}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: '12px 0',
                    backgroundColor: getBackgroundColor(item),
                    borderLeft: `10px solid ${getBorderColor(item)}`,
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    minWidth: '300px'
                  }}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.title}</Text>
                          {!item.read && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.nickname}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="댓글" key="4">
            <List
              itemLayout="horizontal"
              dataSource={notifications.filter(item =>
                item.category === "댓글" ||
                item.category === "댓글 좋아요"
              )}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: '12px 0',
                    backgroundColor: getBackgroundColor(item),
                    borderLeft: `10px solid ${getBorderColor(item)}`,
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    minWidth: '300px'
                  }}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.title}</Text>
                          {!item.read && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.nickname}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="문의" key="5">
            <List
              itemLayout="horizontal"
              dataSource={notifications.filter(item => item.category === "문의")}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: '12px 0',
                    backgroundColor: getBackgroundColor(item),
                    borderLeft: `10px solid ${getBorderColor(item)}`,
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    minWidth: '300px'
                  }}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.title}</Text>
                          {!item.read && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.nickname}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Push;
