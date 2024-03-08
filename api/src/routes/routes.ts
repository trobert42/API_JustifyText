import express from 'express';
import {
  defaultHandler,
  postTextJustifyHandler,
  postTokenHandler,
} from '../controllers/controller';

const router = express.Router();
const auth = require('../middleware/auth');

router.post('/api/justify', auth, postTextJustifyHandler);
router.post('/api/token', postTokenHandler);
router.use(defaultHandler);

module.exports = router;
