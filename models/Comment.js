const db = require('./conn');
const Users = require('./users');
const Space = require('./space');

const moment = require('moment');
const uuid = require('uuid');

class Comment {
    // /** 
    // * class constructor
    // * @param {object} data
    // */
    constructor() {
        this.comments = [];
    }
    // /**
    //  * 
    //  * @returns {object} comment object
    //  */
    create(data) {
        const newComment = {
            id: uuid.v4(),
            success: data.success || '',
            lowPoint: data.lowPoint || '',
            takeAway: data.takeAway || '',
            createdDate: moment.now(),
            modifiedDate: moment.now()
        };
        this.comments.push(newComment);
        return newComment
    }
    // /**
    //  * 
    //  * @param {uuid} id
    //  * @returns {object} comment object
    //  */
    findOne(id) {
        return this.comments.find(comment => comment.id === id);
    }
    // /**
    //  * @returns {object} returns all reflections
    //  */
    findAll() {
        return this.comments;
    }
//     /**
//    * 
//    * @param {uuid} id
//    * @param {object} data 
//    */
    update(id, data) {
        const comment = this.findOne(id);
        const index = this.comments.indexOf(comment);
        this.comments[index].success = data['success'] || comment.success;
        this.comments[index].lowPoint = data['lowPoint'] || comment.lowPoint;
        this.comments[index].takeAway = data['takeAway'] || comment.takeAway;
        this.comments[index].modifiedDate = moment.now()
        return this.comments[index];
    }
  /**
   * 
   * @param {uuid} id 
   */
    delete(id) {
        const comment = this.findOne(id);
        const index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
        return {};
    }
}
module.exports = new Comment();
