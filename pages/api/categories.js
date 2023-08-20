import {Category} from "@/models/Category"
import {mongooseConnect} from "@/lib/mongoose";
// import {getServerSession} from "next-auth"
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]"


export default async function handle(req, res) {
const {method} = req;
//In any function where you are using a database, be sure to connect to that database.  You have been making databases and not making sure that they are connected
await mongooseConnect();
//Check if we are logged in
// await isAdminRequest(req, res)

if (method === 'GET') {
  res.json( await Category.find().populate('parent'))
}
if (method === 'POST') {
  try{
  const {name, parentCategory, properties} = req.body;
  //The reason for the parent: parentCategory is because I named it parent on the Schema on Category.js
  if (!name || name.trim() === '') {
    return (res.status(400).json({ error: 'Name field is required' }));
  }
  const categoryDoc = await Category.create({
    name,
     parent: parentCategory === '' ? undefined:parentCategory,
      properties,
    });
  res.json(categoryDoc);
  } catch (err) {
    console.error(err);
    res.status(400).json({error: err.message});
  }
}

if (method === 'PUT') {
  const {name, parentCategory, properties, _id} = req.body;
  //We are checking to if the _id is from our request and if so then when want to update the name and the parent//
  if (!name || name.trim() === '') {
    return (res.status(400).json({ error: 'Name field is required' }));
  }
  const categoryDoc = await Category.updateOne({_id}, {name, parent: parentCategory === '' ? undefined:parentCategory, properties});
  res.json(categoryDoc);
}
if (method === 'DELETE') {
  const {_id} = req.query;
  await Category.deleteOne({_id})
  res.json('ok');
}
}