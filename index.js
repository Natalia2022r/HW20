const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const appPort = 5000;
const mongoUrl =
  "mongodb+srv://test:12345q@cluster0.wd7bu3q.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// Model

const UsersSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  imageUrl: String,
});

const PostSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Users", UsersSchema);
mongoose.model("Post", PostSchema);

const Users = mongoose.model("Users");
const Post = mongoose.model("Post");

// Controller

const getAllUsers = (req, res) => {
  Users.find()
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

const createUser = (req, res) => {
  Users.create(req.body)
    .then((createUsers) => res.json(createUsers))
    .catch((err) => res.status(500).json(err));
};

const updateUsers = (req, res) => {
  Users.updateOne({ _id: req.params.id }, { $set: req.body })
    .exec()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

const getAllPost = (req, res) => {
  Post.find()
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

const createPost = (req, res) => {
  Post.create(req.body)
    .then((createPost) => res.json(createPost))
    .catch((err) => res.status(500).json(err));
};

const updatePost = (req, res) => {
  Post.updateOne({ _id: req.params.id }, { $set: req.body })
    .exec()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

// Routes

app.get("/users", cors(corsOptions), getAllUsers);
app.post("/users", cors(corsOptions), createUser);
app.put("/users/:id", cors(corsOptions), updateUsers);

app.get("/post", cors(corsOptions), getAllPost);
app.post("/post", cors(corsOptions), createPost);
app.put("/post/:id", cors(corsOptions), updatePost);

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(appPort, () => console.log(`Listening on port ${appPort} ...`))
  )
  .catch((err) => console.error(`Error connecting to mongo: ${mongoUrl}`, err));
