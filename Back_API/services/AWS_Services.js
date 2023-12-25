const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();

const BUCKET_NAME=process.env.AWS_S3_BUCKET_NAME;
const IAM_USER_KEY=process.env.AWS_S3_IAM_USER_KEY;
const IAM_USER_SECRET=process.env.AWS_S3_IAM_USER_SECRET;


const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET
  },
});


exports.uploadToS3 = async (image, filename) => {
    try {
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: image,
            ACL: "public-read",
            ContentType: "image/jpeg",
          };
          const data = await s3Client.send(new PutObjectCommand(uploadParams));
          const publicUrl = `https://${uploadParams.Bucket}.s3.ap-south-1.amazonaws.com/${uploadParams.Key}`;
          return publicUrl;
          
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
}

