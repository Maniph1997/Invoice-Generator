// import React from "react";
// import "./homepage.css";

// const Homepage =()=>{
//     return (
//        <div>AddProduct</div>
//     )
// }

// export default Homepage

import React, { useState } from 'react';
import "./homepage.css";
import jsPDF from 'jspdf';

function Homepage() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);

  const addItem = () => {
    const newItem = {
      product,
      quantity,
      rate,
      total: quantity * rate,
    };

    setItems([...items, newItem]);
    setProduct('');
    setQuantity(0);
    setRate(0);
  };

  const calculateTotal = () => {
    let total = items.reduce((sum, item) => sum + item.total, 0);
    return total + total * 0.18; // Adding 18% GST
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 10, 10);

    items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.product} - ${item.quantity} x $${item.rate} = $${item.total}`, 10, 20 + index * 10);
    });

    doc.text(`Total (including 18% GST): $${calculateTotal().toFixed(2)}`, 10, 20 + items.length * 10);
    doc.save('invoice.pdf');
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      <div>
        <label>Product:</label>
        <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div>
        <label>Rate:</label>
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      <button onClick={addItem}>Add Item</button>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
}

export default Homepage;


