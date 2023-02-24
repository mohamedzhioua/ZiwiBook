const multer = require("multer");

const multerStorage  = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   const fileRegex = new RegExp(".(jpg|jpeg|png)$");
//   const fileName = file.originalname;
//   if (!fileName.match(fileRegex)) {
//     //throw exception
//     return cb(new Error("Invalid file type"));
//   }
//   //pass the file
//   cb(null, true);
// };

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only images') )
  }
};

module.exports = multer({
  storage: multerStorage ,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: multerFilter,
}).single("image"); //single for accepting only one file from 'image' form-data key
