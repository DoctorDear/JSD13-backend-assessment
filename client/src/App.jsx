import { useEffect, useState } from "react";
import AdminView from "./components/AdminView";
const API_URL = `${import.meta.env.VITE_API_URL}/products`;

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (name = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = name ? `${API_URL}?name=${name}` : API_URL;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetch data", error);
      setError("Cannot connect server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts([...products, data]);
    } catch (error) {
      console.error("Error creating products", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((mem) => mem.id !== id));
    } catch (error) {
      console.error("Error removing product", error);
    }
  };

  const updateProduct = async (id, updateData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      setProducts(products.map((mem) => (mem.id === id ? data : mem)));
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-200">
      <div className="container mx-auto p-6 text-center">
        {loading && (
          <p className="text-blue-600 font-semibold my-4">loading...</p>
        )}
        {error && <p className="text-red-600 font-semibold my-4">{error}</p>}
        <AdminView
          products={products}
          fetchProducts={fetchProducts}
          createProduct={createProduct}
          deleteProduct={deleteProduct}
          updateProduct={updateProduct}
        />
      </div>
    </div>
  );
};
export default App;
