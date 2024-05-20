import React, { useState } from 'react';
import { Select, Tag } from 'antd';

const  NavigateSelect = (props) => {
  const { value, options, placeholder, onChange, maxTags } = props;
  const [selectedTags, setSelectedTags] = useState(value || []);

  const handleSelectChange = (newValue) => {
    if (!maxTags || selectedTags.length < maxTags || newValue.length < selectedTags.length) {
      setSelectedTags(newValue);
      onChange(newValue);
    }
  };

  const handleTagClose = (removedTag) => {
    const newTags = selectedTags.filter(tag => tag !== removedTag);
    setSelectedTags(newTags);
    onChange(newTags);
  };

  const renderTags = () => {
    return selectedTags.map((tag, index) => (
      <Tag key={index} closable onClose={() => handleTagClose(tag)}>
        {tag}
      </Tag>
    ));
  };

  return (
    <Select
      placeholder={placeholder}
      value={selectedTags}
      onChange={handleSelectChange}
      style={{ minWidth: '100px', marginTop:'20px', marginRight:'10px'}}
      tagRender={({ label, closable, onClose }) => (
        <Tag closable={closable} onClose={onClose}>
          {label}
        </Tag>
      )}
    >
      {options.map((opt, index) => (
        <Select.Option key={index} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default NavigateSelect;