import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('*', (request, response) => {
  const validRoutes = [
    {
      method: 'GET',
      route: '/api/files/{id}',
      params: [
        {
          type: 'string',
          name: 'id',
        },
      ],
    },
    {
      method: 'POST',
      route: '/api/upload',
      params: [
        {
          type: 'multipart/form-data',
          name: 'image',
        },
      ],
    },
  ];

  return response.json({ validRoutes });
});

export default app;
