import crypto from 'crypto';
import path from 'path';
import multer from 'multer';

export const uploadDirectory = path.resolve(__dirname, '..', '..', 'public');

const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, uploadDirectory);
    },
    filename: (request, file, callback) => {
      const filename = `${crypto.randomBytes(8).toString('hex')}-${
        file.originalname
      }`;

      callback(null, filename);
    },
  }),
};

export const upload = multer(multerConfig);

export default multerConfig;
