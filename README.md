# course-correct

## Description

Course Correct is a platform that allows students to find tutors and study groups for their courses.

User Model
The User Model stores essential information about each user in the app:

name, username, email, password: Basic user details.
role: Specifies whether the user is a student or tutor.
subjects: List of subjects the user is associated with.
gradeLevel: User's academic grade (freshman, sophomore, junior, senior).
tutoringAvailability: References to available times for tutors and only for tutors.
joinedStudyGroups: References to study groups the user has joined.

Tutor Model
The Tutor Model stores information about tutors and their availability:

tutor: References to the User model.
subject: Subject the tutor is available to teach.
day: Day of the week the tutor is available.
gradeLevel: Grade level the tutor is available to tutor.
startTime: Start time of the tutor's availability.
endTime: End time of the tutor's availability.
duration: Duration of the tutor's availability.

StudyGroup Model
The StudyGroup Model stores information about study groups:

name: Name of the study group.
description: Description of the study group.
creator: References to the User model.
participants: References to the User model of other students in the study group.
subject: Subject of the study group.
date: Date of the study group.
time: Time of the study group.
duration: Duration of the study group.

TutorBooking Model (will use fullcalendar for the calendar on frontend)
The TutorBooking Model stores information about tutor bookings:

student: References to the User model.
tutor: References to the User model.
subject: Subject of the booking.
duration: Duration of the booking.
bookingTime: Time of the booking.
status: Status of the booking.

frontend notes:
Tutors will set their availability by selecting a day, start & end time, and subject. If they add multiple subjects on the same day, the next subject must start at or after the previous one ends (no overlapping).
Time selection for tutors and students should be in 15-minute increments (:00, :15, :30, :45).
Students will begin booking by selecting a subject, then a start time filtered by tutor availability.
Only tutors available for that subject at the selected time will be shown.
If students book multiple subjects, each subject’s start time must be at or after the previous subject’s end time.
FullCalendar should handle availability display and prevent invalid selections (like overlapping times).
