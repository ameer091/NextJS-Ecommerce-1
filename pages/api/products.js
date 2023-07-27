import mongoose from 'mongoose';
import Product from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose"
{/*Thie is where I choose to use mongoose as the database*/}
export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if(method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}))
    } else {
      res.json(await Product.find())
    }

  }

  if (method === 'POST') {
    const {title,description,price,images} = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images
    });
   res.json(productDoc);
  }

  if (method === 'PUT') {
    const {title,description,price,images,_id} = req.body;
    await Product.updateOne({_id}, {title:title, description:description, price, images})
    res.json(true);
  }

  if (method === 'DELETE') {
    if(req.query?.id) {
      {/*In the mongodata they use _id*/}
    await Product.deleteOne({_id:req.query?.id})
    res.json(true);
    }
}
}