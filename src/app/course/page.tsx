
export interface CourseDoc  {title: string; link: string};

export interface CourseVideo  {title: string; link: string};

export interface CourseModule {title: string; description: string}

export interface Course  {

    title: string;
    
    description: string;
    
    courseVideos: CourseVideo[];
    
    courseDocs: CourseDoc[];
    
    technologies: string[];
    
    modules: CourseModule[]

}


import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

const CourseForm: React.FC<{ onSubmit: (course: Course) => void }> = ({ onSubmit }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(course);
  };

  return (
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

  return (
    <div>
      <CourseForm onSubmit={handleAddCourse} />
      <CourseList courses={courses} />
    </div>
  );
};

export default CoursePage;