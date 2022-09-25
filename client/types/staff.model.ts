export type Staff = {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    nameExtension?: string;
    birthDate: string;
    rfid: string;
    mobileNumber: string;
    photo: string;
    department: string;
    typeOfStaff: string;
    visitationRecords?: {
        date: Date,
        timeIn: Date,
        timeOut: Date,
    }[];
    createdAt?: Date;
    updatedAt?: Date;
};