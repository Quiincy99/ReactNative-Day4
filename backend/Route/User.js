import express from "express";
import fs from "fs";
import {v4 as uuidv4} from 'uuid'

const router = express.Router();

let users = [];

// Initial data read 
fs.readFile("data.json", (err, data) => {
  if (err) throw err;

  users = JSON.parse(data);
});

// Update data function
const updateData = () => {
  fs.writeFile("data.json", JSON.stringify(users), err => {
     
    // Checking for errors
    if (err) throw err; 
   
  });
}


// GET
router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const {id} = req.params

  const findUser = users.find((user) => user.id == id)

  res.send(findUser)

})


// POST
router.post("/", (req, res) => {
  const user = req.body;

  const id = uuidv4()

  const userful = {...user, id:id}

  users.push(userful)
  console.log(users)

  updateData();

  res.send(userful)
});

router.post("/:id", (req, res) => {
  const {id} = req.params;
  const {UserName, Email, Password} = req.body;

  const updateUser = users.find((user) => user.id == id)

  if (UserName) {
    updateUser.UserName = UserName
  }

  if (UserName) {
    updateUser.Email = Email
  }

  if (UserName) {
    updateUser.Password = Password
  }

  updateData();

  res.send(updateUser)
});


//DELETE
router.delete("/:id", (req, res) => {
  const {id} = req.params;

  users = users.filter((u) => u.id != id);

  updateData();
})

export default router;
