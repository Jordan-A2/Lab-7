let express = require("express");
let morgan = require("morgan");
let bodyParser = require('body-parser');
let uuid = require("uuid/v4");
let app = express();
let jsonParser = bodyParser.json();

app.use(express.static("public"))

app.use(morgan("dev"));

let blog_posts = [{
    id: uuid(),
    title: "First blog",
    content: "Some really good stuff",
    author: "Jordan",
    publishDate: "25 / 10 / 2019"
},
{
    id: uuid(),
    title: "Second blog",
    content: "Some not so good stuff",
    author: "Allen",
    publishDate: "25 / 10 / 2019"
}];

app.get("/api/blog-posts", (req, res, next) => {
    return res.status(200).json({
        message: "Retrieved blogs",
        status: 200,
        post: blog_posts
    });
});

app.get("/api/blog-post", (req, res, next) => {
    let author = req.query.author;

    if (!author) {
        return res.status(406).json({
            message: "Missing author in query",
            status: 406
        });
    }

    let C = 0;
    for (i = 0; i < blog_posts.length; i++) {
        if (author == blog_posts[i].author) {
            C = 1;
        };
    }
    if (C != 1) {
        return res.status(404).json({
            message: "Author doesn't exist",
            status: 404
        });
    }

    let responseArray = blog_posts.filter(elem => elem.author == author);
    return res.status(200).json({
        message: "Retrieved blogs by author",
        status: 200,
        post: responseArray
    });
});

app.post("/api/blog-posts", jsonParser, (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let publishDate = req.body.publishDate;

    if (!title || !content || !author || !publishDate) {
        return res.status(406).json({
            message: "Missing field",
            status: 406
        });
    }

    let newPost = {
        id: uuid(),
        title: title,
        content: content,
        author: author,
        publishDate: publishDate
    };

    blog_posts.push(newPost);

    return res.status(201).json({
        message: "New post has been created",
        status: 201,
        post: newPost
    });
});

app.delete("/api/blog-posts/:id", (req, res, next) => {
    let id = req.params.id;

    for (i = 0; i < blog_posts.length; i++) {
        if (id == blog_posts[i].id) {
            return res.status(200).json({
                message: "Post deleted",
                status: 200,
                post: blog_posts.splice(i, 1)
            });
        }
    }

    return res.status(404).json({
        message: "id doesn't exist",
        status: 404
    });
});

app.put("/api/blog-posts/:id", jsonParser, (req, res, next) => {
    let id = req.body.id;
    let id2 = req.params.id;
    for (i = 0; i < blog_posts.length; i++) {
        if (id == blog_posts[i].id) {
            if (req.body.title) {
                blog_posts[i].title = req.body.title;
            }
            if (req.body.author) {
                blog_posts[i].author = req.body.author;
            }
            if (req.body.content) {
                blog_posts[i].content = req.body.content;
            }
            if (req.body.publishDate) {
                blog_posts[i].publishDate = req.body.publishDate;
            }

        }
    }

    if (!id) {
        return res.status(406).json({
            message: "no id in body",
            status: 406
        });
    }

    if (id != id2) {
        return res.status(409).json({
            message: "id in body and path are not the same",
            status: 409
        });
    }

    return res.status(202).json({
        message: "post has been updated",
        status: 202,
        post: blog_posts
    });
});

app.listen("8080", () => {
    console.log("App is running on port 8080");
});

