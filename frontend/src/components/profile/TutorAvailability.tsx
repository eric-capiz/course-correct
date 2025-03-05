"use client";

import { Typography, Box, Card, CardContent } from "@mui/material";

const TutorAvailability = ({ user }) => {
  if (user?.role !== "tutor") return null;

  return (
    <Box sx={{ mb: { xs: 4, md: 12 } }}>
      <Typography variant="h5" fontWeight={700} mt={6} mb={2} id="availability">
        Your Availability
      </Typography>
      <Card>
        <CardContent>
          <Typography>Weekly availability will be displayed here.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TutorAvailability;
