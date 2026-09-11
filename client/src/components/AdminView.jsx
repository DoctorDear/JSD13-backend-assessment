import { useState } from "react";
import Table from "./Table";

const AdminView = ({
  products,
  createProduct,
  deleteProduct,
  updateProduct,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

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
  return (
    <div className="flex flex-col gap-8 my-6">
      <div className="flex flex-col items-start w-fit mx-auto gap-3">
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
            onChange={(e) => setPrice(e.target.value)}
            className="input validator"
          />
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input validator"
          />
          <button type="submit" className="btn bg-blue-500 text-white ">
            Create
          </button>
        </form>
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
