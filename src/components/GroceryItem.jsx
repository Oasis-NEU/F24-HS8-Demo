function GroceryItem({ item, deleteItem }) {
  return (
    <li
      style={{ cursor: 'pointer', textDecoration: 'none' }}
      onMouseOver={(e) => (e.target.style.textDecoration = 'line-through')}
      onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
      onClick={() => deleteItem(item.id)}
    >
      {item.name}
    </li>
  );
}

export default GroceryItem;
