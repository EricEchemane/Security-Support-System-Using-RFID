export type Student = {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    nameExtension?: string;
    birthDate: string;
    rfid: string;
    mobileNumber: string;
    section: string;
    photo: string;
    department?: string;
    yearLevel: string;
    strand?: string;
    course?: string;
    visitationRecords?: {
        date: Date,
        timeIn: Date,
        timeOut: Date,
    }[];
    createdAt?: Date;
    updatedAt?: Date;
};