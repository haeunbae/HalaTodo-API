import express, { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Todo } from '../entities/todo.entity';

const router = express.Router();

router.get('/todo/list', async (req: Request, res: Response) => {
  try {
    const todo = await getConnection().getRepository(Todo).find();
    console.log(todo);

    res.status(200).json({ result: 'success getting todo list' });
  } catch (e) {
    res.status(400).send('error in getting todo list');
  }
});

router.get('/todo', (req: Request, res: Response) => {
  try {
    res.status(200).json({ result: 'success getting todo' });
  } catch (e) {
    res.status(400).send('error in getting todo');
  }
});

router.post('/todo', (req: Request, res: Response) => {
  try {
    res.status(200).json({ result: 'success posting todo list' });
  } catch (e) {
    res.status(400).send('error in posting todo list');
  }
});

router.put('/todo', (req: Request, res: Response) => {
  try {
    res.status(200).json({ result: 'success updating todo list' });
  } catch (e) {
    res.status(400).send('error in updating todo list');
  }
});

router.delete('/todo', (req: Request, res: Response) => {
  try {
    res.status(200).json({ result: 'success deleing todo list' });
  } catch (e) {
    res.status(400).send('error in deleting todo list');
  }
});

export default router;
