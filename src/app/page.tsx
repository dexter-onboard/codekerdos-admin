'use client'

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';
import CoursePage from './course/page';
import SignIn from './signin/page';
import { AdminResponse } from './signup/page';

export const Navbar: React.FC<{ user: AdminResponse }> = ({ user }) => {
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
            {user.admin.email}
          </Typography>
        </IconButton>
        <Button color="inherit" onClick={() => { console.log("logout") }}> Log Out </Button>
      </Toolbar>
    </AppBar>
  );
};

export default function Home() {
  const [user, setUser] = useState<AdminResponse>({ token: '', admin: { email: '', phoneNumber: '', "_id": '', "__v": 0, isSuperAdmin: false } });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/Auth/signin');
    }
  }, [router]);

  return (
    <div>
      {user.admin.email ? (
        <>
          <Navbar user={user} />
          <CoursePage />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}