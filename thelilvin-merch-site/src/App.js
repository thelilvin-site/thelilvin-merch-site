
import React, { useState } from "react";

const productsData = [
  { id: 1, title: "Debut Album CD", price: 15.0, image: "/cd1.jpg" },
  { id: 2, title: "Limited Edition Vinyl", price: 25.0, image: "/vinyl1.jpg" },
  { id: 3, title: "Signed Poster", price: 10.0, image: "/poster1.jpg" },
];

export default function ThelilvinShop() {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);

  const changePrice = (id, newPrice) => {
    setProducts(products.map(p => p.id === id ? { ...p, price: parseFloat(newPrice) || 0 } : p));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <header style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ fontSize: 36, fontWeight: "bold" }}>Thelilvin</h1>
        <p style={{ color: "#e11d48" }}>Official merch shop — buy your favorite music & merch!</p>
      </header>

      <section>
        <h2 style={{ fontSize: 24, marginBottom: 15 }}>🔥 Featured Merch</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
          {products.map(product => (
            <div key={product.id} style={{ borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", padding: 15 }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
              />
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>{product.title}</h3>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontWeight: "bold", fontSize: 16, marginRight: 5 }}>$</span>
                <input
                  type="number"
                  value={product.price}
                  onChange={e => changePrice(product.id, e.target.value)}
                  style={{ width: 70, padding: 5, borderRadius: 6, border: "1px solid #ccc" }}
                />
              </div>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: "#ec4899",
                  color: "white",
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: 8,
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40, background: "#fff", padding: 20, borderRadius: 16, boxShadow: "0 6px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>🛒 Shopping Cart</h2>
        {cart.length === 0 ? (
          <p style={{ color: "#666" }}>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  padding: "10px 0",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold", marginBottom: 4 }}>{item.title}</p>
                  <p style={{ color: "#555" }}>
                    ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ec4899",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, fontWeight: "bold", fontSize: 18 }}>
              <div>Total:</div>
              <div>${total.toFixed(2)}</div>
            </div>
            <button
              style={{
                marginTop: 20,
                backgroundColor: "#ec4899",
                color: "white",
                width: "100%",
                padding: "12px 0",
                borderRadius: 12,
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => alert("Checkout coming soon!")}
            >
              Checkout
            </button>
          </>
        )}
      </section>
    </div>
  );
}
