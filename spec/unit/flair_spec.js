const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Topic Title",
        description: "This is the description of the topic"
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "Flair name",
          color: "Blue",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
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

    it("should create a flair object with a name, color, and assigned topic", (done) => {
      Flair.create({
        name: "Create Flair Name",
        color: "Red",
        topicId: this.topic.id
      })
      .then((flair) => {
        expect(flair.name).toBe("Create Flair Name");
        expect(flair.color).toBe("Red");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a flair with missing name, color, or assigned topic", (done) => {
      Flair.create({
        name: "Test Flair Input"
      })
      .then((flair) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Flair.color cannot be null");
        expect(err.message).toContain("Flair.topicId cannot be null");
        done();
      })
    });

  });

});
