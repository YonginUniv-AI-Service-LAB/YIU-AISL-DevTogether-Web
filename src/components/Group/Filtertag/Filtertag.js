import React from 'react';
import { Divider, Flex, Tag } from 'antd';
import style from './Filtertag.module.css';

const FilterTag = ({ selectedSubjects, selectedLocations, selectedGenders, selectedAges, selectedMethods, selectedFees }) => {
  // 필터에 대한 색상 배열을 정의합니다.
  const colors = {
    subjects: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
    locations: ['volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'red'],
    genders: ['blue', 'volcano'],
    methods: ['cyan', 'green', 'gold', 'magenta', 'orange', 'purple', 'red', 'volcano'],
    fees: ['gold', 'magenta', 'cyan', 'blue']
  };

  return (
    <div className={style.background}>
      <div className={style.head}>필터 적용 상황</div>
      <Divider orientation="left">과목</Divider>
      <Flex gap="4px 0" wrap="wrap">
        {/* Render selected subjects as tags with corresponding colors */}
        {selectedSubjects.map((subject, index) => (
          <Tag key={subject} color={colors.subjects[index]}>{subject}</Tag>
        ))}
      </Flex>
      <Divider orientation="left">지역</Divider>
      <Flex gap="4px 0" wrap="wrap">
        {/* Render selected locations as tags with corresponding colors */}
        {selectedLocations.map((location, index) => (
          <Tag key={location} color={colors.locations[index]}>{location}</Tag>
        ))}
      </Flex>
      <Divider orientation="left">성별</Divider>
      <Flex gap="4px 0" wrap="wrap">
        {/* Render selected genders as tags with corresponding colors */}
        {selectedGenders.map((gender, index) => (
          <Tag key={gender} color={colors.genders[index]}>{gender}</Tag>
        ))}
      </Flex>
      <Divider orientation="left">나이</Divider>
      <Flex gap="4px 0" wrap="wrap">
        {/* Render selected ages as tags */}
        {(selectedAges.min !== undefined && selectedAges.max !== undefined) &&
          <Tag color="green">{selectedAges.min}세 ~ {selectedAges.max}세</Tag>
        }
      </Flex>
      <Divider orientation="left">과외방식</Divider>
      <Flex gap="4px 0" wrap="wrap">
        {/* Render selected methods as tags with corresponding colors */}
        {selectedMethods.map((method, index) => (
          <Tag key={method} color={colors.methods[index]}>{method}</Tag>
        ))}
      </Flex>
      <Divider orientation="left">수업료</Divider>
      <Flex gap="4px 0" wrap="wrap">
        {/* Render selected fees as tags with corresponding colors */}
        {selectedFees.map((fee, index) => (
          <Tag key={fee} color={colors.fees[index]}>{fee}</Tag>
        ))}
      </Flex>
    </div>
  );
};

export default FilterTag;
