import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/todo/list', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ result: 'success getting todo list' });
  } catch (e) {
    res.status(400).send('error in getting todo list');
  }
});

router.get('/todo', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ result: 'success getting todo' });
  } catch (e) {
    res.status(400).send('error in getting todo');
  }
});

router.post('/todo', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ result: 'success posting todo list' });
  } catch (e) {
    res.status(400).send('error in posting todo list');
  }
});

router.put('/todo', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ result: 'success updating todo list' });
  } catch (e) {
    res.status(400).send('error in updating todo list');
  }
});

router.delete('/todo', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ result: 'success deleing todo list' });
  } catch (e) {
    res.status(400).send('error in deleting todo list');
  }
});

export = router;
