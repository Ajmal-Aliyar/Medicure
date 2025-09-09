

export interface PublicSpecialization {
    name: string;
    imageUrl: string;
}

export interface ISpecialization { 
  name: string;  
  imageUrl: string;               
  description: string;
  avgConsultTime: number;        
  bookings: number;             
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
