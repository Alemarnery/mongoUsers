const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Association", () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "Js is great", content: "Yellow" });
    comment = new Comment({ content: "Yellow isnt black!!!" });

    joe.blogPost.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it.only("saves a relation between a user and a blogpost", (done) => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then((user) => {
        assert((user.blogPost[0].title = "JS is Great"));
        done();
      });
  });

  it("saves a full relation graph", (done) => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user",
          },
        },
      })
      .then((user) => {
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "JS is great");
        assert(
          user.blogPosts[0].comments[0].content === "Yellow isnt black!!!"
        );
        done();
      });
  });
});
