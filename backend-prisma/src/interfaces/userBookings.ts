export interface UserBookings{
    id: string;
    userId: string;
    tourId: string;
    createdAt: Date;
    numberOfPeople: number;
    userName: string;
    userEmail: string;
    destination: string;
    tourType: string;
    pricing: number;
    tourStatus: string;
}