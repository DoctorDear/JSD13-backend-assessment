import { useState } from "react";
import Table from "./Table";

const AdminView = ({
  products,
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct({
      name: name,
      price: price,
      quantity: quantity,
    });
    setName("");
    setPrice("");
    setQuantity("");
  };

  const handleSeach = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchProducts("");
  };

  return (
    <div className="flex flex-col gap-8 my-6">
      <div className="flex flex-col items-start w-fit   gap-6">
        <div className="flex flex-col items-start  gap-3">
          <h2 className="font-bold text-lg text-black">Add New Product</h2>
          <form onSubmit={handleSubmit} className="flex justify-center gap-4">
            <input
              className="input validator"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              min="0"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || Number(val) >= 0) {
                  setPrice(val);
                }
              }}
              className="input validator"
            />
            <input
              type="number"
              placeholder="Quantity"
              min="0"
              value={quantity}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || Number(val) >= 0) {
                  setQuantity(val);
                }
              }}
              className="input validator"
            />
            <button type="submit" className="btn bg-blue-500 text-white ">
              Create
            </button>
          </form>
        </div>
        <div className="flex flex-col items-start  gap-3">
          <h2 className="font-bold text-lg text-black">Search Product</h2>
          <form
            onSubmit={handleSeach}
            className="flex justify-center items-center gap-3"
          >
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input validator"
            />
            <button className="btn bg-blue-600 text-white">Search</button>
            {searchTerm && (
              <button type="button" onClick={handleReset} className="btn">
                clear
              </button>
            )}
          </form>
        </div>
      </div>
      <Table
        products={products}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct}
      />
    </div>
  );
};
export default AdminView;
