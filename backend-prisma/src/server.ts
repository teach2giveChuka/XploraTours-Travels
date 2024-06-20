
import express, {json} from "express";
import user_router from "./routes/user.router";
import auth_router from "./routes/auth.router";
import tour_router from "./routes/tour.router";
import booking_router from "./routes/booking.router";



let app = express()
app.use(json())

app.use('/user', user_router)
app.use('/auth', auth_router)
app.use('/tour', tour_router)
app.use('/booking', booking_router)


app.listen(4115, () => {
 console.log('Server running on port 4115...')
})
