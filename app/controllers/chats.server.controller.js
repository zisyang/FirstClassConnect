'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');
const Conversation = mongoose.model('Conversation'),
      Message = mongoose.model('Message'),
      User = mongoose.model('User');

/**
 * Get Conversations
 */
exports.getConversations = function(req, res, next) {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user.id })
    .select('id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      if(conversations.length===0) {
        return res.status(200).json({
           message: "No conversations yet"
         });
      }
      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(function(conversation) {
        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "firstName lastName"
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if(fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
  });
};

/**
 * get all the messages in a single conversation
 */
exports.getConversation = function(req, res, next) {
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'firstName lastName'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ conversation: messages });
    });
};

/**
 * new conversation
 */
exports.newConversation = function(req, res, next) {
  if(!req.params.recipient) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }

  if(!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient]
  });

  conversation.save(function(err, newConversation) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save(function(err, newMessage) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
      return next();
    });
  });
};

/**
 * Sending Reply
 */
exports.sendReply = function(req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  reply.save(function(err, sentReply) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    res.status(200).json({ message: 'Reply successfully sent!' });
    return(next);
  });
}

/**
 * Create a Chat
 */
exports.create = function(req, res) {
  return res.status(400).send({
    message: 'not implement yet'
  });
};

/**
 * Show the current Chat
 */
exports.read = function(req, res) {
  return res.status(400).send({
    message: 'not implement yet'
  });
};

/**
 * Update a Chat
 */
exports.update = function(req, res) {
  return res.status(400).send({
    message: 'not implement yet'
  });
};

/**
 * Delete an Chat
 */
exports.delete = function(req, res) {
  return res.status(400).send({
    message: 'not implement yet'
  });
};

/**
 * List of Chats
 */
exports.list = function(req, res) {
  return res.status(400).send({
    message: 'not implement yet'
  });
};
