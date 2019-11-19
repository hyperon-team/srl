import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
});

router.post('/:invite');

export default router;
