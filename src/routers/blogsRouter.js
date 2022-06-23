const express = require("express");
const blogsController = require("../controller/blogsController");
const blogsRouter = express.Router();

blogsRouter.get("/views", blogsController.views);

module.exports = blogsRouter;
