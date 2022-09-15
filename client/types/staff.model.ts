export type Staff = {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    nameExtension?: string;
    birthDate: String;
    rfid: string;
    mobileNumber: string;
    department: string;
    visitationRecords?: {
        date: Date,
        timeIn: Date,
        timeOut: Date,
    }[];
    createdAt?: Date;
    updatedAt?: Date;
};