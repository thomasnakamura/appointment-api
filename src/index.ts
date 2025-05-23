/// <reference path="./types/index.d.ts" />
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';
import appointmentRoutes from './routes/appointment.routes';
import clientRoutes from './routes/client.routes';
import specialistRoutes from './routes/specialist.routes';
import { expireAppointmentsJob } from './jobs/expireAppointments.job';
import { swaggerDocs } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
expireAppointmentsJob.start();

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/private', privateRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/clients', clientRoutes);
app.use('/specialists', specialistRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
