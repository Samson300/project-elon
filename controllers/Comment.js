const commentModel = require('../models/Comment');

const Comment = {
//   /**
//    * 
//    * @param {object} req 
//    * @param {object} res
//    * @returns {object} reflection object 
//    */
  create(req, res) {
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const comment = commentModel.create(req.body);
    return res.status(201).send(comment);
  },
//   /**
//    * 
//    * @param {object} req 
//    * @param {object} res 
//    * @returns {object} reflections array
  // */
  getAll(req, res) {
    const comments = commentModel.findAll();
    return res.status(200).send(comments);
  },
//   /**
//    * 
//    * @param {object} req 
//    * @param {object} res
//    * @returns {object} reflection object
//    */
  getOne(req, res) {
    const comment = commentModel.findOne(req.params.id);
    if (!comment) {
      return res.status(404).send({'message': 'comment not found'});
    }
    return res.status(200).send(comment);
  },
//   /**
//    * 
//    * @param {object} req 
//    * @param {object} res 
//    * @returns {object} updated reflection
//    */
  update(req, res) {
    const comment = commentModel.findOne(req.params.id);
    if (!comment) {
      return res.status(404).send({'message': 'Comment not found'});
    }
    const updatedComment = commentModel.update(req.params.id, req.body)
    return res.status(200).send(updatedComment);
  },
//   /**
//    * 
//    * @param {object} req 
//    * @param {object} res 
//    * @returns {void} return statuc code 204 
//    */
  delete(req, res) {
    const comment = commentModel.findOne(req.params.id);
    if (!comment) {
      return res.status(404).send({'message': 'comment not found'});
    }
    const ref = commentModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}

module.exports = Comment;