import express from 'express';
import {
  defaultHandler,
  postTextJustifyHandler,
  postTokenHandler,
} from '../controllers/controller';

const router = express.Router();

router.post('/api/justify', postTextJustifyHandler);
router.post('/api/token', postTokenHandler);
router.use(defaultHandler);

module.exports = router;
