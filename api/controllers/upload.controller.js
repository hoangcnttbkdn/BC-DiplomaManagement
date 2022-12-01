const { StatusCodes } = require('http-status-codes');
const { s3Client } = require('../configs/s3');

const uploadController = {
  upload: async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Image is required' });
      }
      const stored = await s3Client
        .upload({
          Bucket: process.env.AWS_BUCKET,
          Key: `${Date.now()}-${Math.floor(Math.random() * 10000)}.png`,
          Body: req.file.buffer,
        })
        .promise();
      res.status(StatusCodes.OK).json({ url: stored['Location'] });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
};

module.exports = { uploadController };
