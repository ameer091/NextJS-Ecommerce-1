import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {withSwal} from 'react-sweetalert2';


function Categories({swal}){
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [properties, setProperties] = useState([])
  useEffect(() => {
   fetchCategories();

  }, []);
  function fetchCategories(){
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }
  /*async function saveCategory(ev){
    ev.preventDefault();
    const data = {name, parentCategory}
    if (editedCategory){
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('api/categories', data)
    }
    setName('');
    fetchCategories();
  }
*/
async function saveCategory(ev){
  ev.preventDefault();
// Prevent the form submission if the 'name' field is empty
// if (!name.trim()) {
//   swal.fire({
//     icon: 'error',
//     title: 'Oops...',
//     text: 'The name field cannot be empty!',
//   });
//   return;
// }

  const data = {
    name,
    parentCategory,
    properties: properties.map(p => ({name:p.name,values:p.values.split(',')}))};

  try {if (editedCategory){
    data._id = editedCategory._id;
    await axios.put('/api/categories', data);
    setEditedCategory(null);
  } else {
    await axios.post('/api/categories', data)
  }
  //All of the sets make it s that it changes it to the new information
  setName('');
  setParentCategory('');
  setProperties([]);
  fetchCategories();
} catch (error) {
  swal.fire({
    icon: 'error',
    title: 'An error occured',
    text: error.response?.data?.error || 'An unexpect error occured',
  })
}
}

  function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    //The parent in the following is because it is what it is names in the database
    setParentCategory(category.parent?._id);
    //The reason for the map is that when I do it without it, because it is an array of strings I get the error TypeError: p.values.split is not a function
    setProperties(
      category.properties.map(({name,values}) => ({
        name,
        values:values.join(',')
      }))
  );
    }
//Dont forget that in this case the paramet of category is an object//
  function deleteCategory(category){
    swal.fire({
      title: 'Are you sure',
      text: `Do you want to delete ${category.name}`,
      showCancelButton: true,
      //cancelButtonTitle: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
    }).then(async result => {
     if (result.isConfirmed){
      const {_id} = category;
      await axios.delete('/api/categories?_id='+_id);
      fetchCategories()
     }
    }).catch(error => {
      console.error("Error fetching categories:", error)
    })

  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'', values: ''}]
    })
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    })

  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    })

  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
    return [...prev].filter((p,pIndex) => {
      return pIndex !== indexToRemove
    })
    return newProperties;
    })
  }
  return (
    <Layout>
      <h1> Categories</h1>
      <label>{editedCategory ? `Edit category ${editedCategory.name}`: 'Create new category'}</label>
      <form onSubmit={saveCategory} >
        <div className="flex gap-1">
        <input type="text" placeholder={'Category name'} onChange={ev => setName(ev.target.value)} value={name}/>
      <select onChange={ev => setParentCategory(ev.target.value)} value={parentCategory}>
        <option value="">No parent category</option>
        {categories.length > 0 && categories.map(category => (
    <option key ={category._id} value={category._id}>{category.name}</option>
      ))}
      </select>
        </div>
      <div className="mb-2">
        <label className="block">Properties</label>
        <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">Add new property</button>
        {properties.length > 0 && properties.map((property, index) => (
          <div className='flex gap-1 mb-2'>
            <input type="text" value={property.name} className="mb-0" onChange={ ev => handlePropertyNameChange(index, property, ev.target.value)} placeholder="property name (example: color)"/>
            <input type="text" value={property.values} className="mb-0" onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)} placeholder="property name (values, comma separated)"/>
            <button type="button" className="btn-red" onClick={() => removeProperty(index)}>Remove</button>
            </div>
        ))}
        </div>
        <div className="flex gap-1">
        {editedCategory && (
          <button type='button'className="btn-default" onClick={() =>{setEditedCategory(null); setName(''); setParentCategory(''), setProperties([]);}}>Cancel </button>

        )}


      <button type="submit" className="btn-primary py-1">Save</button>
        </div>

   </form>
   {!editedCategory && (
    <table className="basic mt-4">
    <thead>
      <tr>
        <td>Category name</td>
        <td>Parent Category</td>
        <td></td>
      </tr>

    </thead>
    <tbody>
      {categories.length > 0 && categories.map(category => (
        <tr>
          <td>{category.name} </td>
          <td>{category?.parent?.name}</td>
          <td>
            <button onClick={() => editCategory(category)} className="btn-default mr-1"> Edit </button>
            <button onClick={() => deleteCategory(category)} className="btn-red"> Delete </button>
          </td>

        </tr>
      ))}
    </tbody>
   </table>

   )}


    </Layout>
  )

}
//withSwal does not require the function keyword//
//Additially, this was initially Categories, but when I got the reactsweet2 pkg, I changed it to an empty parenthesis and an arrow function//
export default withSwal (({swal}, ref) => (
  <Categories swal={swal}/>
));

