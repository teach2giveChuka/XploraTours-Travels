import { bookingService } from "../services/booking.service";
import { Booking } from "@prisma/client";
import { Request, Response } from "express";

let bservice = new bookingService()

export class bookingController {

    async createBooking(req: Request, res: Response) {
        try {
            let booking: Booking = req.body
            let response = await bservice.createBooking(booking)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    async viewAllBookings(req: Request, res: Response) {
        try {
            let response = await bservice.viewAllBookings()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            });

        }
    }

    async deleteBooking(req: Request, res: Response) {
        try {
            let bookingId: string = req.params.id
            let response = await bservice.cancelBooking(bookingId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            });

        }
    }

    async updateBooking(req: Request, res: Response) {
        try {
            let bookingId: string = req.params.id
            let booking: Booking = req.body
            let response = await bservice.updateBooking(bookingId, booking)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            });

        }
    }

    async viewUserBookings(req: Request, res: Response) {
        try {
            let userId: string = req.params.id
            let response = await bservice.viewUserBookings(userId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            }); 
        }
    
    
    }

    async viewTourBooking(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await bservice.viewTourBookings(tourId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            }); 
        }
    }

    async viewBookingsCount (req: Request, res: Response) {
        try {
            let response = await bservice.viewBookingsCount()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            }); 
        }
    }

    //total ammount for tour from service
    async totalAmountForTour(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await bservice.totalAmountForTour(tourId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            }); 
        }
    }

    //total ammount spent by user all round
    async totalAmountSpentByUser(req: Request, res: Response) {
        try {
            let userId: string = req.params.id
            let response = await bservice.totalAmountSpentByUser(userId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            }); 
        }
    }

    //total ammount earned by the company
    
    async totalAmountCollectively(req: Request, res: Response) {
        try {
            let response = await bservice.totalAmountCollectively()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error"
            }); 
        }
    }


}