import { RequestHandler } from 'express';
import { clientService } from '../services/client.service';

export const createClient: RequestHandler = async (req, res) => {
  const { userId, phone, cpf } = req.body;

  try {
    const client = await clientService.create(userId, phone, cpf);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getClient: RequestHandler = async (req, res) => {
  try {
    const client = await clientService.findById(req.params.id);
    res.json(client);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateClient: RequestHandler = async (req, res) => {
  try {
    const client = await clientService.update(req.params.id, req.body);
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteClient: RequestHandler = async (req, res) => {
  try {
    await clientService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
