import { useEffect, useState } from "react";
import AdminView from "./components/AdminView";
const API_URL = `${import.meta.env.VITE_API_URL}/products`;

const App = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("home");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetch data", error);
      }
    };
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      setProducts(products.map((mem) => (mem.id === id ? data : mem)));
    } catch (error) {
      console.error("Error updating member", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-200">
      <div className="container mx-auto p-6 text-center">
        {view !== "owner" && (
          <div className="text-3xl font-bold">
            <h1>Generation Thailand</h1>
          </div>
        )}
        {view === "home" && (
          <div className="text-2xl font-medium">
            <h1>React - Assessment</h1>
          </div>
        )}
        {view === "admin" && (
          <div className="text-2xl font-medium">
            <h1>Home - Admin Section</h1>
          </div>
        )}
        {view !== "owner" && (
          <div className="flex justify-center gap-10 m-8">
            <div className="btn">
              <button onClick={() => setView("user")}>User Home Section</button>
            </div>
            <div className="btn">
              <button onClick={() => setView("admin")}>
                Admin Home Section
              </button>
            </div>
          </div>
        )}
        {view === "owner" && (
          <div className="flex flex-col gap-6">
            <h1 className="font-bold text-3xl">
              11 Chirasak Tapphae (เดียร์) - JSD13
            </h1>
            <div className="avatar">
              <div className="w-60 rounded">
                <img
                  alt="Owner-Profile-Picture"
                  src="src\assets\Owner-pic.jpg"
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold mt-3">Short Biography:</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                laboriosam magni nemo quam nostrum atque, molestiae, ut corrupti
                ducimus corporis ab nobis nesciunt? Esse placeat maxime
                dignissimos molestias consequatur fugiat.
              </p>
            </div>
          </div>
        )}
        {view === "admin" && (
          <AdminView
            products={products}
            createProduct={createProduct}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
          />
        )}
      </div>
    </div>
  );
};
export default App;
