import React, { useState } from 'react'
import { Button, Stack } from '@mui/material'
import { Link } from "react-router-dom"


const NavbarLoginLogout = () => {
    const [ isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <Stack>
        {
            isAuthenticated ? (
                <Button color='inherit'>Logout</Button> 
            ) : (
                <Button color='inherit' component={Link} to="/login">Login</Button>
            )
        }
    </Stack>
  )
}

export default NavbarLoginLogout