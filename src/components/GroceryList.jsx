import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import GroceryItem from './GroceryItem.jsx';
import AddItemForm from './AddItemForm.jsx';

function GroceryList() {
  const [items, setItems] = useState([]);

  // Fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch items from Supabase
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('groceries')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching groceries:', error);
    } else {
      setItems(data);
    }
  };

  // Function to add a new item
  const addItem = async (name) => {
    if (name.trim()) {
      const { data: newItem, error } = await supabase
        .from('groceries')
        .insert([{ name }])
        .select()
        .single();

      if (error) {
        console.error('Error adding grocery:', error);
      } else {
        setItems((prevItems) => [...prevItems, newItem]);
      }
    }
  };

  // Function to delete an item
  const deleteItem = async (id) => {
    const { error } = await supabase
      .from('groceries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting grocery:', error);
    } else {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <AddItemForm addItem={addItem} />
      <ul>
        {items.map((item) => (
          <GroceryItem key={item.id} item={item} deleteItem={deleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
