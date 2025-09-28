import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { fetchJSON } from '../api/api';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function loadMenu() {
    const data = await fetchJSON('/menu');
    setItems(data);
  }

  useEffect(() => {
    loadMenu();
  }, []);

  const onSubmit = async (data) => {
    try {
      await fetchJSON('/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      toast.success('Menu item added');
      setShowForm(false);
      reset();
      loadMenu();
    } catch (err) {
      toast.error('Failed to add menu item');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Menu</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            <div className="font-semibold text-lg">{item.name}</div>
            <div className="text-gray-600">{item.description}</div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-lg font-medium">₹{item.price}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                item.available 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4">Add Menu Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register('name', { required: true })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  {...register('price', { required: true })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  {...register('category')}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}