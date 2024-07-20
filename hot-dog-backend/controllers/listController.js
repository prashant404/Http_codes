const List = require("../models/List");

exports.createList = async (req, res) => {
  const { name, responseCodes, imageLinks } = req.body;
  try {
    const list = new List({
      name,
      responseCodes,
      imageLinks,
      user: req.user._id,
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateList = async (req, res) => {
  const { name, responseCodes, imageLinks } = req.body;
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    list.name = name || list.name;
    list.responseCodes = responseCodes || list.responseCodes;
    list.imageLinks = imageLinks || list.imageLinks;
    await list.save();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    await List.deleteOne({ _id: req.params.id });
    res.json({ message: "List removed" });
  } catch (error) {
    console.error("Error deleting list:", error);
    res.status(500).json({ message: error.message });
  }
};
