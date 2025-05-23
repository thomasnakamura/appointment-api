import { RequestHandler } from 'express';
import { specialistService } from '../services/specialist.service';

export const createSpecialist: RequestHandler = async (req, res) => {
  const { userId, specialty, dailyLimit, minIntervalMinutes, availability } = req.body;

  try {
    const specialist = await specialistService.create(userId, specialty, dailyLimit, minIntervalMinutes, availability);
    res.status(201).json(specialist);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getSpecialist: RequestHandler = async (req, res) => {
  try {
    const specialist = await specialistService.findById(req.params.id);
    res.json(specialist);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateSpecialist: RequestHandler = async (req, res) => {
  try {
    const specialist = await specialistService.update(req.params.id, req.body);
    res.json(specialist);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteSpecialist: RequestHandler = async (req, res) => {
  try {
    await specialistService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateAvailability: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const updated = await specialistService.updateAvailability(id, availability);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAvailableSlots: RequestHandler = async (req, res) => {
  const { specialty, date } = req.query;

  if (!specialty || !date) {
    res.status(400).json({ error: 'specialty e date são obrigatórios.' });
    return;
  }

  try {
    const slots = await specialistService.getAvailableSlots(
      String(specialty),
      new Date(String(date))
    );

    res.json(slots);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
