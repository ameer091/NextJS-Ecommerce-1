import {useState, useEffect} from "react";
import {useRouter} from "next/router"
import axios from "axios";
import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"
import {ReactSortable} from "react-sortablejs"

export default function ProductForm({
  _id,
   title:existingTitle,
    description:existingDescription,
     price:existingPrice,
      images:existingImages,
      category:assignedCategory,
      properties:assignedProperties,
    }){
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [images, setImages] = useState(existingImages || []);
  const [price,setPrice] = useState(existingPrice || '');
  const [goToProducts,setGoToProducts] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/categories'). then(result => {
      setCategories(result.data);
    })
  }, []);
  async function saveProduct(ev){
    {/*I am using preventDefault because the default behavior of the form is use a get request and past everything to the url and in this case I don't want to do that */}
    ev.preventDefault();
    const data = {title, description, price, images, category, properties: productProperties };
    if (_id) {
      //update
      await axios.put('/api/products', {...data,_id});
    } else {
      //create
      {/*I used yard import axios for the api instead of the normal fetch that I do*/}
   await axios.post('/api/products', data);
     {/*This next part redirects to the products page.  It is initally set to false as we defined earlier, but we then want it to be true */}

    }
    setGoToProducts(true);

  }

  if (goToProducts) {
    router.push('/products')
  }


  async function uploadImages(ev) {
    const files = ev.target?.files;
    if(files?.length > 0) {
      {/*The following is to check if an image is being uploaded and then to show the following while it is being uploaded*/}
      setIsUploading(true);
      {/*The following is to upload the image in a way that is different from JSON*/}
     const data = new FormData();
     for (const file of files) {
      data.append('file', file)
     }
     const res = await axios.post('/api/upload', data);
     setImages(oldImages => {
      {/*The following is to create a new array with all of images and new links*/}
      return [...oldImages, ...res.data.links]
     })
     {/*The following resets the uploading to false once it has finished uploading*/}
     setIsUploading(false);
  }
}

function updateImagesOrder(images) {
 setImages(images);
}

function setProductProp(propName, value) {
  setProductProperties(prev => {
    const newProductProps = {...prev};
    newProductProps[propName] = value;
    return newProductProps;
  })
}

const propertiesToFill = [];
//category is an id in this case
//Of the array of objects of the categories
//
if(categories.length > 0 && category) {
  //let is very important here instead of const
  let catInfo = categories.find(({_id}) => _id === category);
  propertiesToFill.push(...catInfo.properties);
  while(catInfo?.parent?._id){
    const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
    propertiesToFill.push(...parentCat.properties);
    catInfo = parentCat;
  }
}

 return (
      <form onSubmit={saveProduct}>

      <label>Product name</label>
      <input type="text" placeholder="product name" value={title} onChange={event => setTitle(event.target.value)}/>
      <label>Category</label>
      <select value={category} onChange={ev => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <div className=''>
          {/*This label is a roundabout way to capitalize the first letter of each label and then print the rest of the word*/}
          <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
          <div>
          <select value={productProperties[p.name]} onChange={ev => setProductProp(p.name, ev.target.value)}>
           {p.values.map(v => (
            <option value={v}>{v}</option>
           ))}
          </select>
          </div>

        </div>
      )
      )}


      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {/*This is what I am using to move the images around the dom.  I got a package from yarn add react-sortablejs and it can help us do that */}
        <ReactSortable
        list={images}
        className="flex flex-wrap gap-1"
        setList={updateImagesOrder}>
        {/*I added the following images part, but the rest is mostly from heroicons.  I added to check if there image and look through them using map.  !! is for boolean false if the legnth is 0*/}
        {!!images?.length && images.map(link => (
          //The reason I am adding a key to this div is because each child in a list should have a unique "key" prop. Also be very careful of comments in js.  The reason I was getting an error is because I was using the {/*  */} syntax instead of the double backslash//
          <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
            <img src={link} alt="" className="rounded-lg"/>
            </div>
        ))}
        </ReactSortable>
        {/*This part checks if the it is uploading an image and then does the following actions in that case */}
        {isUploading && (
          <div className = 'h-24 flex items-center'>
            <Spinner />
          </div>
        )}
        <label className='w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
<div>
Add Image
</div>
<input type="file" onChange={uploadImages} className="hidden" />


          </label>

      </div>
      <label>Description</label>
      <textarea placeholder="description" value={description} onChange={event => setDescription(event.target.value)}></textarea>
      <label>Price (in USD)</label>
      <input type="number" placeholder="price" value={price} onChange={event => setPrice(event.target.value)}/>
      <button className="btn-primary">Save</button>
      </form>

 )

}