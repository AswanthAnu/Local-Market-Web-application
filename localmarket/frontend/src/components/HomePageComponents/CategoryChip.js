import React, { useState } from 'react';
import { Chip, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CategoryChip = ({ items, onSearch }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = 4;

  const handleScroll = (scrollOffset) => {
    const newStartIndex = Math.min(
      Math.max(0, startIndex + scrollOffset),
      items.length - visibleItems
    );
    setStartIndex(newStartIndex);
  };

  const handleClick = async (index) => {
    try {
      const response = await fetch(`/api/products/category/${items[startIndex + index]}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onSearch(data);
      console.log('data', data)
    } catch (error) {
      console.error('Error searching categories: ', error);
    }
    console.log(`Clicked on ${items[startIndex + index]}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => handleScroll(-1)} disabled={startIndex === 0}>
          <ChevronLeftIcon />
        </IconButton>
        {items.slice(startIndex, startIndex + visibleItems).map((item, index) => (
          <Chip
            key={index}
            label={item}
            style={{ margin: '0 4px', cursor: 'pointer' }}
            variant="outlined"
            onClick={() => handleClick(index)}
          />
        ))}
        <IconButton
          onClick={() => handleScroll(1)}
          disabled={startIndex >= items.length - visibleItems}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CategoryChip;
