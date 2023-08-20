import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import {DemoContext} from "@/contexts/demoContext";  // assuming you've stored it in contexts folder

// Using the id of the product to know the products name for later in the page
export default function DeleteProductPage() {
  const router = useRouter();
  const demoData = useContext(DemoContext); // Get demo data from context
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      setProductInfo(demoData); // Set demo data if no ID is provided
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id, demoData]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    if(productInfo === demoData) {
      alert("This is demo data. No need to delete!");
      goBack();
      return;
    }
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp; &quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}



