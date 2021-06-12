import express, { Request, Response } from 'express';
import {
  isContentValid,
  isIdValid,
  isUpdateParamValid,
} from '../middleware/validation';
import { getConnection } from 'typeorm';
import { Todo } from '../entities/todo.entity';

const router = express.Router();
/**
 *  @swagger
 *  tags:
 *    name: Todo list
 *    description: API to manage Todolist.
 */
/**
 * @swagger
 *  paths:
 *  /todo/list:
 *    get:
 *      tags: [todo]
 *      description: 모든 todo list 조회
 *      produces:
 *      - application/json
 *      parameters:
 *      responses:
 *       "200":
 *        description:  성공
 *      schema:
 *        $ref: '#/components/schemas/Todo'
 */
router.get('/todo/list', async (req: Request, res: Response) => {
  const { skip = 0, take = 10 } = req.query;

  try {
    const todo = await getConnection()
      .getRepository(Todo)
      .find({ skip: Number(skip), take: Number(take) });

    res.status(200).json({ result: todo });
  } catch (e) {
    res.status(400).send('error in getting todo list');
  }
});

router.get('/todo', isIdValid, async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const todo = await getConnection()
      .getRepository(Todo)
      .findOne({ where: { id } });

    res.status(200).json({ result: todo });
  } catch (e) {
    res.status(400).send('error in getting todo');
  }
});

router.post('/todo', isContentValid, async (req: Request, res: Response) => {
  const { title, contents, startedAt, endedAt } = req.body;

  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values({
        title,
        contents,
        startedAt,
        endedAt,
      })
      .execute();

    res.status(200).json({ result: 'success posting todo list' });
  } catch (e) {
    res.status(400).send('error in posting todo list');
  }
});

router.put(
  '/todo',
  isIdValid,
  isUpdateParamValid,
  async (req: Request, res: Response) => {
    const { id, ...arg } = req.body;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Todo)
        .set({
          ...arg,
        })
        .where('id = :id', { id })
        .execute();

      res.status(200).json({ result: 'success updating todo list' });
    } catch (e) {
      res.status(400).send('error in updating todo list');
    }
  }
);

router.delete('/todo', isIdValid, async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id = :id', { id })
      .execute();

    res.status(200).json({ result: 'success deleting todo list' });
  } catch (e) {
    res.status(400).send('error in deleting todo list');
  }
});

export default router;
