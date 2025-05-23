import { RequestHandler } from 'express';
import { appointmentService } from '../services/appointment.service';
import { clientService } from '../services/client.service';

export const createAppointment: RequestHandler = async (req, res) => {
  const { specialistId, date, time } = req.body;

  try {
    const client = await clientService.findByUserId(req.user!.userId);
    await appointmentService.validateAvailability(specialistId, new Date(date), time);

    const appointment = await appointmentService.create(
      client.id,
      req.user!.userId,
      specialistId,
      new Date(date),
      time
    );

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const listAppointments: RequestHandler = async (req, res) => {
  try {
    const client = await clientService.findByUserId(req.user!.userId);
    const appointments = await appointmentService.listByClient(client.id);
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateAppointmentStatus: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await appointmentService.updateStatus(id, status);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const cancelAppointment: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await appointmentService.cancel(id, req.user!.userId, req.user!.role);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
