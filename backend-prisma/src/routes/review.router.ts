import { reviewController } from "../controllers/review.controller";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

//import auth token

let rcontroller = new reviewController()
let review_router = Router();

review_router.post('/create-review', verifyToken, rcontroller.createReview);
review_router.get('/view-all-reviews', rcontroller.viewAllReviews);
review_router.delete('/delete-review/:id', rcontroller.deleteReview);
review_router.put('/update-review/:id', rcontroller.updateReview);
review_router.get('/view-tour-reviews/:id', rcontroller.viewTourReviews);
review_router.get('/view-user-reviews/:id', verifyToken, rcontroller.viewUserReviews);

export default review_router;