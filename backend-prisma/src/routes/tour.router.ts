import { Router } from "express";
import { tourController } from "../controllers/tour.controller";
//import token auth ver

let tcontroller = new tourController()
let tour_router = Router()

tour_router.post('/create-tour', tcontroller.createTour);
tour_router.get('/view-all-tours', tcontroller.viewAllTours);
tour_router.delete('/delete-tour/:id', tcontroller.deleteTour);
tour_router.put('/update-tour/:id', tcontroller.updateTour);
tour_router.put('/activate-tour/:id', tcontroller.activateTour);
tour_router.put('/deactivate-tour/:id', tcontroller.deactivateTour);
tour_router.get('/view-tour/:id', tcontroller.getTour);
tour_router.get('/view-tour-by-destination/:destination', tcontroller.getTourByDestination);
tour_router.get('/view_active_tours', tcontroller.getActiveTours);
tour_router.get('/view_inactive_tours', tcontroller.getInactiveTours);
tour_router.get('/isActive/:id', tcontroller.isActive);

export default tour_router;

