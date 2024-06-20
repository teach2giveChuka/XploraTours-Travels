import { Request, Response } from "express";
import { Tour } from "../interfaces/tour";
import { tourService } from "../services/tour.service";

let tservice = new tourService()

export class tourController {


    async createTour(req: Request, res: Response) {
        try {
            let tour: Tour = req.body

            let response = await tservice.createTour(tour)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }


    async viewAllTours(req: Request, res: Response) {
        try {
            let response = await tservice.viewAllTours()
            return res.status(200).json(response)
            console.log(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    async deleteTour(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await tservice.deleteTour(tourId)
            return res.status(200).json(response)
            console.log(response)
            console.log(tourId)
            console.log(req.params)
            console.log(req.body)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }


    async updateTour(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let tour: Tour = req.body
            let response = await tservice.updateTour(tourId, tour)
            return res.status(200).json(response)   
            console.log(response)
            console.log(tourId)
        }
        catch(error){
            console.log(error)
            return {
                message: "An unexpected error occurred :(",
            }
        }

    }


    async getTour(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await tservice.getTour(tourId)
            return res.status(200).json(response)
            console.log(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }   

    async getTourByDestination(req: Request, res: Response) {
        try {
            let destination: string = req.params.destination
            let response = await tservice.getTourByDestination(destination)
            return res.status(200).json(response)
            console.log(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }


    async activateTour(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await tservice.activateTour(tourId)
            return res.status(200).json(response)
            console.log(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    async deactivateTour(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await tservice.deactivateTour(tourId)
            return res.status(200).json(response)
            console.log(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

async getActiveTours(req: Request, res: Response) {
    try {
        let response = await tservice.getActiveTours()
        return res.status(200).json(response)
        console.log(response)
        console.log(req.body)}
        catch (error) {
            return res.status(500).json({ error })
        }
    }

    
    async getInactiveTours(req: Request, res: Response) {
        try {
            let response = await tservice.getInactiveTours()
            return res.status(200).json(response)
            console.log(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    async isActive(req: Request, res: Response) {
        try {
            let tourId: string = req.params.id
            let response = await tservice.isActive(tourId)
            return res.status(200).json(response)
            console.log(response)
            console.log(tourId)
        }
        catch (error) {
            return res.status(500).json({ error })
        }
    }
}