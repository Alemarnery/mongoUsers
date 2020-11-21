const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middlware", () => {
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "Js is great", content: "Yellow" });
    comment = new Comment({ content: "Yellow isnt black!!!" });

    joe.blogPost.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("users clean up dangling blogposts on remove", (done) => {
    joe
      .remove()
      .then(() => BlogPost.Collection.countDocuments())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
