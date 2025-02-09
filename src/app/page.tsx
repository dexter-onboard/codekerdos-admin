'use client'

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import CoursePage from './course/page';
import SignIn from './Auth/signin/page';

export interface Admin {
  email: string;
  password: string;
  phoneNumber: string;
}

export const Navbar: React.FC<{user: Admin}> = ({ user }: {user: Admin}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button color="inherit" onClick={() => handleNavigation('/course')}>
          Courses
        </Button>
        <Button color="inherit" onClick={() => handleNavigation('/liveclass')}>
          Live Classes
        </Button>
        <IconButton color="inherit">
          <AccountCircle />
          <Typography variant="body1" style={{ marginLeft: 8 }}>
            User Name
          </Typography>
        </IconButton>
        <Button color='inherit' onClick={() => {console.log("logout")}} > Log Out </Button>
      </Toolbar>
    </AppBar>
  );
};

export default function Home() {

  const [user, setUser] = useState<Admin>({email: "", password: "", phoneNumber: ""});

  return (
    <div>
      {user ? <><Navbar user={user} /><CoursePage /></>:  <SignIn/>}
    </div>
  );
}