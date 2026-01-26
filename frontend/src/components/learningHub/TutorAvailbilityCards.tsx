import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { useTutorAvailability } from "@/context/tutorAvailability/tutorAvailabilityContext";
import { bookTutor } from "@/services/booking/bookingService";
import { useBooking } from "@/context/booking/bookingContext";

interface AvailabilitySlot {
  _id: string;
  tutor: {
    _id: string;
    name: string;
    gradeLevel: string;
  };
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const ITEMS_PER_PAGE = 9;

/** Parse "YYYY-MM-DD" as local date so it doesn't shift to previous day in western timezones */
function formatDayLocal(dayStr: string, options?: Intl.DateTimeFormatOptions): string {
  const parts = dayStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date(dayStr).toLocaleDateString("en-US", options);
  }
  const [y, m, d] = parts;
  const local = new Date(y, m - 1, d);
  return local.toLocaleDateString("en-US", options ?? { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

const TutorAvailabilityCards = () => {
  const { availability, loading, error, getAllTutorsAvailability } =
    useTutorAvailability();
  const { fetchBookings } = useBooking();
  const [page, setPage] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null
  );
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    getAllTutorsAvailability();
  }, [getAllTutorsAvailability]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    // Announce page change to screen readers
    const announcement = `Page ${value} of ${totalPages}`;
    document
      .getElementById("page-change-announcement")
      ?.setAttribute("aria-label", announcement);
  };

  // Newest to oldest by date, then by start time within same day
  const sortedAvailability = [...availability].sort((a, b) => {
    const byDay = b.day.localeCompare(a.day);
    if (byDay !== 0) return byDay;
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSlots = sortedAvailability.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedAvailability.length / ITEMS_PER_PAGE);

  const handleBookClick = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot);
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;

    // Calculate duration in minutes
    const startTime = new Date(selectedSlot.startTime);
    const endTime = new Date(selectedSlot.endTime);
    const durationInMinutes = Math.round(
      (endTime.getTime() - startTime.getTime()) / 60000
    );

    setIsBooking(true);
    try {
      await bookTutor({
        tutor: selectedSlot.tutor._id,
        subject: selectedSlot.subject,
        bookingTime: selectedSlot.startTime,
        availabilityId: selectedSlot._id,
        duration: durationInMinutes,
      });
      await fetchBookings();
      await getAllTutorsAvailability();
      setIsBookingDialogOpen(false);
    } catch (error) {
      console.error("Error booking session:", error);
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <Typography role="status" aria-live="polite">
        Loading available sessions...
      </Typography>
    );
  }

  return (
    <Box component="section" aria-label="Available Tutor Sessions">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!error && availability.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 4 }}>
          No tutor sessions available right now. Check back later or ask a tutor
          to add availability.
        </Typography>
      )}
      {!error && availability.length > 0 && (
        <>
      <div
        id="page-change-announcement"
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
        }}
      />

      <Grid container spacing={3} role="list">
        {currentSlots.map((slot) => (
          <Grid item xs={12} sm={6} md={4} key={slot._id} role="listitem">
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
                <Typography variant="h6" component="h3" gutterBottom>
                  <span aria-label="Tutor name">Tutor: {slot.tutor.name}</span>
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  <span aria-label="Subject">Subject: {slot.subject}</span>
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  <span aria-label="Subject">
                    Grade Level: {slot.tutor.gradeLevel}
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  <span aria-label="Session date">
                    {formatDayLocal(slot.day)}
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  <span aria-label="Session time">
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
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBookClick(slot)}
                  aria-label={`Book session with ${slot.tutor.name} for ${slot.subject}`}
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--button-primary-hover)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid var(--primary-color)",
                      outlineOffset: "2px",
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
            aria-label="Session navigation"
            getItemAriaLabel={(type, page) => {
              if (type === "page") return `Go to page ${page}`;
              return `Go to ${type} page`;
            }}
          />
        </Box>
      )}
        </>
      )}

      <Dialog
        open={isBookingDialogOpen}
        onClose={() => !isBooking && setIsBookingDialogOpen(false)}
        aria-labelledby="booking-dialog-title"
      >
        <DialogTitle id="booking-dialog-title">Confirm Booking</DialogTitle>
        <DialogContent>
          {selectedSlot && (
            <>
              <Typography gutterBottom>
                Tutor: {selectedSlot.tutor.name}
              </Typography>
              <Typography gutterBottom>
                Subject: {selectedSlot.subject}
              </Typography>
              <Typography gutterBottom>
                Grade Level: {selectedSlot.tutor.gradeLevel}
              </Typography>
              <Typography gutterBottom>
                Date: {formatDayLocal(selectedSlot.day, { month: "numeric", day: "numeric", year: "numeric" })}
              </Typography>
              <Typography>
                Time: {new Date(selectedSlot.startTime).toLocaleTimeString()} -{" "}
                {new Date(selectedSlot.endTime).toLocaleTimeString()}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsBookingDialogOpen(false)}
            disabled={isBooking}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            disabled={isBooking}
            variant="contained"
            sx={{
              backgroundColor: "var(--primary-color)",
              "&:hover": {
                backgroundColor: "var(--button-primary-hover)",
              },
            }}
          >
            {isBooking ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TutorAvailabilityCards;
