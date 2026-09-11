import { useState } from "react";

const Table = ({ products, deleteProduct, updateProduct }) => {
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleEditClick = (mem) => {
    setEditId(mem.id);
    setEditFormData({
      name: mem.name,
      price: mem.price,
      quantity: mem.quantity,
    });
  };

  const handleSave = (id) => {
    updateProduct(id, editFormData);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th className="w-1/3">Name</th>
            <th className="w-1/3">Last Name</th>
            <th className="w-1/3">Position</th>
            {deleteProduct && <th className="w-1/4">Action</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((mem) => (
            <tr key={mem.id}>
              {editId === mem.id ? (
                <>
                  <td>
                    <input
                      className="input validator"
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input validator"
                      type="text"
                      value={editFormData.price}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          price: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input validator"
                      type="text"
                      value={editFormData.quantity}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <button
                        className="btn bg-green-700 text-white"
                        onClick={() => handleSave(mem.id)}
                      >
                        Save
                      </button>
                      <button className="btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{mem.name}</td>
                  <td>{mem.price}</td>
                  <td>{mem.quantity}</td>
                  {deleteProduct && (
                    <td>
                      <div className="flex gap-4">
                        <button
                          className="btn"
                          onClick={() => handleEditClick(mem)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn bg-red-600 text-white"
                          onClick={() => deleteProduct(mem.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
