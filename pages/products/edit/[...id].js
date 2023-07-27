import Layout from "@/components/Layout"
import {useRouter} from "next/router"
import {useEffect} from "react"
import axios from "axios"
import ProductForm from "@/components/ProductForm"
import {useState} from "react"

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
   axios.get('/api/products?id='+id).then(response => {
    setProductInfo(response.data);
   })
  }, [id])

  return (
   <Layout>
    <h1>Edit Product</h1>
    {productInfo && (
      //Be careful, I had ProductForm on here twice, so it was doubling the product name, photos, description, price and save on the acutal page//
      <ProductForm {...productInfo} />
    )}
   </Layout>
  )
}