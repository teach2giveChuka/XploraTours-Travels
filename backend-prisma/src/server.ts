
import express, {json} from "express";
import user_router from "./routes/user.router";
import auth_router from "./routes/auth.router";
import tour_router from "./routes/tour.router";
import booking_router from "./routes/booking.router";
import review_router from "./routes/review.router";
import cors from 'cors'



let app = express()
app.use(json())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use('/user', user_router)
app.use('/auth', auth_router)
app.use('/tour', tour_router)
app.use('/booking', booking_router)
app.use('/review', review_router)




app.listen(4115, () => {
 console.log(' :-) Server running on port 4115...')
})
