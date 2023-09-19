import { 
    Box, 
    TextField, 
    IconButton 
} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

  
  const SearchField = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <TextField
              variant="outlined"
              placeholder="Search"
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