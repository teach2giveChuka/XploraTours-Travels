import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";
//import auth token

let bconctroller = new bookingController()
let booking_router = Router();

booking_router.post('/create-booking', bconctroller.createBooking);
booking_router.get('/view-all-bookings', bconctroller.viewAllBookings);
booking_router.delete('/delete-booking/:id', bconctroller.deleteBooking);
booking_router.put('/update-booking/:id', bconctroller.updateBooking);
booking_router.get('/view-user-booking/:id', bconctroller.viewUserBookings);
booking_router.get('/view-tour-booking/:id', bconctroller.viewTourBooking);
booking_router.get('/bookingsCount', bconctroller.viewBookingsCount);
booking_router.get('/totalAmmountPerTour/:id', bconctroller.totalAmountForTour);
booking_router.get('/totalSpentByUser/:id', bconctroller.totalAmountSpentByUser);
booking_router.get('/totalAmountCollectively', bconctroller.totalAmountCollectively);

export default booking_router;

