import { 
    Box, 
    TextField, 
    IconButton 
} from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

  
const SearchField = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === '') {
        const response = await fetch(`/api/products/`);
        if (response.ok) {
          const data = await response.json();
          if (data.products) {
            onSearch(data.products);
          } else {
            console.error('Response data does not contain "results".', data);
          }
        } else {
          console.error('Error fetching products: ', response.status);
        }
      } else {
        const response = await fetch(`/api/products/search/?search=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data, "data")
          onSearch(data);
        } else {
          console.error('Error searching products: ', response.status);
        }
      }
    } catch (error) {
      console.error('Error searching products: ', error);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
        <TextField
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
            startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
            ),
            }}
            style={{ width: '300px', marginBottom: '20px'}}
        />
    </Box>
  )
}

export default SearchField