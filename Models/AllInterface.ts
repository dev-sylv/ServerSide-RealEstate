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

export interface agents {
    agentname: string;
    agentbio: string;
    agentPicture: string;
    agentemail: string;
    agentpassword: string;
    houses: {}[];
    isAdmin: boolean
}