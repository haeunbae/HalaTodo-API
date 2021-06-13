import express, { Request, Response } from 'express';
import {
  isCompleteParamValid,
  isContentValid,
  isIdValid,
  isUpdateParamValid,
} from '../middleware/validation';
import { getConnection } from 'typeorm';
import { Todo } from '../entities/todo.entity';

const router = express.Router();

/**
 * @swagger
 *  paths:
 *  /todo/list:
 *    get:
 *      description: 모든 todo list 조회
 *      responses:
 *       "200":
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *       "400":
 *         description: 잘못된 데이터
 *         content:
 *           application/json:
 *            schema:
 *              type: string
 *              default: error in getting todo list
 */
router.get('/list', async (req: Request, res: Response) => {
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
/**
 * @swagger
 *  paths:
 *  /todo:
 *    get:
 *      description: todo  조회
 *      parameters:
 *        - name: id
 *          in: query
 *          description: todo Id
 *          required: true
 *          type: number
 *      responses:
 *       "200":
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *       "400":
 *         description: 잘못된 데이터
 *         content:
 *           application/json:
 *            schema:
 *              type: string
 *              default: error in getting todo
 */
router.get('/', isIdValid, async (req: Request, res: Response) => {
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
/**
 * @swagger
 *  paths:
 *  /todo:
 *    post:
 *      description: todo 입력
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                contents:
 *                  type: string
 *                  default: Swagger contents
 *                startedAt:
 *                  type: string
 *                  default: 2021-06-02T16:26:02.000Z
 *                endedAt:
 *                  type: string
 *                  default: 2021-06-10T16:26:02.000Z
 *      responses:
 *       "200":
 *        description:  성공
 *        content:
 *          application/json:
 *           schema:
 *              type: string
 *              default: success posting todo list
 *       "400":
 *         description: 잘못된 데이터
 *         content:
 *           application/json:
 *            schema:
 *              type: string
 *              default: error in posting todo list
 */
router.post('/', isContentValid, async (req: Request, res: Response) => {
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

    res.status(200).send('success posting todo list');
  } catch (e) {
    res.status(400).send('error in posting todo list');
  }
});

router.put(
  '/',
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

/**
 * @swagger
 *  paths:
 *  /todo/complete:
 *    put:
 *      description: todo 완료/미완료
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                complete:
 *                  type: number
 *                  default: 1
 *      responses:
 *       "200":
 *        description:  성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  default: Success updating todo list
 *       "400":
 *         description: 잘못된 데이터
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  default: Error in updating todo list
 */
router.put(
  '/complete',
  isIdValid,
  isCompleteParamValid,
  async (req: Request, res: Response) => {
    const { id, complete } = req.body;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Todo)
        .set({
          complete,
        })
        .where('id = :id', { id })
        .execute();

      res.status(200).json({ message: 'Success updating todo list' });
    } catch (err) {
      res.status(400).send('Error in updating todo list');
    }
  }
);

router.delete('/', isIdValid, async (req: Request, res: Response) => {
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
