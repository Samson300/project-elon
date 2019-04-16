let db = require('ElonDB');

// let Post = mongoose.model('Post', {
//     text: String,
//     posted_at: Date,
//     likes_count: Number,
//     author: String
// });

class Post {
    constructor(id, text, posted_at, likes_count, author) {
        this.id = id;
        this.text = text;
        this.postedAt = posted_at;
        this.likesCount = likes_count;
        this.author = author
    }

    Post.remove(() => {
        .then(() => {
            let posts = [];
            for (let i = 0; i < 30; i++) {
                posts.push({
                    text: faker.lorem.sentence(),
                    posted_at: faker.date.past(),
                    likes_count: Math.round(Math.random() * 20),
                    author: faker.name.findName()
                });
            }
            return Post.create(posts);
        })
        .then(() => {
            process.exit();
        })
        .catch((e) => {
            console.log(e);
            process.exit(1);
        });
    })


        

    // text: String,
    // posted_at: Date,
    // likes_count: Number,
    // author: String
//});

module.exports = Post;

