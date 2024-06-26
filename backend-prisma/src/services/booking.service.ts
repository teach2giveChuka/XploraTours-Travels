import { PrismaClient } from "@prisma/client";
import { Booking } from "@prisma/client";
import { v4 } from "uuid";

export class bookingService{
    prisma = new PrismaClient({
        log:['error']
    }); 

    async createBooking(booking: Booking) {
        try {
            // Step 1: Check for existing booking
            const existingBooking = await this.prisma.booking.findFirst({
                where: {
                    userId: booking.userId,
                    tourId: booking.tourId,
                },
            });
    
            if (existingBooking) {
                
                return {
                    message: "You have already made a booking for this tour.",
                    responseCode: 400, 
                };
            }

            await this.prisma.booking.create({
                data: {
                    id: v4(),
                    userId: booking.userId,
                    tourId: booking.tourId,
                    createdAt: new Date(),
                    numberOfPeople: booking.numberOfPeople,
                },
            });
    
           
            return {
                message: "Booking created successfully :)",
                responseCode: 200,
            };
        } catch (error) {
            console.error("Error creating booking:", error);
            return {
                message: "Tour or Usser No found :(",
                responseCode: 404,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }


    async cancelBooking(bookingId: string) {
        try {
            const booking = await this.prisma.booking.delete({
                where: {
                    id: bookingId
                }
            });
            return {
                message: "Booking cancelled successfully :)",
                responseCode: 200
            };
        } catch (error) {
            console.error("Error cancelling booking:", error);
            return {
                message: "Booking not found :(",
                responseCode: 404,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    
    async viewAllBookings() {
        try {
            const bookings = await this.prisma.booking.findMany({
                include: {
                    user: {
                        select: {
                            firstname: true,
                            email: true,
                            // Include any other user fields you need
                        }
                    },
                    tour: {
                        select: {
                            destination: true,
                            tourType: true,
                            price: true,
                            isActive: true,
                        }
                    }
                }
            });
            return bookings.map(booking => ({
                ...booking,
                userName: booking.user?.firstname,
                userEmail: booking.user?.email,
                destination: booking.tour?.destination,
                tourType: booking.tour?.tourType,
                pricing: booking.tour?.price,
                tourStatus: booking.tour?.isActive ? "Active" : "Inactive",
                //to remove the objects if not useful for frotnend                
                user: undefined,
                tour: undefined
            }));
        } catch (error) {
            console.error("Error viewing bookings:", error);
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    
    async updateBooking(bookingId: string, booking: Booking) {
        try {
            const updatedBooking = await this.prisma.booking.update({
                where: {
                    id: bookingId
                },
                data: {
                    userId: booking.userId,
                    tourId: booking.tourId,
                    createdAt: booking.createdAt,
                    numberOfPeople: booking.numberOfPeople
                }
            });
            return {
                message: "Booking updated successfully :)",
                responseCode: 200,
                booking: updatedBooking
            };
        } catch (error) {
            console.error("Error updating booking:", error);
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    
    async viewBookingDetails(bookingId: string) {
        try {
            const booking = await this.prisma.booking.findUnique({
                where: {
                    id: bookingId
                }
            });
            return booking;
        } catch (error) {
            console.error("Error viewing booking details:", error);
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    async viewUserBookings(userId: string) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    userId: userId
                },
                include: {
                    user: {
                        select: {
                            firstname: true,
                            email: true,
                            // Include any other user fields you need
                        }
                    },
                    tour: {
                        select: {
                            destination: true,
                            tourType: true,
                            price: true,
                            isActive: true,
                            // Include any other tour fields you need
                        }
                    }
                }
            });
    
            return bookings.map(booking => ({
                ...booking,
                userName: booking.user?.firstname,
                userEmail: booking.user?.email,
                destination: booking.tour?.destination,
                tourType: booking.tour?.tourType,
                pricing: booking.tour?.price,
                tourStatus: booking.tour?.isActive ? "Active" : "Inactive",
                // Remove the nested objects if not useful for frontend
                user: undefined,
                tour: undefined
            }));
    
        } catch (error) {
            console.error("Error viewing user bookings:", error);
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }
    

    async viewTourBookings(tourId: string) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    tourId: tourId
                }
            });
            return bookings;
        } catch (error) {
            console.error("Error viewing tour bookings:", error);
            return {
                message: "An unexpected error occurred :(",
                
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    //bookings count
    async viewBookingsCount() {
        try {
            const bookings = await this.prisma.booking.count();
            return bookings;
        } catch (error) {
            console.error("Error viewing bookings count:", error);
            return {
                message: "An unexpected error occurred :(",

                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    //total ammount earned per organized tour 
    async totalAmountForTour(tourId: string) {
        try {
            
            const tour = await this.prisma.tour.findUnique({
                where: {
                    id: tourId,
                },
            });
    
            if (!tour) {
                return {
                    message: "Tour not found",
                    responseCode: 404,
                };
            }
    
            
            const aggregation = await this.prisma.booking.aggregate({
                _sum: {
                    numberOfPeople: true,
                },
                where: {
                    tourId: tourId,
                },
            });
    
            const totalAmount = (aggregation._sum.numberOfPeople ?? 0) * tour.price;
    
            return {
                totalAmount: totalAmount,
            };
        } catch (error) {
            console.error("Error calculating total amount for tour:", error);
            return {
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }


    async totalAmountSpentByUser(userId: string) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    tour: true, // Include tour to access the price
                },
            });
            const totalAmount = bookings.reduce((acc, booking) => acc + (booking.numberOfPeople * booking.tour.price), 0);
            return {
                totalAmount,
            };
        } catch (error) {
            console.error("Error calculating total amount spent by user:", error);
            return {
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }


    async totalAmountCollectively() {
        try {
            const bookings = await this.prisma.booking.findMany({
                include: {
                    tour: true, // Include tour to access the price
                },
            });
            const totalAmount = bookings.reduce((acc, booking) => acc + (booking.numberOfPeople * booking.tour.price), 0);
            return {
                totalAmount,
            };
        } catch (error) {
            console.error("Error calculating total amount collectively:", error);
            return {
                message: "An unexpected error occurred :(",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
}