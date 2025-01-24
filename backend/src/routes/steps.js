import express from "express";
import db from "../libs/db.js";
import { getStepById, updateStepOrder } from "../handlers/step.js";
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

// get all steps
router.get("/", async (req, res) => {
  const { taskId } = req.query;

  const steps = await db.step.findMany({
    where: {
      taskId: Number(taskId),
    },
    orderBy: {
      order: "asc",
    },
  });

  res.json({
    success: true,
    data: steps,
  });
});

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

// Delete a step
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.step.delete({
    where: { id: Number(id) },
  });
});

// Update a step
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, finished } = req.body;

  const step = await getStepById(id);

  if (!step) {
    res.status(404).json({
      success: false,
      message: "Step not found",
    });
  }

  const updatedStep = await db.step.update({
    where: { id: Number(id) },
    data: { name, finished },
  });

  res.json({
    success: true,
    data: updatedStep,
  });
});

// update order
router.patch("/:id/order", async (req, res) => {
  const { id } = req.params;
  const { order } = req.body;

  const step = await getStepById(id);

  if (!step) {
    return res.status(404).json({
      success: false,
      message: "Step not found",
    });
  }

  const updatedStep = await updateStepOrder(id, order);

  res.json({
    success: true,
    data: updatedStep,
  });
});

export default router;
