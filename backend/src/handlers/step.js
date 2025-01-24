import db from "../libs/db.js";

export const getStepById = async (id) => {
  const step = await db.step.findUnique({
    where: { id: Number(id) },
  });

  return step;
};

export const updateStepOrder = async (id, newOrder) => {
  return await db.$transaction(async (tx) => {
    // 1. Get the step to be moved
    const step = await tx.step.findUnique({
      where: { id: Number(id) },
    });

    if (!step) {
      throw new Error("Step not found");
    }

    const currentOrder = step.order;
    if (currentOrder === newOrder) {
      return step;
    }

    // 2. Get all steps in the same task
    const allSteps = await tx.step.findMany({
      where: { taskId: step.taskId },
      orderBy: { order: "asc" },
    });

    // 3. Update orders based on move direction
    if (newOrder < currentOrder) {
      // Moving up: increment orders for steps between newOrder and currentOrder
      await tx.step.updateMany({
        where: {
          taskId: step.taskId,
          //   gte: greater than or equal to
          //   lt: less than
          AND: [
            {
              order: { gte: newOrder },
            },
            {
              order: { lt: currentOrder },
            },
          ],
        },
        data: { order: { increment: 1 } },
      });
    } else {
      // Moving down: decrement orders for steps between currentOrder and newOrder
      await tx.step.updateMany({
        where: {
          taskId: step.taskId,
          AND: [
            {
              order: { gt: currentOrder },
            },
            {
              order: { lte: newOrder },
            },
          ],
        },
        data: { order: { decrement: 1 } },
      });
    }

    // 4. Update the moved step's order
    const updatedStep = await tx.step.update({
      where: { id: Number(id) },
      data: { order: newOrder },
    });

    return updatedStep;
  });
};
