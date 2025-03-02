'use client'

export interface CourseDoc { title: string; link: string };

export interface CourseVideo { title: string; link: string };

export interface CourseModule { title: string; description: string }

export interface Course {

    title: string;

    description: string;

    courseVideos: CourseVideo[];

    courseDocs: CourseDoc[];

    technologies: string[];

    modules: CourseModule[]

}


import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { AdminResponse } from '../signup/page';
import { Navbar } from '../page';

const CourseForm: React.FC<{ onSubmit: (course: Course) => void }> = ({ onSubmit }) => {

    const [user, setUser] = useState<AdminResponse | null>(null);

    const [course, setCourse] = useState<Course>({
        title: '',
        description: '',
        courseVideos: [],
        courseDocs: [],
        technologies: [],
        modules: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit(course);
    };

    useEffect(() => {
        const user: AdminResponse | null = JSON.parse(localStorage.getItem('user') || '');

        if (!user) {
            window.location.href = '/login';
        }

        setUser(user);


    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6">Create Course</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="Title"
                            value={course.title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="description"
                            label="Description"
                            value={course.description}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    {/* Add more fields for courseVideos, courseDocs, technologies, and modules as needed */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

const CourseList: React.FC<{ courses: Course[] }> = ({ courses }) => {
    return (
        <div>
            <Typography variant="h6">Courses</Typography>
            <List>
                {courses.map((course, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={course.title}
                            secondary={course.description}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};


const CoursePage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    const handleAddCourse = (course: Course) => {
        setCourses([...courses, course]);
    };

    const [user, setUser] = useState<AdminResponse | null>(null);
      
    
    useEffect(() => {
            const user: AdminResponse | null = JSON.parse(localStorage.getItem('user') || '');
    
            if (!user) {
                window.location.href = '/login';
            }
    
            setUser(user);
    
    
    }, [])

    return (
        <div>
            <Navbar user={user} />
            <CourseForm onSubmit={handleAddCourse} />
            <CourseList courses={courses} />
        </div>
    );
};

export default CoursePage;