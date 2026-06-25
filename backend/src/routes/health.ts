import { Router, Request, Response } from 'express';
import { createSuccessResponse } from '@/utils/response';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.json(
    createSuccessResponse(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      'API is healthy'
    )
  );
});

export default router;