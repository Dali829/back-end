import React from "react";
import './productCart.css'
function productGrid(props)
{
    return <>
    <div className="container-fluid">
        <div className="row p-2">
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Description</th>
      <th scope="col">Price Per Unit</th>
      <th scope="col">Quantity </th>
      <th scope="col">SubTotal Price </th>
    </tr>
  </thead>
  <tbody>
    {props.items.map((item,index)=>{
      return  <tr>
            <td><img src={props.products[index].productImage} alt="" className="productImage" /></td>
            <td>{props.products[index].productName}</td>
            <td>{props.products[index].productDescription}</td>
            <td>{props.products[index].unitPrice}</td>
            <td>{item.productCount}</td>
            <td>{parseFloat(item.productCount)*parseFloat(props.products[index].unitPrice) } DT</td>
        </tr>
    })}
  </tbody>
</table>
</div>
</div></>
}
export default productGrid;