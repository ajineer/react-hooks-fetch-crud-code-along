//import { body } from "msw/lib/types/context";
import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleAddCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method:"PATCH",
      headers:{
        "Content-Type" : "application/json",
      }, body: JSON.stringify({
        isInCart: !item.isInCart,
      })
    }).then(r => r.json())
    .then((updatedItem) => {onUpdateItem(updatedItem)})
  }

  function handleDeleteClick(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "DELETE"
    })
      .then((r)=>{r.json()})
      .then(()=> onDeleteItem(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button 
      onClick={handleDeleteClick}
      className="remove">Delete</button>
    </li>
  );
}

export default Item;
