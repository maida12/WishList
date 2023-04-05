import React, { useState } from "react";
import './Wish.css';
function WishList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editPriority, setEditPriority] = useState("");

  function handleAddItem(event) {
    event.preventDefault();
    setItems([...items, { name: newItem, priority: newPriority }]);
    setNewItem("");
    setNewPriority("");
  }

  function handleRemoveItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function handleEditPriority(index) {
    setEditIndex(index);
    setEditPriority(items[index].priority);
  }

  function handleSavePriority(index) {
    const newItems = [...items];
    newItems[index].priority = editPriority;
    setItems(newItems);
    setEditIndex(-1);
  }

  function handleCancelEdit() {
    setEditIndex(-1);
  }
  function handleMoveToTop(index) {
    const newItems = [...items];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.unshift(itemToMove);
    setItems(newItems);
  }

  return (
    <div class="main">
        <h1>Welcome to My WishList</h1>
      <form onSubmit={handleAddItem}>
        <label id='lbl1' htmlFor="newItem">Item:</label>
        <input
          id="newItem"
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <label id='lbl2' htmlFor="newPriority">Priority:</label>
        <input
          id="newPriority"
          type="number"
          value={newPriority}
          onChange={(event) => setNewPriority(event.target.value)}
        />
        <button id ='btn1' type="submit">Add</button>
      </form>
     <hr></hr>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} (Priority: {" "}
            {editIndex === index ? (
              <>
                <input
                  type="number"
                  value={editPriority}
                  onChange={(event) => setEditPriority(event.target.value)}
                />
                <button class='button' onClick={() => handleSavePriority(index)}>Save</button>
                <button  class='button'onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
            
                {item.priority}
                <button class='button' onClick={() => handleEditPriority(index)}>Edit</button>
                <button class='button'onClick={() => handleRemoveItem(index)}>Remove</button>
                <button class='button'onClick={() => handleMoveToTop(index)}>Move to Top</button>
              </>
            )}
            )
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WishList;
