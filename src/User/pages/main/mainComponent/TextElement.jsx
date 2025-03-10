import React from 'react';

const TextElement = ({ text, tag }) => {
  const Tag = tag || 'h1';  // Default to h1 if no tag is provided

  return <Tag>{text}</Tag>;
};

export default TextElement;
