import { 
    Box, 
    TextField, 
    IconButton 
} from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

  
  const SearchField = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = async () => {
      
    
      try {
        if (searchQuery.trim() === '') {
          await fetch(`/api/products/`).then((response) => response.json()).then((data) => {
            onSearch(data.results)
          });
        } else {
          await fetch(`/api/products/search/?search=${searchQuery}`).then((response) => response.json()).then((data) => {
            onSearch(data)
          });
        }
    
        const data = await response.json();
        console.log('data', data);
        onSearch(data);
        
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