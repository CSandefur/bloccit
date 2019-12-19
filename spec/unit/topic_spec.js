const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "TestTopic1",
        description: "This is a tester topic!"
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "TestPost1",
          body: "This is a tester post!",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a topic object with a title and body", (done) => {
      Topic.create({
        title: "TestTopic2",
        description: "This is a second tester topic!"
      })
      .then((topic) => {
        expect(topic.title).toBe("TestTopic2");
        expect(topic.description).toBe("This is a second tester topic!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or body", (done) => {
      Topic.create({
        title: "TestTopic2"
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });

  });

  describe("#getPosts()", () => {

    it("should return the associated posts", (done) => {
      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("TestPost1");
        done();
      });
    });
  });

});
