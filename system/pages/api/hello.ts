// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '@app/db/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectDB();
  const { Student } = db.models;

  const doc = await Student.findByEmail("asdasd");

  res.status(200).json({ data: doc });
}
