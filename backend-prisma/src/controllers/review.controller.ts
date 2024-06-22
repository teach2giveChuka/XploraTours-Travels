import { ReviewService } from "../services/review.service";
import { Review } from "../interfaces/review";
import { Request, Response } from "express";

let rservice = new ReviewService()

export class reviewController {
    
        async createReview(req: Request, res: Response) {
            try {
                let review: Review = req.body
    
                let response = await rservice.createReview(review)
    
                return res.status(201).json(response)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }

        async viewAllReviews(req: Request, res: Response) {
            try {
                let response = await rservice.viewAllReviews()
                return res.status(200).json(response)
                console.log(response)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }

        async deleteReview(req: Request, res: Response) {
            try {
                let reviewId: string = req.params.id
                let response = await rservice.deleteReview(reviewId)
                return res.status(200).json(response)
                console.log(response)
                console.log(reviewId)
                console.log(req.params)
                console.log(req.body)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }

        async updateReview(req: Request, res: Response) {
            try {
                let reviewId: string = req.params.id
                let review: Review = req.body
                let response = await rservice.updateReview(reviewId, review)
                return res.status(200).json(response)   
                console.log(response)
                console.log(reviewId)
            }
            catch(error){
                console.log(error)
                return {
                    message: "An unexpected error occurred :(",
                    responseCode: 500
                }
            }
        }

        //this is the function to get all reviews for a specific tour
        async viewTourReviews(req: Request, res: Response) {
            try {
                let tourId: string = req.params.id
                let response = await rservice.viewTourReviews(tourId)
                return res.status(200).json(response)
                console.log(response)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }

        //this is the function to get all reviews for a specific user
        async viewUserReviews(req: Request, res: Response) {
            try {
                let userId: string = req.params.id
                let response = await rservice.viewUserReviews(userId)
                return res.status(200).json(response)
                console.log(response)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }
        

}