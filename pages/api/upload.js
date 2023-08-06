{/*This is where I first used and added multiparty from yarnpkg */}
import multiparty from "multiparty";
{/* This is where I connected to the S3 bucket that I created using aws.  The package that add to the next project is yarn add @aws-sdk/client-s3 */ }
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import fs from 'fs'
{/* mime is what we are using to check the type of media file we are dealing with.  Specicially in this case, we are checking to see what type of image file we are dealing with */}
import mime from 'mime-types'
import {mongooseConnect} from "@/lib/mongoose"
import {getServerSession} from "next-auth"
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]"

const bucketName = 'ameer-nextjs-ecommerce'

{/*This is also where I first used AWS S3 buckets */}

export default async function handle(req, res) {
  await mongooseConnect()
  await isAdminRequest(req, res)

  const form =  new multiparty.Form();
  const {fields,files} = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) reject(err);
      resolve({fields, files});
    })
  })

  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  })
  {/* The const links is in case we are dealing with multiple links, we need somewhere to push them all */}
  const links = [];
  {/*The following for loop is so that we can change the file name from the original name of all of the images that we get from the upload.  The reason we do this is because we dont want the file name to be the same because it can cause errors, so we are changing the name of what is uploaded to be something random whenever it is uploaded to avoid the issue */ }
  for (const file of files.file) {
    {/* The following const is to find the extension of the file, so to look for .jpg, .jpeg, etc*/ }
    const ext = file.originalFilename.split('.').pop()
    {/* The following is to find the date of when the file is uploaded and then create a string based on the date.  There are other options that we could try, but this should ensure that the string that is created is different every time because the time and date should not be the same.  You can add more to make it more unique, but I believe that this should be fine*/}
    const newFileName = Date.now() + '.' + ext
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
      ContentType: mime.lookup(file.path),
    }))
    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    links.push(link);
  }

 ;
  return res.json({links})
}

{/* We are telling it not to parse our request, we want to parse it ourselves */}

export const config = {
  api: {bodyParser:false},
}