import { PrismaClient } from "@prisma/client";
import { Tour } from "../interfaces/tour";
import { v4 } from "uuid";

export class tourService{
    prisma = new PrismaClient({
        log:['error']
    });

    async createTour(tour: Tour) {
        try {
            await this.prisma.tour.create({
                data: {
                    id: v4(),
                    destination: tour.destination,
                    price: tour.price,
                    tourType: tour.tourType,
                    createdAt: new Date(),
                    startDate: tour.startDate,
                    endDate: tour.endDate,
                    isActive: tour.isActive,
                    description: tour.description || "No description provided"                }
            });
    
            return {
                message: "Tour created successfully :)",
                responseCode: 200
            };
        } catch (error) {
            console.error("Error creating tour:", error); 
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error" 
            };
        }
    }

   
    async viewAllTours() {
        const tours = await this.prisma.tour.findMany();
        return tours;
    }

    
    async deleteTour(tourId: string) {
        try {
            const tour = await this.prisma.tour.delete({
                where: {
                    id: tourId
                }
            });
            return {
                message: "Tour deleted successfully :)",
                responseCode: 200,
                tour: tour
            };
        } catch (error) {
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500
            };
        }
    }

    
    async updateTour(tourId: string, tour: Tour) {
        try {
            const updatedTour = await this.prisma.tour.update({
                where: {
                    id: tourId
                },
                data: {
                    destination: tour.destination,
                    price: tour.price,
                    tourType: tour.tourType,
                    startDate: tour.startDate,
                    endDate: tour.endDate,
                    isActive: tour.isActive
                }
            });
            return {
                message: "Tour updated successfully :)",
                responseCode: 200,
                tour: updatedTour
            }
        } catch (error) {
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500
            };
        }
    }

   
    async getTour(tourId: string) {
        const tour = await this.prisma.tour.findUnique({
            where: {
                id: tourId
            }
        });
        return tour;
    }

    async getTourByDestination(destination: string) {
        const tour = await this.prisma.tour.findMany({
            where: {
                destination: destination
            }
        });
        return tour;
    }

   
    async activateTour(tourId: string) {
        try {
            const updatedTour = await this.prisma.tour.update({
                where: {
                    id: tourId
                },
                data: {
                    isActive: true
                }
            });
            return {
                message: "Tour activated successfully :)",
                responseCode: 200,
                tour: updatedTour
            }
        } catch (error) {
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500
            };
        }
    }

   
    async deactivateTour(tourId: string) {
        try {
            const updatedTour = await this.prisma.tour.update({
                where: {
                    id: tourId
                },
                data: {
                    isActive: false
                }
            });
            return {
                message: "Tour deactivated successfully :)",
                responseCode: 200,
                tour: updatedTour
            }
        } catch (error) {
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500
            };
        }
    }

    
    async searchTour(destination: string) {
        const tour = await this.prisma.tour.findMany({
            where: {
                destination: {
                    contains: destination
                }
            }
        });
        return tour;
    }

   
   

    
    async getActiveTours() {
        try {
            const tour = await this.prisma.tour.findMany({
                where: {
                    isActive: true
                }
            });
            return tour;
    }
    catch (error) {
        console.log(error)
        return error;
    }
    }

    
    async getInactiveTours() {
        try{
            const tour = await this.prisma.tour.findMany({
                where: {
                    isActive: false
                }
            });
            return tour;
        }
        catch (error) {
            console.log(error)
            return error;
        }
    }

    //is active?  returns a boolean whether the isActive field is 1 or 0 if 1 return true, if 0, return false
    async isActive(tourId: string) {
        try{
            const isactive = await this.prisma.tour.findUnique({
                where: {
                    id: tourId,
                    isActive: true
                }
            });
            if(isactive){
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.error("Error checking if tour is active:", error); 
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error" 
            };
        }
    }
}