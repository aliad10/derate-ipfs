import express from 'express';

import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes/sampleRoute.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },

  apis: ['./routes/*.js'], // Path to the API routes
};

const app = express();
app.use(cors());
// Initialize Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Import and use your API routes

app.use('/api', router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
