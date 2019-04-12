const db = require('./conn');

const bcrypt = require('bcryptjs');

class User {
    constructor(id, first_name, last_name, account_name, email, password) {
        // In JavaScript, we say "this"
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.accountName = account_name;
        this.email = email;
        this.password = password;
    }
    
    static delete(id) {
        return db.result('delete from users where id=$1', [id]);
    }

    static add(userData) {
        // do an insert into the database
        // using ($) so that pg-promise does *safe* interpolation
        return db.one(`
            insert into users 
                (first_name, last_name, account_name, email, password)
            values 
                ($1, $2, $3, $4, $5)
            returning id, first_name, last_name
        `, [userData.first_name, userData.last_name, userData.account_name, userData.email, userData.password])
        .then((data) => {
            console.log(data);
            console.log("you did the thing! good job.");
            console.log(`new user id is ${data.id}`);
            return data.id;
        })
        // and return the id of the new user
    }

    // "static" means that the function is something
    // the class can do, but an instance cannot.
    static getById(id) {
        // .any always returns an array
        // Instead, we'll use .one
        return db.one(`select * from users where id=${id}`)
                    .then((userData) => {
                        // You *must* use the `new` keyword
                        // when you call a JavaScript constructor
                        const userInstance = new User(userData.id, 
                                                      userData.first_name,
                                                      userData.last_name,
                                                      userData.account_name,
                                                      userData.email,
                                                      userData.password
                                                     );
                        return userInstance;
                    })
                    .catch(() => {
                        return null; // signal an invalid value
                    })
    }

    static getAll() {
        return db.any(`select * from users`)
                .then((arrayOfUsers) => {
                    return arrayOfUsers.map((userData) => {
                        const aUser = new User(
                                                userData.id, 
                                                userData.first_name, 
                                                userData.last_name, 
                                                userData.account_name,
                                                userData.email, 
                                                userData.password);
                        return aUser;
                    })
                })
    }

    // no "static" since this is an "instance method"
    // (it belongs to the individual instance)
    save() {
        // use .result when you might want a report about
        // how many rows got affected
        return db.result(`            
        update users set 
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            account_name='${this.accountName}',
            email='${this.email}',
            password='${this.password}'
        where id=${this.id}
        `);
    }

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
        console.log(this.password);
    }

    static getByEmail(email) {
        console.log(email)
        return db.one(`select * from users where email=$1`, [email])
            .then(userData => {
                const aUser = new User(
                    // userData.id, 
                    // userData.first_name, 
                    // userData.last_name,
                    // userData.account_name, 
                    // userData.email, 
                    // userData.password);
                    // return aUser;
                
                    userData.id,
                    userData.first_name,
                    userData.last_name,
                    userData.account_name,
                    userData.email,
                    userData.password);
                return aUser;
            }).catch((error) => {
                console.log(error);
            });
    }

    checkPassword(aPassword) {
        // const isCorrect = bcrypt.compareSync(aPassword, this.password);
        return bcrypt.compareSync(aPassword, this.password);
    }

    // get all reviews written by this user
    // getReviews() {
    // get comments() {
    //     return db.any(`select * from comments where user_id=${this.id}`)
    //             .then((arrayOfCommentData) => {
    //                 // Equivalent to using .map
    //                 const arrayOfCommentInstances = [];

    //                 arrayOfCommentData.forEach((data) => {
    //                     const newInstance = new Review(
    //                         data.id,
    //                         data.content,
    //                         data.unicorn_id,
    //                         data.user_id,
    //                         data.place_id
    //                     );
    //                     arrayOfCommentInstances.push(newInstance);
    //                 });

    //                 return arrayOfCommentInstances;
    //             });
    //}

}

// User.getById(3)
//     .then((user) => {
//         console.log(user);
//     });

// export my User model


module.exports = User;
