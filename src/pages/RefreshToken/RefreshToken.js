import React, { useEffect } from 'react';
import axios from 'axios';

const TokenRefresh = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.post(
          '/token/refresh',
          null,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
              accessToken: sessionStorage.getItem('accessToken'),
              refreshToken: sessionStorage.getItem('refreshToken'),
            },
          }
        );

        const { accessToken, refreshToken } = response.data;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        console.log('Access token refreshed successfully');
        console.log('New access token:', accessToken);
      } catch (error) {
        console.error('Failed to refresh access token:', error);
      }
    };

    const intervalId = setInterval(refreshToken, 15 * 60 * 1000); // 20분마다 실행

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  return null; // UI가 필요 없는 컴포넌트이므로 null 반환
};

export default TokenRefresh;
