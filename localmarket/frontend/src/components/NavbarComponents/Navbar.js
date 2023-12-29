import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Drawer, Box} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import NavbarLoginLogout from "./NavbarLoginLogout";
import Hidden from "@mui/material/Hidden";



const Navbar = () => {
  const [isDrawerOpenset, setIsDrawerOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    handleIsStaff()
  }, []);

  const handleIsStaff = async () => {
    try {
      const response = await fetch('/api/is_staff/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsStaff(data.is_staff);
        console.log(data.is_staff, "is staff")
      } else {
        console.error('IsStaff error:', response.statusText);
      }
    } catch (error) {
      console.error('IsStaff error:', error);
    }
  };
  
  
  return (
    <>
      <AppBar position="static"color="success">
        <Toolbar>
          <IconButton size="large" edge='start' color="inherit" aria-label="logo">
            <LocalFloristIcon/>
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            <Link
              to="/"
              style={{
                textDecoration: 'none', 
                color: 'inherit',
              }}
            >
              Local Market
            </Link>
          </Typography>
          <Hidden mdDown >
          <Stack direction='row' spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/orders">
              Orders
            </Button>
            {isStaff ? (<Button color="inherit" component={Link} to="/delivery">
              Delivery
            </Button>) : ( null )}
            
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
            <NavbarLoginLogout />
          </Stack>
          </Hidden>
          <Hidden mdUp >
          <IconButton 
              size='large' 
              edge='start' 
              color='inherit' 
              aria-label='logo' 
              onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon/>
          </IconButton>
          <Drawer anchor='left'
                  open={isDrawerOpenset}
                  onClose={()=>setIsDrawerOpen(false)} 
          >
            <Box p={2} width="250px" textAlign="center" role='presentation'>
            <Stack direction='column' spacing={{ xs: 1, sm: 2, md: 4 }}>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" component={Link} to="/orders">
                Orders
              </Button>
              <Button color="inherit" component={Link} to="/delivery">
                Delivery
              </Button>
              <Button color="inherit" component={Link} to="/cart">
                Cart
              </Button>
            <NavbarLoginLogout />
          </Stack>
            </Box>
          </Drawer>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Navbar
