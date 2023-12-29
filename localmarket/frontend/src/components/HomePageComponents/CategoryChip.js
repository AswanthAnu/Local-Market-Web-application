import React, { useState } from 'react';
import { Chip, IconButton, useMediaQuery, ThemeProvider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme } from '@mui/material/styles'; 

const CategoryChip = ({ items, setCurrentCategory, onSearch, }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const theme = createTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const visibleItems = isXs ? 2 : (isMd ? 2 : 10); // Display 10 items at a time
  const chipWidth = 150; // Set a fixed width for the chips

  const handleScroll = (scrollOffset) => {
    const newStartIndex = Math.min(
      Math.max(0, startIndex + scrollOffset),
      items.length - visibleItems
    );
    setStartIndex(newStartIndex);
  };

  const handleClick = async (index) => {
    try {
      const response = await fetch(`/api/products/category/${items[startIndex + index]}/?page=${currentPage}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onSearch(data);
      
    } catch (error) {
      console.error('Error searching categories: ', error);
    }
    console.log(`Clicked on ${items[startIndex + index]}`);
    setCurrentCategory(items[startIndex + index])
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '200px', overflowY: 'auto' }}>
      {items.slice(startIndex, startIndex + visibleItems).map((item, index) => (
        <Chip
          key={index}
          label={item}
          style={{
            margin: '4px 0',
            cursor: 'pointer',
            display: 'block',
            textAlign: 'center',
            width: chipWidth,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: 0,
          }}
          variant="outlined"
          onClick={() => handleClick(index)}
        />
      ))}
      {items.length > visibleItems && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton onClick={() => handleScroll(-1)} disabled={startIndex === 0}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => handleScroll(1)}
            disabled={startIndex >= items.length - visibleItems}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default CategoryChip;
