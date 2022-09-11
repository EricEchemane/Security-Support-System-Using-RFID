import connectDB from '@app/db/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectDB();
  const { Student } = db.models;

  const doc = await Student.find();

  res.status(200).json({ data: doc });
}
