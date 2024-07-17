import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Tabs, List, Typography, Skeleton, Card, Badge, Avatar, Pagination, message } from "antd";
import axios from "axios";
import FilterButton from "../../components/Button/FilterButton";
import style from "./UserInfo.module.css";
import AltImage from "../../assets/images/devtogether_logo.png";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Push = ({ notifications, onNotificationClick }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchingData, setMatchingData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [actionMessage, setActionMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();
  const userId = parseInt(sessionStorage.getItem('user_profile_id'), 10); // 세션 스토리지에서 user_profile_id 가져오기
  const role = parseInt(sessionStorage.getItem('role'), 10); // 세션 스토리지에서 role 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (role === 2) { // 멘토
          response = await axios.get('/mentor', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else if (role === 1) { // 멘티
          response = await axios.get('/mentee', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        }
        console.log("Fetched user data:", response.data); // 가져온 데이터 콘솔에 출력
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const handleNotificationClick = async (notification) => {
    try {
      const requestData = new URLSearchParams({ id: notification.pushId });
      console.log("PUT request data:", requestData.toString()); // PUT 요청 데이터 콘솔에 출력

      // 알림을 읽음 상태로 변경
      await axios.put('/user/push', requestData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      onNotificationClick(notification);

      setSelectedNotification(notification);
      setActionMessage(null); // 새로운 알림을 선택할 때 액션 메시지 초기화

      // 매칭 데이터 가져오기
      if (notification.type === "매칭") {
        let matchingResponse;
        if (role === 2) { // 멘토
          matchingResponse = await axios.get(`/user/matching/mentor`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else if (role === 1) { // 멘티
          matchingResponse = await axios.get(`/user/matching/mentee`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        }
        console.log("Fetched matching data:", matchingResponse.data); // 가져온 매칭 데이터 콘솔에 출력
        setMatchingData(matchingResponse.data);
      } else {
        setMatchingData([]);
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleAcceptClick = async () => {
    try {
      // `selectedNotification.contents`에서 이름 추출
      const notificationName = selectedNotification.contents.split("님")[0];
  
      // `userData`에서 이름이 같은 사용자 찾기
      const matchedUser = userData.find(user => user.name === notificationName);
  
      if (!matchedUser) {
        console.error("No matching user found.");
        return;
      }
  
      // 매칭 테이블에서 `matchedUser.userProfileId`와 일치하는 매칭 데이터 찾기
      const matchedData = matchingData.find(match => match.mentor === matchedUser.userProfileId || match.mentee === matchedUser.userProfileId);
  
      if (!matchedData) {
        console.error("No matching data found for acceptance.");
        return;
      }
  
      const requestData = new URLSearchParams({ matchingId: matchedData.matchingId });
      console.log("PUT request data for accept:", requestData.toString()); // PUT 요청 데이터 콘솔에 출력
  
      // 신청 수락 API 호출
      await axios.put('/matching/application', requestData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      console.log('Application accepted');
      message.success('과외를 수락했습니다.');
      setActionMessage('과외를 수락했습니다.');
    } catch (error) {
      console.error("Failed to accept application:", error);
      message.error('과외 수락에 실패했습니다.');
    }
  };

  const handleRejectClick = async () => {
    try {
      // `selectedNotification.contents`에서 이름 추출
      const notificationName = selectedNotification.contents.split("님")[0];
  
      // `userData`에서 이름이 같은 사용자 찾기
      const matchedUser = userData.find(user => user.name === notificationName);
  
      if (!matchedUser) {
        console.error("No matching user found.");
        return;
      }
  
      // 매칭 테이블에서 `matchedUser.userProfileId`와 일치하는 매칭 데이터 찾기
      const matchedData = matchingData.find(match => match.mentor === matchedUser.userProfileId || match.mentee === matchedUser.userProfileId);
  
      if (!matchedData) {
        console.error("No matching data found for rejection.");
        return;
      }
  
      const requestData = new URLSearchParams({ matchingId: matchedData.matchingId });
      console.log("PUT request data for reject:", requestData.toString()); // PUT 요청 데이터 콘솔에 출력
  
      // 신청 거절 API 호출
      await axios.put('/matching/refusal', requestData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      console.log('Application rejected');
      message.success('과외를 거절했습니다.');
      setActionMessage('과외를 거절했습니다.');
    } catch (error) {
      console.error("Failed to reject application:", error);
      message.error('과외 거절에 실패했습니다.');
    }
  };

  const handleConfirmClick = async () => {
    try {
      // `selectedNotification.contents`에서 이름 추출
      const notificationName = selectedNotification.contents.split("님")[0];
  
      // `userData`에서 이름이 같은 사용자 찾기
      const matchedUser = userData.find(user => user.name === notificationName);
  
      if (!matchedUser) {
        console.error("No matching user found.");
        return;
      }
  
      // 매칭 테이블에서 `matchedUser.userProfileId`와 일치하는 매칭 데이터 찾기
      const matchedData = matchingData.find(match => match.mentor === matchedUser.userProfileId || match.mentee === matchedUser.userProfileId);
  
      if (!matchedData) {
        console.error("No matching data found for confirmation.");
        return;
      }
  
      const requestData = new URLSearchParams({ matchingId: matchedData.matchingId });
      console.log("POST request data for confirm:", requestData.toString()); // POST 요청 데이터 콘솔에 출력
  
      // 매칭 확정 API 호출
      await axios.post('/matching/confirmation', requestData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      console.log('Matching confirmed');
      message.success('과외가 확정되었습니다.');
      setActionMessage('과외가 확정되었습니다.');
    } catch (error) {
      console.error("Failed to confirm matching:", error);
      message.error('과외 확정에 실패했습니다.');
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toISOString().split('T')[0];
  };

  const renderNotificationContent = (notification) => {
    const notificationName = notification.contents.split("님")[0];
    const matchedUser = userData.find(user => user.name === notificationName);
    const matchedData = matchingData.find(match => match.mentor === matchedUser?.userProfileId || match.mentee === matchedUser?.userProfileId);
    const user = userData.find(user => user.userProfileId === (role === 2 ? matchedData?.mentor : matchedData?.mentee));

    if (!matchedUser || !matchedData || !user) {
      return <div>일치하는 데이터를 찾을 수 없습니다.</div>;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '10px', marginBottom:'15px' }}>
            <Title level={3}>{getTitleByContent(notification.contents)}</Title>
            <Text type="secondary">{formatDate(notification.createdAt)}</Text>
          </div>
          <div>{notificationName}님이 과외를 {notification.contents.includes("신청") ? "신청" : notification.contents.includes("수락") ? "수락" : "거절"}했습니다.</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
            <Avatar src={user.profileImage || AltImage} size="large" />
            <div style={{ marginLeft: '10px' }}>
              <Text strong>{user.nickname}</Text>
              <br />
              <Text type="secondary">{user.name} | {user.gender === "남" ? "남자" : "여자"} | {user.age}세</Text>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <p><strong>과목:</strong> {[matchedData.subject1, matchedData.subject2, matchedData.subject3, matchedData.subject4, matchedData.subject5].filter(Boolean).join(", ")}</p>
            <p><strong>지역:</strong> {[matchedData.location1, matchedData.location2, matchedData.location3].filter(Boolean).join(", ")}</p>
            <p><strong>과외 방식:</strong> {matchedData.method}</p>
            <p><strong>과외비:</strong> {matchedData.tutoringFee}원</p>
            <p><strong>과외 일정:</strong> {matchedData.schedule}</p>
            <p><strong>추가 요구 사항:</strong> {matchedData.contents}</p>
          </div>
        </div>
      </div>
    );
  };

  const getBorderColor = (item) => {
    console.log("Item:", item);
    console.log("Selected Notification:", selectedNotification);
    return selectedNotification && selectedNotification.pushId === item.pushId ? '#A499BB' : '#d9d9d9';
  };

  const getBackgroundColor = (item) => {
    return selectedNotification && selectedNotification.pushId === item.pushId ? '#f0f0f0' : 'transparent';
  };

  const getTitleByContent = (content) => {
    if (content.includes("과외를 신청했습니다")) return "과외 신청";
    if (content.includes("과외를 수락했습니다")) return "과외 수락";
    if (content.includes("과외를 거절했습니다")) return "과외 거절";
    return content;
  };

  const sortedNotifications = notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) return <Skeleton active />;
  if (error) return <div>알림을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>알림 내역</div>
    </div>
    <div style={{ marginTop: '20px' }}>
      {selectedNotification && (
        <div style={{ paddingBottom: '50px' }}>
          <Card style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '15px', marginBottom: '40px', height: '600px' }}>
            {renderNotificationContent(selectedNotification)}
          </Card>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            {selectedNotification.contents.includes("신청") && !actionMessage && (
              <div style={{display:'flex'}}>
                <FilterButton name={'수락'} onClick={handleAcceptClick} />
                <FilterButton name={'거절'} onClick={handleRejectClick} />
              </div>
            )}
            {selectedNotification.contents.includes("수락") && !actionMessage && (
              <div style={{display:'flex'}}>
                <FilterButton name={'확정'} onClick={handleConfirmClick} />
              </div>
            )}
          </div>
        </div>
      )}
        <Tabs defaultActiveKey="3" type="card">
          <TabPane tab="과외" key="3">
            <List
              itemLayout="horizontal"
              dataSource={sortedNotifications.filter(item => item.type === "매칭")}
              pagination={{
                pageSize,
                current: currentPage,
                onChange: page => setCurrentPage(page),
                style: { display: 'flex', justifyContent: 'center' },
              }}
              renderItem={(item) => {
                const notificationName = item.contents.split("님")[0];
                const matchedUser = userData.find(user => user.name === notificationName);
                const matchedData = matchingData.find(match => match.mentor === matchedUser?.userProfileId || match.mentee === matchedUser?.userProfileId);
                console.log("Notification:", item);
                console.log("Matched User in List:", matchedUser);
                console.log("Matched Data in List:", matchedData);
                return (
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
                            <Text strong>{getTitleByContent(item.contents)}</Text>
                            {item.checks === 1 && <Badge color="#f50" />}
                          </div>
                        }
                        description={
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{matchedUser ? matchedUser.nickname : item.user_id}</span>
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                        }
                      />
                    </Skeleton>
                  </List.Item>
                );
              }}
            />
          </TabPane>
          <TabPane tab="쪽지" key="2">
            <List
              itemLayout="horizontal"
              dataSource={sortedNotifications.filter(item => item.type === "쪽지")}
              pagination={{
                pageSize,
                current: currentPage,
                onChange: page => setCurrentPage(page),
                style: { display: 'flex', justifyContent: 'center' },
              }}
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
                          <Text strong>{item.contents}</Text>
                          {item.checks === 1 && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.user_id}</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="게시글" key="0">
            <List
              itemLayout="horizontal"
              dataSource={sortedNotifications.filter(item => item.type === "게시글")}
              pagination={{
                pageSize,
                current: currentPage,
                onChange: page => setCurrentPage(page),
                style: { display: 'flex', justifyContent: 'center' },
              }}
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
                          <Text strong>{item.contents}</Text>
                          {item.checks === 1 && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.user_id}</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="댓글" key="1">
            <List
              itemLayout="horizontal"
              dataSource={sortedNotifications.filter(item => item.type === "댓글")}
              pagination={{
                pageSize,
                current: currentPage,
                onChange: page => setCurrentPage(page),
                style: { display: 'flex', justifyContent: 'center' },
              }}
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
                          <Text strong>{item.contents}</Text>
                          {item.checks === 1 && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.user_id}</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="문의" key="4">
            <List
              itemLayout="horizontal"
              dataSource={sortedNotifications.filter(item => item.type === "문의")}
              pagination={{
                pageSize,
                current: currentPage,
                onChange: page => setCurrentPage(page),
                style: { display: 'flex', justifyContent: 'center' },
              }}
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
                          <Text strong>{item.contents}</Text>
                          {item.checks === 1 && <Badge color="#f50" />}
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.user_id}</span>
                          <span>{formatDate(item.createdAt)}</span>
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
