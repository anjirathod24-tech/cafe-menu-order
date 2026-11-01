import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import "./App.css";

import cappuccino from "./assets/images/cappuccino.jpg";
import coldCoffee from "./assets/images/cold-coffee.jpg";
import sandwich from "./assets/images/sandwich.jpg";
import masalaTea from "./assets/images/masala-tea.jpg";
import brownie from "./assets/images/brownie.jpg";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const getFoodImage = (item) => {
  const name = item.name.toLowerCase();

  if (name.includes("cappuccino")) return cappuccino;
  if (name.includes("cold coffee")) return coldCoffee;
  if (name.includes("sandwich")) return sandwich;
  if (name.includes("masala tea") || name.includes("tea"))
    return masalaTea;
  if (name.includes("brownie")) return brownie;

  return cappuccino;
};

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch menu items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/api/menu`);

        setMenuItems(response.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load menu items. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Get categories
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  // Search, filter and sort
  const filteredMenu = menuItems
    .filter((item) => item.available)
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedCategory === "All"
        ? true
        : item.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  // Add item to cart
  const addToCart = (item) => {
    console.log("Add to Cart clicked:", item);

    setError("");
    setMessage(`${item.name} added to your cart!`);

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (cartItem) => cartItem._id === item._id
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = previousCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      } else {
        updatedCart = [
          ...previousCart,
          {
            ...item,
            quantity: 1,
          },
        ];
      }

      console.log("Updated cart:", updatedCart);

      return updatedCart;
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item._id !== id)
    );
  };

  // Calculate total amount
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (cart.length === 0) {
      setError("Please add items to your cart first.");
      return;
    }

    if (!customerName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setPlacingOrder(true);

    try {
      const orderData = {
        customerName: customerName.trim(),
        phone,
        items: cart.map((item) => ({
          menuItem: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await axios.post(
        `${API_URL}/api/orders`,
        orderData
      );

      setMessage(
        `Order placed successfully! Your Order ID is: ${response.data.data._id}`
      );

      // Clear cart only after successful order
      setCart([]);
      setCustomerName("");
      setPhone("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  const menuUrl = window.location.origin;

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <h2> Cafe Delight</h2>

        <button
          type="button"
          className="cart-btn"
          onClick={() =>
            document
              .getElementById("cart-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          🛒 Cart ({totalItems})
        </button>
      </header>

      {/* QR Code */}
      <section className="qr-section">
        <h2>Scan & Order</h2>

        <p>
          Scan this QR code to explore our cafe menu
          and place your order.
        </p>

        <div className="qr-code">
          <QRCodeSVG value={menuUrl} size={180} level="H" />
        </div>

        <p className="qr-text">Scan with your mobile camera</p>
      </section>

      {/* Hero */}
      <section className="hero">
        <h1>Welcome to Cafe Delight</h1>
        <p>Fresh Coffee, Delicious Food & Sweet Moments</p>
      </section>

      {/* Menu */}
      <section className="menu-section">
        <h2>Our Menu</h2>
        <p>Explore our delicious food and beverages.</p>

        <div className="menu-filters">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {loading && <h3>Loading menu...</h3>}

        {!loading && !error && (
          <div className="menu-container">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <div className="menu-card" key={item._id}>
                  <img
                    src={item.image || getFoodImage(item)}
                    alt={item.name}
                    className="menu-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFoodImage(item);
                    }}
                  />

                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <h4>₹{item.price}</h4>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No menu items found.</p>
            )}
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </section>

      {/* Cart */}
      <section className="cart-section" id="cart-section">
        <h2>Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h3 className="cart-total">
              Total: ₹{totalAmount}
            </h3>

            <div className="checkout-form">
              <h2>Checkout Details</h2>

              <form onSubmit={handlePlaceOrder}>
                <div className="form-group">
                  <label htmlFor="customerName">
                    Customer Name
                  </label>

                  <input
                    id="customerName"
                    type="text"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Mobile Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={placingOrder}
                >
                  {placingOrder
                    ? "Placing Order..."
                    : "Place Order"}
                </button>
              </form>
            </div>
          </>
        )}

        {message && (
          <p className="success-message">{message}</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}
      </section>
    </div>
  );
}

export default App;
