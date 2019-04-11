const db = require('./conn');
const Users = require('./users');
const Space = require('./space');

class Facts {

    constructor(id, saying) {
        this.id = id;
        this.saying = saying;
    }

    static delete(id) {
        return db.result('delete from facts where id=$1', [id]);
    }

    static add(factData) {
        // do an insert into the database
        // using ($) so that pg-promise does *safe* interpolation
        return db.one(`
        insert into comments
            (id, saying)
        values 
            ($1, $2)
        returning id, content, user_id, space_id
        `, [factData.saying])
            .then((data) => {
                console.log(data);
                console.log("you did the thing! good job.");
                console.log(`new comment id is ${data.id}`);
                return data.id;
            })
        // and return the id of the new fact
    }

    static getById(id) {
        console.log(id)
        return db.any(`select * from facts where id=${id}`)
            
            .then((arrayOfFacts) => {
        
                //console.log(arrayOfComments);
                return arrayOfFacts.map((factData) => {
                    const theFacts = new Facts(
                        factData.id,
                        factData.saying
                        
                    );
                    return theFacts;
                });
            })
        // .catch(() => {
        //     return null;
       
    }
    static getRandom(saying) {
        console.log(saying)
        return db.one(`select * from facts order by random() limit 1;`)
    }

    static getAll() {
        return db.any(`select * from facts`)
            .then((arrayOfFacts) => {
                //console.log(arrayofComments)
                return arrayOfFacts.map((factData) => {
                    const aFact = new Fact (
                        factData.id,
                        factData.saying,
                        );
                    return aFact;
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
        update facts set 
            saying='${this.saying}',
        where id=${this.id}
        `);
    }

}

module.exports = Facts;