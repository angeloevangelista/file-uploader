import path from 'path';
import { v4 } from 'uuid';
import { Router } from 'express';

import IFile from '../entities/Image';
import { upload, uploadDirectory } from '../config/multer';

const files: IFile[] = [];

const routes = Router();

routes.get('/files/:id', (request, response) => {
  const { id } = request.params;

  const file = files.filter((img) => img.id === id)?.pop();

  if (!file) {
    return response.status(400).json({ message: 'File not found.' });
  }

  const filePath = path.join(uploadDirectory, file.generatedName);

  return response.sendFile(filePath);
});

routes.post('/upload', upload.single('file'), (request, response) => {
  if (!request?.file) {
    return response.status(400).json({ message: '"file" not provided.' });
  }

  const image: IFile = {
    id: v4(),
    size: request.file.size,
    generatedName: request.file.filename,
    mimeType: request.file.mimetype,
    originalName: request.file.originalname,
    uploadedAt: new Date(),
  };

  files.push(image);

  return response.json(image);
});

export default routes;
