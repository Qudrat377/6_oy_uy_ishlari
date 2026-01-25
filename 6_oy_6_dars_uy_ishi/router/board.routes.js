const {Router} = require("express")
const { getAllTasks, createTask, deleteTask, getOneTask, UpdateTask, updatedStatusTask, count_Task_board, getOneStatus } = require("../controller/board_list.controller")

const TaskRouter = Router()

TaskRouter.get("/get_all_tasks", getAllTasks)
TaskRouter.get("/get_one_task/:id", getOneTask)
TaskRouter.post("/add_task", createTask)
TaskRouter.put("/update_task/:id", UpdateTask)
TaskRouter.delete("/delete_task/:id", deleteTask)
TaskRouter.put("/update_task_status/:id", updatedStatusTask)
TaskRouter.get("/count_Task_board", count_Task_board)
TaskRouter.get("/get_one_status/:status", getOneStatus)

module.exports = TaskRouter