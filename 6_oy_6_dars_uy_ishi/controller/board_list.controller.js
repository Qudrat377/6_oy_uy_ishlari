const pool = require("../config/db");

const createTask = async (req, res) => {
  try {
    const { title, description, task_user_id} = req.body;

    const created_by = 1

    await pool.query("insert into board_list(title, description, task_user_id, created_by) values($1, $2, $3, $4)", [
      title,
      description,
      task_user_id,
      created_by
    ]);

    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    if (search) {

      const searchchingResult1 = await pool.query(
        `select * from board_list where title ilike '%${search}%' order by id asc`
      );

      const searchchingResult = await pool.query(
        `select * from board_list where title ilike '%${search}%' order by id asc offset $1 limit $2`,
        [offset, limit],
      );
      return res.status(200).json({
        page,
        limit,
        totalPage: Math.ceil(searchchingResult1.rows.length / limit),
        product: searchchingResult.rows,
      });
    } else {
      const productResult = await pool.query("select * from board_list");
      const total = productResult.rowCount;

      const product = await pool.query(
        `select * from board_list order by id asc offset $1 limit $2`,
        [offset, limit],
      );

      return res.status(200).json({
        page,
        limit,
        totalPage: Math.ceil(total / limit),
        totalProductCount: total,
        product: product.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneTask = async (req, res) => {
  try {
    const {id} = req.params

    const task_get = await pool.query(`select * from board_list where id = $1`, [id])
    const task = task_get.rows[0]

    if (!task) {
        return res.status(404).json({message: "Task not found"})
    }

    res.status(200).json(task)

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const {id} = req.params
    const {title, description, task_user_id} = req.body

    const task_get = await pool.query(`select * from board_list where id = $1`, [id])
    const task = task_get.rows[0]

    if (!task) {
        return res.status(404).json({message: "Not found Task"})
    }

    await pool.query(`update board_list set title = $1, description = $2, task_user_id = $3 where id = $4`, [
        title ? title : task.title, 
        description ? description : task.description, 
        task_user_id ? task_user_id : task.task_user_id, 
        id
    ])

    res.status(200).json({
        message: "Updated"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task_get = await pool.query(`select * from board_list where id = $1`, [id])
    const task = task_get.rows[0]

    if (!task) {
        return res.status(404).json({message: "Task not found"})
    }

    await pool.query("DELETE FROM board_list WHERE id = $1", [id]);

    res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatedStatusTask = async (req, res) => {
    try {
    const {id} = req.params
    
    const {status} = req.body
    const tasks = ['Pending', 'inProgress', 'Done']

    if (!tasks.includes(status)) {
       return res.status(404).json({
        message: "Taskni bunday statusga belgilab bo'lmaydi. Statuslar: ['Pending', 'inProgress', 'Done']"
       }) 
    }

    const task_get = await pool.query(`select * from board_list where id = $1`, [id])
    const task = task_get.rows[0]

    if (!task) {
        return res.status(404).json({message: "Not found Task"})
    }

    await pool.query(`update board_list set status = $1 where id = $2`, [
        status ? status : task.status, 
        id
    ] )

    res.status(200).json({
        message: "Updated"
    })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const count_Task_board = async (req, res) => {
    try {
    let tasks = {Pending: 0, inProgress: 0, Done: 0}

    const task = await pool.query(`select * from board_list`)

    if (task.rows.length === 0) {
        return res.status(404).json({message: "Not found Task"})
    }

    for (let i = 0; i < task.rows.length; i++) {
        let obj_task = task.rows[i]
        for (const key in obj_task) {
            
            if (key === "status") {
                tasks[obj_task[key]] ++
            }
            
        }
    }

    res.status(200).json(tasks)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneStatus = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    const {status} = req.params

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    // if (search) {

    //   const searchchingResult1 = await pool.query(
    //     `select * from board_list where title ilike '%${search}%' order by id asc`
    //   );

    //   const searchchingResult = await pool.query(
    //     `select * from board_list where title ilike '%${search}%' order by id asc offset $1 limit $2`,
    //     [offset, limit],
    //   );
    //   return res.status(200).json({
    //     page,
    //     limit,
    //     totalPage: Math.ceil(searchchingResult1.rows.length / limit),
    //     product: searchchingResult.rows,
    //   });
    // } else {

        

    // const task_get = await pool.query(`select * from board_list where status = $1 order by id asc`, [status])
    const searchQuery = search ? `%${search}%` : '%';
    
    const task_get = await pool.query(`SELECT * FROM board_list WHERE status = $1 AND title ILIKE $2 ORDER BY id ASC offset $3 limit $4`,
         [status, searchQuery, offset, limit]);

    const task = task_get.rows

      const productResult = await pool.query("select * from board_list");
      const total = productResult.rowCount;

      const product = await pool.query(
        `select * from board_list order by id asc offset $1 limit $2`,
        [offset, limit],
      );

      return res.status(200).json({
        page,
        limit,
        totalPage: Math.ceil(task_get.rowCount / limit),
        totalTaskCount: task_get.rowCount,
        status: ['Pending', 'inProgress', 'Done'],
        task: task,
      });
    // }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
    createTask,
    getAllTasks,
    getOneTask,
    UpdateTask,
    deleteTask,
    updatedStatusTask,
    count_Task_board,
    getOneStatus
};
