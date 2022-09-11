import connectDB from '@app/db/connectDB';
import normalize, { RequestError } from '@app/http/response-normalizer';
import type { NextApiRequest } from 'next';

async function handler(req: NextApiRequest) {
    const { rfid } = req.query;
    if (!rfid) {
        throw new RequestError(400, 'Missing rfid');
    }
    const db = await connectDB();
    const { Student } = db.models;

    const student = await Student.findOne({ rfid });
    if (!student) {
        throw new RequestError(404, 'Student not found');
    }
    return student;
}

export default normalize(handler);