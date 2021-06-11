import express, { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Todo } from '../entities/todo.entity';

const router = express.Router();

router.get('/todo/list', async (req: Request, res: Response) => {
  try {
    const todo = await getConnection()
      .getRepository(Todo)
      .find({ skip: 0, take: 10 });

    res.status(200).json({ result: todo });
  } catch (e) {
    res.status(400).send('error in getting todo list');
  }
});

router.get('/todo', async (req: Request, res: Response) => {
  try {
    const todo = await getConnection()
      .getRepository(Todo)
      .findOne({ where: { id: req.query.id } });

    res.status(200).json({ result: 'success getting todo' });
  } catch (e) {
    res.status(400).send('error in getting todo');
  }
});

router.post('/todo', async (req: Request, res: Response) => {
  const { title, contents, startedAt, endedAt } = req.body;
  try {
    await getConnection().getRepository(Todo).create({
      title,
      contents,
      startedAt,
      endedAt,
    });

    res.status(200).json({ result: 'success posting todo list' });
  } catch (e) {
    res.status(400).send('error in posting todo list');
  }
});

router.put('/todo', async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({})
      .where('id = :id', { id })
      .execute();

    res.status(200).json({ result: 'success updating todo list' });
  } catch (e) {
    res.status(400).send('error in updating todo list');
  }
});

router.delete('/todo', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id = :id', { id });
    res.status(200).json({ result: 'success deleing todo list' });
  } catch (e) {
    res.status(400).send('error in deleting todo list');
  }
});

export default router;
