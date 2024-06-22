import React from 'react';
import { Divider, Flex, Tag } from 'antd';
import style from './Filtertag.module.css';

const FilterTag = ({ selectedSubjects, selectedLocations, selectedGenders, selectedMinAges, selectedMaxAges, selectedMethods, selectedMinFees, selectedMaxFees }) => {
  // 필터에 대한 색상 배열을 정의합니다.
  const colors = {
    subjects: ['magenta','orange','lime', 'geekblue', 'purple'],
    locations: ['orange', 'green', 'cyan'],
    genders: ['blue', 'volcano'],
    methods: ['cyan', 'green', 'gold'],
    fees: ['gold', 'magenta', 'cyan', 'blue']
  };

  // 선택된 필터가 없을 때 빈 배열을 반환하는 함수
  const hideIfEmpty = (array) => {
    // 배열이 정의되지 않았거나 null인 경우 빈 배열을 반환
    if (!Array.isArray(array)) return [];
    
    // 그렇지 않은 경우, 배열의 길이가 0이면 빈 배열을 반환하고, 그렇지 않으면 원래 배열을 반환
    return array.length === 0 ? [] : array;
  };

  // 최소값과 최대값을 보여주는 함수
  const displayMinMax = (min, max) => {
    // 최소값과 최대값이 모두 입력된 경우
    if (min.length > 0 && max.length > 0) {
      return `${min}세 ~ ${max}세`;
    }
    // 최소값만 입력된 경우
    else if (min.length > 0) {
      return `${min}세 ~`;
    }
    // 최대값만 입력된 경우
    else if (max.length > 0) {
      return `~ ${max}세`;
    }
    // 모두 입력되지 않은 경우
    else {
      return '';
    }
  };

  // 최소금액과 최대금액을 보여주는 함수
  const displayMinAndMaxFees = (min, max) => {
    // 최소금액과 최대금액이 모두 입력된 경우
    if (min.length > 0 && max.length > 0) {
      return `${min}원 ~ ${max}원`;
    }
    // 최소금액만 입력된 경우
    else if (min.length > 0) {
      return `${min}원 ~`;
    }
    // 최대금액만 입력된 경우
    else if (max.length > 0) {
      return `~ ${max}원`;
    }
    // 모두 입력되지 않은 경우
    else {
      return '';
    }
  };
  
  
  return (
    <div className={style.background} style={{maxWidth:'200px'}}>
      <div className={style.head}>필터 적용 상황</div>
      {/* 과목 필터 태그 */}
      {hideIfEmpty(selectedSubjects).length > 0 && (
        <React.Fragment>
          <Divider  style={{ borderColor: 'rgba(0, 0, 0, 0.85)', borderWidth: '0.5px', opacity: '0.7', marginRight: '20px' }}>과목</Divider>
          <Flex gap="4px 0" wrap="wrap">
            {/* Render selected subjects as tags with corresponding colors */}
            {selectedSubjects.map((subject, index) => (
              <Tag key={subject} color={colors.subjects[index]}>{subject}</Tag>
            ))}
          </Flex>
        </React.Fragment>
      )}

      {/* 지역 필터 태그 */}
      {hideIfEmpty(selectedLocations).length > 0 && (
        <React.Fragment>
          <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.85)', borderWidth: '0.5px', opacity: '0.7'}}>지역</Divider>
          <Flex gap="4px 0" wrap="wrap">
            {/* Render selected locations as tags with corresponding colors */}
            {selectedLocations.map((location, index) => (
              <Tag key={location} color={colors.locations[index]}>{location}</Tag>
            ))}
          </Flex>
        </React.Fragment>
      )}

      {/* 성별 필터 태그 */}
      {hideIfEmpty(selectedGenders).length > 0 && (
        <React.Fragment>
          <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.85)', borderWidth: '1px', opacity: '0.7', marginRight: '20px' }}>성별</Divider>
          <Flex gap="4px 0" wrap="wrap">
            {/* Render selected genders as tags with corresponding colors */}
            {selectedGenders.map((gender, index) => (
              <Tag key={gender} color={colors.genders[index]}>{gender}</Tag>
            ))}
          </Flex>
        </React.Fragment>
      )}

      {/* 나이 필터 태그 */}
      {((selectedMinAges.length > 0 || selectedMaxAges.length > 0)) && (
        <React.Fragment>
          <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.85)', borderWidth: '0.5px', opacity: '0.7', marginRight: '20px' }}>나이</Divider>
          <Flex gap="4px 0" wrap="wrap">
            {/* Render selected ages as tags */}
            <Tag color="green">{displayMinMax(selectedMinAges, selectedMaxAges)}</Tag>
          </Flex>
        </React.Fragment>
      )}
  
      {/* 과외방식 필터 태그 */}
        {hideIfEmpty(selectedMethods).length > 0 && (
          <React.Fragment>
            <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.85)', borderWidth: '0.5px', opacity: '0.7', marginRight: '20px' }}>과외방식</Divider>
            <Flex gap="4px 0" wrap="wrap">
              {/* Render selected methods as tags with corresponding colors */}
              {selectedMethods.map((method, index) => (
                <Tag key={method} color={colors.methods[index]}>
                 {method == 0 ? '대면' : method == 1 ? '비대면' : '블렌딩'}
                </Tag>
              ))}
            </Flex>
          </React.Fragment>
        )}

      {/* 수업료 필터 태그 */}
      {(selectedMinFees.length > 0 || selectedMaxFees.length > 0) && (
        <React.Fragment>
          <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.85)', borderWidth: '0.5px', opacity: '0.7', marginRight: '20px' }}>수업료</Divider>
          <Flex gap="4px 0" wrap="wrap">
            {/* Render selected fees as tags with corresponding colors */}
            <Tag color="gold">{displayMinAndMaxFees(selectedMinFees, selectedMaxFees)}</Tag>
          </Flex>
        </React.Fragment>
      )}
    </div>
  );
};

export default FilterTag;
