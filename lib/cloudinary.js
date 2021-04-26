const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'eavior',
  api_key: '614671718647436',
  api_secret: 'm-Zjs6rAqbM9NnAiljEmDIMGU1U',
});

function uploadToCloudinary(filePath) {
  // e.g. "/public/18979813-12312.jpeg"
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}
exports.uploadToCloudinary = uploadToCloudinary;
