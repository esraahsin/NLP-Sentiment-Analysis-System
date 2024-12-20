import React from "react";
import picr1 from "./picrs/picr1.jpeg";
import picr2 from "./picrs/picr2.jpeg";
import picr3 from "./picrs/pic3.jpeg";
import picr4 from "./picrs/picr4.jpeg";

export default function ProductsSection() {
    const products = [
        { id: 1, discount: "-10%", img: picr1, price: "13.5 DTN", oldPrice: "15 DTN" },
        { id: 2, discount: "-5%", img: picr2, price: "19 DTN", oldPrice: "20 DTN" },
        { id: 3, discount: "-5%", img: picr3, price: "19 DTN", oldPrice: "20 DTN" },
        { id: 4, discount: "-20%", img: picr4, price: "16 DTN", oldPrice: "20 DTN" },
    ];

    return (
      <section className="products" id="products">
        <h1 className="heading">latest <span>products</span></h1>
        <div className="box-container">
          {products.map(product => (
            <div className="box" key={product.id}>
              <span className="discount">{product.discount}</span>
              <div className="image">
                <img src={product.img} alt="Product" />
                <div className="icons">
                  <a href="#" className="fas fa-heart"></a>
                  <a href="#" className="cart-btn">add to cart</a>
                  <a href="#" className="fas fa-share"></a>
                </div>
              </div>
              <div className="content">
                <h3>flower pt</h3>
                <div className="price">{product.price} <span>{product.oldPrice}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  