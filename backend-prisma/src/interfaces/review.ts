export interface Review {
    id: string;
    userId: string;
    tourId: string;
    createdAt: Date;
    rating: number;
    content: string;
}