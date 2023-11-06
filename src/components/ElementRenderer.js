import React from 'react';

const ElementRenderer = ({ element }) => {
  if (!element) {
    return null;
  }

  const { type, props, children } = element;

  if (type === 'img') {
    // If the element is an 'img' tag, render it as an image
    return <img {...props} />;
  }

  const childElements = (children || []).map((child, index) => (
    <ElementRenderer key={index} element={child} />
  ));

  return React.createElement(type, props, childElements);
};

export default ElementRenderer;
