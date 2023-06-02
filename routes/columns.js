const router = require("express").Router();

// model
const Column = require("../models/Columns");

// GET LIST
router.get("/", async (req, res) => {
  console.log("GET LIST", req.query);

  try {
    const todos = await Column.find();
    res.status(200).json({
      data: todos,
      msg: "Get columns success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// GET A ITEM
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Column.findById(id);

    // return success
    res.status(200).json({
      data: todo,
      msg: "Get item success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// CREATE NEW ITEM
router.post("/", async (req, res) => {
  // req = request body -> client send
  // res = response body -> server return
  const todoItem = new Column({
    lists: req.body.lists,
  });

  try {
    const todo = await todoItem.save();

    // return success
    res.status(200).json({
      data: todo,
      msg: "Create todo success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// UPDATE ITEM
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const field = {};
  if (req.body.lists) field.lists = req.body.lists;

  try {
    const item = await Column.findOneAndUpdate(
      { _id: id },
      { $set: field },
      { new: true }
    );
    if (!item) {
      res.status(404).json({
        msg: "Item not found",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Update Sccess",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Column.findOneAndRemove({ _id: id });
    if (!item) {
      res.status(404).json({
        msg: "Item not found",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Delete Sccess",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});
module.exports = router;
