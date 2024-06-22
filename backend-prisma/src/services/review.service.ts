import { PrismaClient } from "@prisma/client";
import { Review } from "../interfaces/review";
import { v4 } from "uuid";

export class ReviewService {
    prisma = new PrismaClient({
        log: ['error']
    });

    async createReview(review: Review) {
        try {
            await this.prisma.review.create({
                data: {
                    id: v4(),
                    userId: review.userId,
                    tourId: review.tourId,
                    createdAt: new Date(),
                    rating: review.rating,
                    content: review.content
                }
            });

            return {
                message: "Review created successfully :)",
                responseCode: 200
            };
        } catch (error) {
            console.error("Error creating review:", error);
            return {
                message: "Review already exists :)",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    async viewAllReviews() {
        const reviews = await this.prisma.review.findMany();
        return reviews;
    }

    async deleteReview(reviewId: string) {
        try {
            const review = await this.prisma.review.delete({
                where: {
                    id: reviewId
                }
            });
            return {
                message: "Review deleted successfully :)",
                responseCode: 200
            };
        } catch (error) {
            console.error("Error deleting review:", error);
            return {
                message: "Review not existent in database :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }

    //update review
    async updateReview(reviewId: string, review: Review) {
        try {
            await this.prisma.review.update({
                where: {
                    id: reviewId
                },
                data: {
                    userId: review.userId,
                    tourId: review.tourId,
                    createdAt: new Date(),
                    rating: review.rating,
                    content: review.content
                }
            });

            return {
                message: "Review updated successfully :)",
                responseCode: 200
            };
        } catch (error) {
            console.error("Error updating review:", error);
            return {
                message: "An unexpected error occurred :(",
                responseCode: 500,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }


    async viewTourReviews(tourId: string) {
        try {
            const reviews = await this.prisma.review.findMany({
                where: {
                    tourId: tourId
                }
            });
            return reviews;
        } catch (error) {
            console.log("tour nto found for review");
            return{
                message: "Tour not found",
                error: error instanceof Error ? error.message : "Unknown error"
            }
        }
    }


    async viewUserReviews(userId: string) {
       try {
        const reviews = await this.prisma.review.findMany({
            where: {
                userId: userId
            }
        });
        return reviews;
    
       } catch (error) {
        return {
            message: "User not found",
            error: error instanceof Error ? error.message : "Unknown error"

        }
       }

}
}