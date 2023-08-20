// import mongoose from 'mongoose';
// import Product from "@/models/Product";
// import {mongooseConnect} from "@/lib/mongoose"
// import {getServerSession} from "next-auth"
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]"
// {/*Thie is where I choose to use mongoose as the database*/}
// export default async function handle(req, res) {
//   const {method} = req;
//   await mongooseConnect();
//   await isAdminRequest(req, res)

//   if(method === 'GET') {
//     if (req.query?.id) {
//       res.json(await Product.findOne({_id:req.query.id}))
//     } else {
//       res.json(await Product.find())
//     }

//   }

//   if (method === 'POST') {
//     const {title,description,price,images,category,properties} = req.body;
//     const productDoc = await Product.create({
//       title,
//       description,
//       price,
//       images,
//       category,
//       properties,
//     });
//    res.json(productDoc);
//   }

//   if (method === 'PUT') {
//     const {title,description,price,images,category,properties,_id,} = req.body;
//     await Product.updateOne({_id}, {title:title, description:description, price, images,category, properties})
//     res.json(true);
//   }

//   if (method === 'DELETE') {
//     if(req.query?.id) {
//       {/*In the mongodata they use _id*/}
//     await Product.deleteOne({_id:req.query?.id})
//     res.json(true);
//     }
// }
// }

// export default async function handle(req, res) {
//   const {method} = req;
//   await mongooseConnect();

//   try {
//     // Throws an error if the request is not from an admin
//     await isAdminRequest(req, res)
//   } catch(err) {
//     // The error has already been handled and response has been sent by isAdminRequest
//     return;
//   }

//   if(method === 'GET') {
//     if (req.query?.id) {
//       return res.json(await Product.findOne({_id:req.query.id}))
//     } else {
//       return res.json(await Product.find())
//     }
//   }

//   if (method === 'POST') {
//     const {title,description,price,images,category,properties} = req.body;
//     const productDoc = await Product.create({
//       title,
//       description,
//       price,
//       images,
//       category,
//       properties,
//     });
//     return res.json(productDoc);
//   }

//   if (method === 'PUT') {
//     const {title,description,price,images,category,properties,_id,} = req.body;
//     await Product.updateOne({_id}, {title:title, description:description, price, images,category, properties})
//     return res.json(true);
//   }

//   if (method === 'DELETE') {
//     if(req.query?.id) {
//       await Product.deleteOne({_id:req.query?.id})
//       return res.json(true);
//     }
//   }

//   // For all other cases, send a 400 status code
//   res.status(400).json({ error: 'Invalid request method' });
// }




//The following code was created so that users other than me, the admin, can use and access it.
import Product from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose"

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  switch (method) {
    case 'GET':
      if (req.query?.id) {
        const product = await Product.findOne({_id: req.query.id});
        return res.json(product);
      } else {
        const products = await Product.find();
        return res.json(products);
      }

    case 'POST': {
      const {title, description, price, images, category, properties} = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
      });
      return res.json(productDoc);
    }

    case 'PUT': {
      const {title, description, price, images, category, properties, _id} = req.body;
      await Product.updateOne({_id}, {
        title,
        description,
        price,
        images,
        category,
        properties
      });
      return res.json(true);
    }

    case 'DELETE':
      if(req.query?.id) {
        await Product.deleteOne({_id: req.query?.id});
        return res.json(true);
      }
      break;

    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
