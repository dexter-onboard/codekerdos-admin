'use client'
export interface Recording  {title: string; link: string};

export interface Assignment  {title: string; link: string};

export interface LiveClass  {
    
    title: string;
    
    description: string;
    
    link: string;
    
    date: Date;
    
    duration: number;
    
    teacher: string;
    
    course: string;
    
    recordingLinks: Recording[];
    
    assignments: Assignment[];
}


import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { AdminResponse } from '../Auth/signup/page';

const LiveClassForm: React.FC<{ onSubmit: (liveClass: LiveClass) => void }> = ({ onSubmit }) => {

      const [user, setUser] = useState<AdminResponse | null>(null);
  

   useEffect(() => {
          const user: AdminResponse | null = JSON.parse(localStorage.getItem('user') || '');
  
          if (!user) {
              window.location.href = '/login';
          }
  
          setUser(user);
  
  
      }, [])

  const [liveClass, setLiveClass] = useState<LiveClass>({
    title: '',
    description: '',
    link: '',
    date: new Date(),
    duration: 0,
    teacher: '',
    course: '',
    recordingLinks: [],
    assignments: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLiveClass({ ...liveClass, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(liveClass);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Create Live Class</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            value={liveClass.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            value={liveClass.description}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="link"
            label="Link"
            value={liveClass.link}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="date"
            label="Date"
            type="date"
            value={liveClass.date.toISOString().split('T')[0]}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="duration"
            label="Duration"
            type="number"
            value={liveClass.duration}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="teacher"
            label="Teacher"
            value={liveClass.teacher}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="course"
            label="Course"
            value={liveClass.course}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Add more fields for recordingLinks and assignments as needed */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};


const LiveClassList: React.FC<{ liveClasses: LiveClass[] }> = ({ liveClasses }) => {
  return (
    <div>
      <Typography variant="h6">Live Classes</Typography>
      <List>
        {liveClasses.map((liveClass, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={liveClass.title}
              secondary={liveClass.description}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const LiveClassPage: React.FC = () => {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);

  const handleAddLiveClass = (liveClass: LiveClass) => {
    setLiveClasses([...liveClasses, liveClass]);
  };

  return (
    <div>
      <LiveClassForm onSubmit={handleAddLiveClass} />
      <LiveClassList liveClasses={liveClasses} />
    </div>
  );
};

export default LiveClassPage;