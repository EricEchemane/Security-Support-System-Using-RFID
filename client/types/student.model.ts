export type Student = {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    nameExtension?: string;
    birthDate: Date;
    rfid: string;
    mobileNumber: string;
    section: string;
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