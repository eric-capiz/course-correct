# Course Correct

## Description

Course Correct is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that connects students with tutors and study groups. The platform facilitates educational collaboration by allowing students to find tutors based on subjects and availability, as well as join or create study groups.

## Features

- **User Authentication**: Secure login and registration system
- **Role-Based Access**: Different interfaces and capabilities for students and tutors
- **Tutor Booking System**: Calendar-based booking system using FullCalendar
- **Study Groups**: Create, join, and manage study groups
- **Responsive Design**: Mobile-first approach ensuring accessibility across all devices

## Tech Stack

### Frontend

- React.js with Next.js
- Material-UI (MUI) for component design
- FullCalendar for scheduling
- Context API for state management
- TypeScript for type safety

### Backend

- Node.js with Express
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## Data Models

### User Model

- Basic Info: name, username, email, password
- Role: student/tutor
- Academic Info: subjects, gradeLevel
- Relationships: tutoringAvailability, joinedStudyGroups

### Tutor Model

- Tutor reference (User model)
- Subject availability
- Schedule: day, startTime, endTime
- Duration and grade level specifications

### StudyGroup Model

- Group details: name, description
- Creator and participants (User references)
- Academic info: subject
- Schedule: date, time, duration

### TutorBooking Model

- Student and tutor references
- Booking details: subject, duration
- Schedule: bookingTime
- Status tracking

## Key Features Implementation

### Tutor Availability System

- 15-minute increment time slots
- No overlapping sessions
- Subject-specific availability

### Booking System

- Subject-first booking approach
- Filtered tutor availability
- Sequential booking validation
- FullCalendar integration

## Future Features

1. Study Materials Platform

   - Tutor-uploaded study guides
   - Student note sharing
   - Resource management

2. Career Development Extension
   - Professional workshops
   - Practical skill training
   - Industry mentorship opportunities

## Installation

[Installation instructions to be added]

## Usage

[Usage instructions to be added]

## Contributing

[Contribution guidelines to be added]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
