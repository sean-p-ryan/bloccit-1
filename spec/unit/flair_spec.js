const sequelize = require("../../src/db/models/index").sequelize;

const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;

        sequelize.sync({ force: true }).then((res) => {
            Topic.create({
                title: "Guitar players",
                description: "A discussion of great guitar players."
            })
                .then((topic) => {
                    this.topic = topic;
                    Post.create({
                        title: "Jimi Hendrix",
                        body: "Hendrix rules. Let's talk about Hendrix.",
                        topicId: this.topic.id
                    })
                        .then((post) => {
                            this.post = post;
                            Flair.create({
                                name: "standard",
                                color: "orange",
                                topicId: this.topic.id,
                                postId: this.post.id
                            })
                                .then(flair => {
                                    console.log("created flair");
                                    this.flair = flair;
                                    done();
                                })
                                .catch((err) => {
                                    console.log(err);
                                    done();
                                });
                        });
                });
        });
    });
    describe("#create()", () => {
        it("should create a flair with the given values", done => {
            Post.create({
                title: "Jimi Page was teh best guitarist ever.",
                body: "No doub. It was Page.",
                topicId: this.topic.id
            }).then(post => {
                Flair.create({
                    name: "standard",
                    color: "orange",
                    topicId: this.topic.id
                })
                    .then(flair => {
                        expect(flair).not.toBeNull();
                        expect(flair.name).toBe("standard");
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });
        });
        it("should not create a flair with missing title, body, or assigned topic", (done) => {
            Flair.create({
                title: "Pros of Cryosleep during the long journey"
            })
                .then((flair) => {
                    this.flair = flair;
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Flair.name cannot be null");
                    expect(err.message).toContain("Flair.color cannot be null");
                    done();
                })
        });
    });
});
describe("#setFlair()", () => {
    it("should associate a flair and a post together", done => {
        Post.create({
            title: "Challenges of shredding",
            body: "Sometimes you just can't shred.",
            topicId: this.topic.id
        }).then(newPost => {
            newPost.setFlair(this.flair).then(post => {
                expect(post.flairId).toBe(this.flair.id);
                done();
            });
        });
    });
});
describe("#getFlair()", () => {
    it("should return the associated flair", done => {
        this.post.setFlair(this.flair).then(post => {
            post
                .getFlair()
                .then(flair => {
                    expect(flair.name).toBe("standard");
                    expect(flair.color).toBe("orange");
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
    });
});