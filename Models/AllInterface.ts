export interface houseData{
    houseName: string;
    houseDescription: string;
    housePrice: string;
    bedrooms: string;
    bathrooms: string;
    houseImage: string;
    houseRentage: string;
    houseLocation: string;
    houseTypes: string;
    agentname: string
}

export interface agentData {
    name: string;
    email: string;
    password: string;
    bio: string;
    image: string;
    houses: {}[]
}