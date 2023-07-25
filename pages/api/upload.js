{/*This is where I first used and added multiparty from yarnpkg */}
import multiparty from "multiparty";

{/*This is also where I first used AWS S3 buckets */}

export default async function handle(req, res) {
  const form =  new multiparty.Form();
  const {fields,files} = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) reject(err);
      resolve(fields, files);
    })
  })
}

{/* We are telling it not to parse our request, we want to parse it ourselves */}

export const config = {
  api: {bodyParser:false},
}