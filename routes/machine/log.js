const router = require("express").Router();
// validation
const {
  logTaskValidation,
  updateLogTaskValidation,
  scheduleTaskValidation,
} = require("../../validation/machine/log");
const LogTask = require("../../model/Machine/task");
const ScheduleTask = require("../../model/Machine/scheduleTask");
/**
 * add task routes - start
 */
// register route
router.post("/addTask", async (req, res) => {
  // validate the user
  const { error } = logTaskValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const logTask = new LogTask({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    areaOfWork: req.body.areaOfWork,
    generalCleaning: req.body.generalCleaning,
    DampMoping: req.body.DampMoping,
    WashingSucrubbing: req.body.WashingSucrubbing,
    LitterPicking: req.body.LitterPicking,
  });
  try {
    const savedlogTask = await logTask.save();
    res.json({ error: null, data: { logTaskId: savedlogTask._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/updateTask", async (req, res) => {
  // validate the user
  const { error } = updateLogTaskValidation(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };

  try {
    LogTask.updateOne(query, req.body, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({ error: null, data: { updatedTaskData: req.body } });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/deleteTask", async (req, res) => {
  // throw validation errors
  if (req.body._id == "" || req.body._id == null)
    return res.status(400).json({ error: "ID is required" });

  const query = { _id: req.body._id };

  try {
    const updatedLogTaskData = await LogTask.deleteOne(query, { upsert: true });
    res.json({
      error: null,
      data: { message: "SuccessFully Deleted", id: req.body._id },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/loadTask/:companyId", async (req, res) => {
  try {
    const taskDetails = await LogTask.find({
      companyId: req.params.companyId,
    })
      .select("-__v")
      .sort("-date");

    res.json({
      error: null,
      data: { taskDetails: taskDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
/**
 * schedule task routes - start
 */
router.post("/scheduleTask", async (req, res) => {
  // validate the user
  const { error } = scheduleTaskValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const scheduleTask = new ScheduleTask({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    task: req.body.task,
    taskFor: req.body.taskFor,
    taskDate: req.body.taskDate,
    status: req.body.status,
  });
  try {
    const savedscheduleTask = await scheduleTask.save();
    res.json({ error: null, data: { taskId: savedscheduleTask._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/loadScheduleTask/:companyId", async (req, res) => {
  try {
    const taskDetails = await ScheduleTask.find({
      companyId: req.params.companyId,
    })
      .select("-__v")
      .sort("-date");
    res.json({
      error: null,
      data: { taskDetails: taskDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/loadPendingTask/:companyId", async (req, res) => {
  try {
    const taskDetails = await ScheduleTask.find({
      companyId: req.params.companyId,
      status: "assigned",
    })
      .select("-__v")
      .sort("-date");
    res.json({
      error: null,
      data: { taskDetails: taskDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/loadCompletedTask/:companyId", async (req, res) => {
  try {
    const taskDetails = await ScheduleTask.find({
      companyId: req.params.companyId,
      status: "completed",
    })
      .select("-__v")
      .sort("-date");
    res.json({
      error: null,
      data: { taskDetails: taskDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
