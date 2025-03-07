"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import { useTutorAvailability } from "@/context/tutorAvailability/tutorAvailabilityContext";

const ITEMS_PER_PAGE = 9;

const TutorAvailabilityCards = () => {
  const { availability, loading, getAllTutorsAvailability } =
    useTutorAvailability();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllTutorsAvailability();
  }, [getAllTutorsAvailability]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Calculate pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSlots = availability.slice(startIndex, endIndex);
  const totalPages = Math.ceil(availability.length / ITEMS_PER_PAGE);

  if (loading) {
    return <Typography>Loading available sessions...</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {currentSlots.map((slot) => (
          <Grid item xs={12} sm={6} md={4} key={slot._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {slot.tutor.name}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {slot.subject}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {new Date(slot.day).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {new Date(slot.startTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  {" - "}
                  {new Date(slot.endTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--button-primary-hover)",
                    },
                  }}
                >
                  Book Session
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default TutorAvailabilityCards;
