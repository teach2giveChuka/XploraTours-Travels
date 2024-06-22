export interface Tour {
    id: string;
    destination: string;
    price: number;
    tourType: 'Hikes' | 'Sightseeing' | 'Cultural excursions' | 'Beach' | 'Hiking' | 'Weekend gateways';
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    description: string;
    destinationImage1: string;
    destinationImage2: string;
    destinationImage3: string;
    destinationImage4: string;
}