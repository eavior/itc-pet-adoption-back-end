const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'eavior',
  api_key: '614671718647436',
  api_secret: 'm-Zjs6rAqbM9NnAiljEmDIMGU1U',
});

function uploadToCloudinary(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      (options = { folder: 'pet_adoption_site' }),
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}
exports.uploadToCloudinary = uploadToCloudinary;
