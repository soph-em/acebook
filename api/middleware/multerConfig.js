const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
    // Set desitnation file
    destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
    },
    // Specify how the uploaded files should be named
    filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
    },
});

// Create the multer instance with the defined storage configuration
const upload = multer({ storage: storage });

module.exports = upload;

// ref: https://expressjs.com/en/resources/middleware/multer.html