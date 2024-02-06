const Express    = require("express");
const app        = Express();
const port       = 3001;
const bodyParser = require("body-parser");
const session    = require("express-session");
const store      = new session.MemoryStore();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* For session */
app.use(session({
    resave: true,
    secret: "project_socmed",
    saveUninitialized: false,
    store
}));

/* support parsing of application/json type post data */
app.use(bodyParser.json());

/* support parsing of application/x-www-form-urlencoded post data */
app.use(bodyParser.urlencoded({ extended: true }));

/* Users Routes */
const UsersRoutes = require("./routes/user.routes");
app.use("/users", UsersRoutes);

// /* Posts Routes */
// const PostsRoutes = require("./server/routes/posts.routes");
// app.use("/posts", PostsRoutes);

// /* Comments Routes */
// const CommentsRoutes = require("./server/routes/comments.routes");
// app.use("/comments", CommentsRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});