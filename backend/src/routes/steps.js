import express from "express";
import db from "../libs/db.js";
const router = express.Router();

/**
 *  API
 *  1. Create step
 *  POST: api/steps
 *  body: {
 *   name, order, taskId
 * }
 *
 * 2. Delete Step
 * DELETE: api/steps/:id
 *
 *
 * 3. Update Step
 * PATCH: api/steps/:id
 * BODY: {
 *  finished,
 *  order
 * }
 */

// Get all tasks
router.post("/", async (req, res) => {
  const { name, order, taskId } = req.body;

  const step = await db.step.create({
    data: {
      name,
      order,
      task: {
        connect: {
          id: taskId,
        },
      },
    },
  });

  res.json({
    success: true,
    data: step,
  });
});

//

export default router;
