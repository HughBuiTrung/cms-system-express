const router = require("express").Router();

// model
const List = require("../models/List");

/*
GET LIST: /api/list
GET list: /api/list/:id
POST (CREATE list): /api/list
PUT (update list): /api/list/id
DELETE (delete list): /api/list/id
*/

// GET LIST
router.get("/", async (req, res) => {
  console.log("GET LIST", req.query);

  try {
    const lists = await List.find();
    res.status(200).json({
      data: lists,
      msg: "Get list success",
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

// GET A LIST
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const list = await List.findById(id);

    // return success
    res.status(200).json({
      data: list,
      msg: "Get list success",
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

// CREATE NEW LIST
router.post("/", async (req, res) => {
  // req = request body -> client send
  // res = response body -> server return
  const todoList = new List({
    title: req.body.title,
    cards: req.body.cards,
  });

  try {
    const list = await todoList.save();

    // return success
    res.status(200).json({
      data: list,
      msg: "Create list success",
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

// UPDATE LIST
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const field = {};
  if (req.body.title) field.title = req.body.title;
  if (req.body.cards) field.cards = req.body.cards;

  try {
    const list = await List.findOneAndUpdate(
      { _id: id },
      { $set: field },
      { new: true }
    );
    if (!list) {
      res.status(404).json({
        msg: "List not found",
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

// DELETE LIST
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const list = await List.findOneAndRemove({ _id: id });
    if (!list) {
      res.status(404).json({
        msg: "List not found",
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
