import React, { useState } from 'react';
import style from './Modal.module.css';
import { AutoComplete } from 'antd';
import { data_location } from '../../../assets/data/location';

const { Option } = AutoComplete;

const LocationModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedLocations, setSelectedLocations] = useState([]); // 선택된 지역을 관리하는 상태
    const [additionalDropdowns, setAdditionalDropdowns] = useState(0); // 추가 드롭다운 박스의 수를 관리하는 상태

    const handleLocationSelect = (value, index) => {
        const updatedLocations = [...selectedLocations];
        updatedLocations[index] = value;
        setSelectedLocations(updatedLocations);
    };

    const removeDropdown = (index) => {
        const updatedLocations = [...selectedLocations];
        updatedLocations.splice(index, 1);
        setSelectedLocations(updatedLocations);
        setAdditionalDropdowns(Math.max(0, additionalDropdowns - 1));
    };

    const handleApplyFilter = () => {
        applyFilter(selectedLocations.filter(location => location));
        closeModal();
    };

    const handleAddDropdown = () => {
        if (additionalDropdowns < 2) {
            setAdditionalDropdowns(additionalDropdowns + 1);
        }
    };

    const resetFilter = () => {
        setSelectedLocations([]);
        setAdditionalDropdowns(0);
        applyFilter([]);
    };

    const handleResetDropdown = () => {
        setSelectedLocations([]);
    };

    const mockOptions = data_location;

    const handleSearch = (value) => {
        const filteredOptions = mockOptions.filter(option => option.includes(value));
        return filteredOptions.map(option => (
            <Option key={option} value={option}>
                {option}
            </Option>
        ));
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={style.flex}>
                <div className={style.text_title}>지역 필터</div>
                <div onClick={closeModal} className={style.close}>x</div>
            </div>
            <div className={style.add} onClick={handleAddDropdown}>필터 추가</div>
            <div className={style.flex}>
                <AutoComplete
                    style={{ width: '100%' }}
                    placeholder="지역 선택"
                    onSelect={(value) => handleLocationSelect(value, 0)}
                    dataSource={handleSearch('')}
                    filterOption={(inputValue, option) =>
                        option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    }
                    value={selectedLocations[0]}
                    onChange={() => handleResetDropdown()}
                />
                {additionalDropdowns > 0 && (
                    <div className={style.remove} onClick={() => removeDropdown(0)}>X</div>
                )}
            </div>
            {Array.from({ length: additionalDropdowns }).map((_, index) => (
                <div className={style.flex} key={index} style={{ marginTop: '10px' }}>
                    <AutoComplete
                        style={{ width: '100%' }}
                        placeholder={`지역 선택 ${index + 2}`}
                        onSelect={(value) => handleLocationSelect(value, index + 1)}
                        dataSource={handleSearch('')}
                        filterOption={(inputValue, option) =>
                            option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                        }
                        value={selectedLocations[index + 1]}
                        onChange={() => handleResetDropdown()}
                    />
                    <div className={style.remove} onClick={() => removeDropdown(index + 1)}>X</div>
                </div>
            ))}
            <div className={style.foot}>
                <div className={style.apply} onClick={handleApplyFilter}>적용</div>
                <div className={style.reset} onClick={resetFilter}>초기화</div>
            </div>
        </div>
    );
};

export default LocationModal;
