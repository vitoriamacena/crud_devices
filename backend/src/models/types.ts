export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'administrator' | 'security personnel';
  }
  
  export interface SecurityPersonnel {
    id: number;
    userId: number;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    assignedLocation: number;
  }
  
  export interface ShiftSchedule {
    id: number;
    securityPersonnelId: number;
    shiftDate: string;
    startTime: string;
    endTime: string;
  }
  
  export interface Location {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
  }
  