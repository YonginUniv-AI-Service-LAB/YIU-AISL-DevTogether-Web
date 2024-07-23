import React, { useState } from 'react';
import style from './Post.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { posterScrapState } from '../../../recoil/atoms/scrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaEye } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { Dropdown, Menu, message } from 'antd';
import ReportModal from '../../Modal/ReportModal'; // 경로 맞게 설정
import AltImage from '../../../assets/images/devtogether_logo.png';

const ProfileDetail = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    category: { value: null },
    contents: { value: '' },
  });

  const scraped = useRecoilValue(posterScrapState());
  const setScraped = useSetRecoilState(posterScrapState());

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState(0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleScrap = () => {
    setScraped(!scraped);
  };

  const handleShare = () => {
    const currentPageURL = window.location.href;
    navigator.clipboard.writeText(currentPageURL);
    message.success('현재 페이지 링크를 복사했습니다.');
  };

  const handleCategoryChange = (value) => {
    setForm((prevState) => ({
      ...prevState,
      category: { value },
    }));
  };

  const handleContentsChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      contents: { value: e.target.value },
    }));
  };

  const handleOk = () => {
    if (form.category.value == null || (form.category.value === 0 && form.contents.value.trim() === '')) {
      message.error('신고 사유를 선택하거나 입력해주세요');
    } else {
      // 신고 처리 로직
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsModalOpen(true)} style={{ borderBottom: 'none' }}>
        신고
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={style.head}>
        <div>{post.title}</div>
        <div className={style.bookmark}>
          {scraped && <FaBookmark style={{ color: '#68568E' }} />}
        </div>
      </div>
      <div className={style.information}>
        <div className={style.horizon}>
          <div className={`${style.circle} ${style.circleImage}`}>
            <img src={post.userImage} alt="유저이미지" />
          </div>
          <div>
            <div className={style.writer}>{post.nickname}</div>
            <div className={style.introduction}>{post.introduction}</div>
          </div>
        </div>
        <div>
          <div className={style.horizon}>
            <div className={style.more}>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                <IoMdMore style={{ cursor: 'pointer' }} />
              </Dropdown>
              <div className={style.date}>작성일 : {post.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.line}></div>
      <div className={style.text}>
        <div>{post.contents}</div>
        <img
          className={style.contnentsimage}
          src={AltImage}
          alt="게시물 이미지"
          style={{ marginTop: '25px' }}
        />
      </div>
      <div className={`${style.horizon} ${style.record}`}>
        <FaEye style={{ color: 'gray' }} /> <span style={{ marginLeft: '10px' }}>{views}</span>
        <span style={{ opacity: '0.3', marginLeft: '10px' }}> | </span>
        <FaHeart style={{ marginLeft: '10px', color: 'gray' }} />
        <span style={{ marginLeft: '10px' }}>{likes}</span>
        <span style={{ opacity: '0.3', marginLeft: '10px' }}> | </span>
        <FaCommentAlt style={{ marginLeft: '10px', color: 'gray' }} />{' '}
        <span style={{ marginLeft: '10px' }}>{comments}</span>
      </div>
      <div className={style.reaction}>
        <div className={style.like} onClick={toggleLike}>
          {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}{' '}
          <span style={{ marginLeft: '5px', marginRight: '5px', color: liked ? 'red' : 'gray' }}>
            좋아요
          </span>
        </div>
        <span style={{ opacity: '0.3' }}> | </span>
        <div className={style.scrap} onClick={toggleScrap}>
          {scraped ? <FaBookmark style={{ color: '#68568E' }} /> : <FaRegBookmark />}{' '}
          <span style={{ marginLeft: '5px', marginRight: '5px', color: scraped ? '#68568E' : 'gray' }}>
            스크랩
          </span>
        </div>
        <span style={{ opacity: '0.3' }}> | </span>
        <div className={style.share} onClick={handleShare}>
          <CiShare1 />{' '}
          <span style={{ marginLeft: '5px', marginRight: '5px' }}>공유하기</span>
        </div>
      </div>

      {/* ReportModal 컴포넌트 추가 */}
      <ReportModal
        isModalOpen={isModalOpen}
        form={form}
        onCategoryChange={handleCategoryChange}
        onContentsChange={handleContentsChange}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ProfileDetail;
