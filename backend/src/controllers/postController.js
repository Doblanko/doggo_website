const path = require('path');
/**
 * Subsequent require('mongoose') call. Not the first.
 * The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 * you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 * On subsequent calls, it will return the same instance that was created and returned to you the first
 * time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');

const Post = mongoose.model('Post');

const savePost = (req, res, next) => {
  // create a new post with the Post Model
  const newPost = new Post({
    user: 'GET THE USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
    caption: req.body.caption,
  });

  newPost
    .save()
    .then((post) => {
      // check if no files found
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      /**
       * The name of the input field (i.e. "sampleFile") is used to retrieve the
       * upload file.
       * For some reason it always names the single file as "file" so I switched
       * it
       */
      const img = req.files.file;

      const uploadPath = path.join(
        __dirname,
        '..',
        '..',
        'content',
        post._id.toString()
      );

      // Use the mv() method to place the file somewhere on your server
      img.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.send('File Uploaded!');
      });
    })
    .catch(next);
};

module.exports.savePost = savePost;
