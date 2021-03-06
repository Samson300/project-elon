const db = require('./conn');
const Users = require('./users');
const Space = require('./space');

class Comments {

    constructor(id, content, user_id, fact_id) {
        this.id = id;
        this.content = content;
        this.userId = user_id;
        this.factId = fact_id;
    }

    static delete(id) {
        return db.result('delete from users where id=$1', [id]);
    }

    static add(commentData) {
        // do an insert into the database
        // using ($) so that pg-promise does *safe* interpolation
        return db.one(`
        insert into comments
            (content, user_id, fact_id)
        values 
            ($1, $2, $3)
        returning content, user_id, fact_id
        `, [commentData.content, commentData.user_id, commentData.fact_id])
            .then((data) => {
                // console.log('========================')
                // console.log(data);
                // console.log("you did the thing! good job.");
                //console.log(`new comment id is ${data.id}`);
                return data;
            })
        // and return the id of the new comment
    }
    // static getById(id) {
    //     console.log(`LOOK AT ME ===`, id);
        
    // }
    static getByUserId(userId) {
        console.log(userId)
        return db.any(`select * from comments where user_id=${userId}`)
            
            .then((arrayOfComments) => {
        
                //console.log(arrayOfComments);
                return arrayOfComments.map((commentData) => {
                    const theComments = new Comments(
                        commentData.id,
                        commentData.content,
                        commentData.user_id,
                        commentData.fact_id,
                    );
                    return theComments;
                });
            })
        // .catch(() => {
        //     return null;
       
    }
    static getByFactId(fact_id) {
        console.log(fact_id)
        return db.any(`select * from comments where fact_id=${fact_id}`)
            
            .then((arrayOfComments) => {
        
                //console.log(arrayOfComments);
                return arrayOfComments.map((commentData) => {
                    const theComments = new Comments(
                        commentData.id,
                        commentData.content,
                        commentData.user_id,
                        commentData.fact_id,
                    );
                    return theComments;
                });
            })

    }

    static getAll() {
        return db.any(`select * from comments`)
            .then((arrayOfComments) => {
                //console.log(arrayofComments)
                return arrayOfComments.map((commentData) => {
                    const aComment = new Comments (
                        commentData.id,
                        commentData.content,
                        commentData.user_id,
                        commentData.fact_id,
                    );
                    return aComment;
                })
            })
            .catch(() => {
                return null;
            })
    }

    // no "static" since this is an "instance method"
    // (it belongs to the individual instance)
    save() {
        // use .result when you might want a report about
        // how many rows got affected
        return db.result(`            
        update comments set 
            content='${this.content}',
            user_id='${this.userId}',
            space_id='${this.factId}',
        where id=${this.id}
        `);
    }

}

module.exports = Comments;