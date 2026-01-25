const pool = require("../config/db");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser_get = await pool.query(`SELECT * FROM auth WHERE email = $1`, [email])
    const foundedUser = foundedUser_get.rows[0]
    
    if (!foundedUser) {
      return res.status(404).json({
        message: "user already exists"
      })
    }
    
    const users_get = await pool.query("select * from auth where username = $1", [username]);
    const user = users_get.rows[0]

    if (!user) {
      return res.status(404).json({
        message: "username already exists"
      })
    }
    
    await pool.query("insert into auth(username, email, password) values($1, $2, $3)", [
      username,
      email,
      password
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

const getAllUser = async (req, res) => {
  try {
    const users = await pool.query("select * from auth");
    res.status(200).json(users.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneuser = async (req, res) => {
  try {
    const {id} = req.params

    const users_get = await pool.query("select * from auth where id = $1", [id]);
    const user = users_get.rows[0]

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  getAllUser,
  getOneuser,
};
