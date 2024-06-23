// Description: Interface for the tour object.
export interface Tour {
    id: string;
    destination: string;
    duration: number;
    price: number;
    tourType: string;
    isActive: boolean;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    description: string;
    destinationImage1: string;
    destinationImage2: string;
    destinationImage3: string;
    destinationImage4: string;
}

