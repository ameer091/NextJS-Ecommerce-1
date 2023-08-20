import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import {DemoContext} from "@/contexts/demoContext";  // assuming you've stored it in contexts folder

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const demoData = useContext(DemoContext); // Get demo data from context
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      setProductInfo(demoData); // Set demo data if no ID is provided
      return;
    }
    axios.get('/api/products?id=' + id).then(response => {
      setProductInfo(response.data);
    })
  }, [id, demoData]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
