import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Tabs, List, Typography, Skeleton, Card, Avatar, Modal, Button, Badge } from "antd";
import { data_push } from "../../assets/data/push"; // 알림 데이터
import FilterButton from "../../components/Button/FilterButton";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Push = () => {

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [notifications, setNotifications] = useState(data_push);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );
    setSelectedNotification(notification);
  };

  const getGenderLabel = (gender) => {
    return gender === 0 ? "남자" : "여자";
  };

  const showAcceptModal = () => {
    setIsAcceptModalVisible(true);
  };

  const handleAcceptOk = () => {
    // 매칭 성공 처리 로직 추가
    setIsAcceptModalVisible(false);
  };

  const handleAcceptCancel = () => {
    setIsAcceptModalVisible(false);
  };

  const showRejectModal = () => {
    setIsRejectModalVisible(true);
  };

  const handleRejectOk = () => {
    // 매칭 취소 처리 로직 추가
    setIsRejectModalVisible(false);
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false);
  };

  const renderNotificationContent = (notification) => {
    switch (notification.category) {
      case "과외 신청":
        return (
          <>
            <Title level={3}>{notification.title}</Title>
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
              <p><strong>과목:</strong> {notification.contents.match(/과목: (.*)/)[1]}</p>
              <p><strong>지역:</strong> {notification.contents.match(/지역: (.*)/)[1]}</p>
              <p><strong>과외 방식:</strong> {notification.contents.match(/과외 방식: (.*)/)[1]}</p>
              <p><strong>과외비:</strong> {notification.contents.match(/과외비: (.*)/)[1]}</p>
              <p><strong>과외일정:</strong> {notification.contents.match(/과외일정: (.*)/)[1]}</p>
              <p><strong>추가 요구 사항:</strong> {notification.contents.match(/추가 요구 사항: (.*)/)[1]}</p>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <Text type="secondary">{notification.createdAt}</Text>
            </div>
          </>
        );
      case "쪽지":
        return (
          <>
            <Title level={3}>{notification.title}</Title>
            <div style={{ marginTop: '20px' }}>
              <p>{notification.nickname}께서 새로운 쪽지를 보냈습니다.</p>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <Text type="secondary">{notification.createdAt}</Text>
            </div>
          </>
        );
      case "댓글":
        const match = notification.contents.match(/글 제목: (.*)/);
        return (
          <>
            <Title level={3}>{notification.title}</Title>
            <div style={{ marginTop: '20px' }}>
              <p>{match ? `${match[1]} 게시글에 새로운 댓글이 달렸습니다.` : '새로운 댓글이 달렸습니다.'}</p>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <Text type="secondary">{notification.createdAt}</Text>
            </div>
          </>
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
    <div style={{  marginLeft: !isMobile ? '30px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>알림 내역</div>
      </div>
      <div style={{ display: 'flex', flexDirection: !isMobile ? 'row': 'column',  marginTop: '20px' }}>
        <div style={{ flex: 2,  background: '#fff', marginBottom:'30px' }}>
          {selectedNotification ? (
            <div>
              <Card style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '15px' }}>
                {renderNotificationContent(selectedNotification)}
              </Card>
              {selectedNotification.category === "과외 신청" && (
                <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }}>
                  <FilterButton name="수락" onClick={showAcceptModal} />
                  <FilterButton name="거절" onClick={showRejectModal} />
                </div>
              )}
              {selectedNotification.category === "댓글" && (
                <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }}>
                  <FilterButton name="게시글 가기" onClick={() => navigate(`/post/${selectedNotification.postId}`)} />
                </div>
              )}
              {selectedNotification.category === "쪽지" && (
                <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }}>
                  <FilterButton name="쪽지 이동하기" onClick={() => navigate(`/message/${selectedNotification.messageId}`)} />
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <Title level={4}>알림을 선택하세요.</Title>
            </div>
          )}
        </div>

        <div style={{ flex:'1', marginLeft:'10px' }}>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="과외 신청" key="1">
              <List
                itemLayout="horizontal"
                dataSource={notifications.filter(item => item.category === "과외 신청")}
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
                      marginBottom : '5px'
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
                      marginBottom : '5px'
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
            <TabPane tab="댓글" key="3">
              <List
                itemLayout="horizontal"
                dataSource={notifications.filter(item => item.category === "댓글")}
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
                      marginBottom : '5px'
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
      <Modal
        title="과외 수락"
        visible={isAcceptModalVisible}
        onOk={handleAcceptOk}
        onCancel={handleAcceptCancel}
        okText="수락"
        cancelText="취소"
      >
        <p>정말 과외를 수락하시겠습니까?</p>
      </Modal>

      <Modal
        title="과외 거절"
        visible={isRejectModalVisible}
        onOk={handleRejectOk}
        onCancel={handleRejectCancel}
        okText="거절"
        cancelText="취소"
      >
        <p>정말 과외를 거절하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default Push;
