import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/app/database/db';
import User from '@/app/models/registrationSchema';
import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('avatar'));

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const { userId } = req.cookies;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.avatarUrl = `/uploads/${req.file.filename}`;
  await user.save();

  res.status(200).json({ avatarUrl: user.avatarUrl });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
