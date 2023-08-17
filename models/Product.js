import mongoose from'mongoose';
import {Schema, model, models} from'mongoose';

const ProductSchema = new Schema({
 title: {type: String, required: true},
 description: String,
 price: {type: Number, required: true},
 images: [{type:String}],
 category: {type:mongoose.Types.ObjectId, ref: 'Category'},
 properties: {type:Object},
}, {
  timestamps: true,
});

let Product;

try {
  // Check if the model is already defined
  Product = model('Product');
} catch (error) {
  // If the model is not defined, create it
  Product = model('Product', ProductSchema);
}

export default Product;