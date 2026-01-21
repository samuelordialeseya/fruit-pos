import { useState, useEffect } from "react";
import "@fontsource/poppins";

function App() {
  const [fruits, setFruits] = useState(() => {
    const saved = localStorage.getItem("fruits");
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [customer, setCustomer] = useState("");
  const [completedOrders, setCompletedOrders] = useState(() => {
    const savedOrders = localStorage.getItem("completedOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [toast, setToast] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  useEffect(() => { localStorage.setItem("fruits", JSON.stringify(fruits)); }, [fruits]);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("completedOrders", JSON.stringify(completedOrders)); }, [completedOrders]);

  const isSameDate = (orderDate, checkDate) => {
    const order = new Date(orderDate);
    const date = new Date(checkDate);
    return order.getDate() === date.getDate() &&
           order.getMonth() === date.getMonth() &&
           order.getFullYear() === date.getFullYear();
  };

  const selectedDateSales = completedOrders
    .filter(order => isSameDate(order.date, selectedDate))
    .reduce((acc, order) => acc + order.total, 0);

  const addFruit = () => {
    if (name && price) {
      setFruits([...fruits, { name, price: parseFloat(price), unit }]);
      setName(""); setPrice(""); setUnit("kg");
      setToast(`Added ${name} (${unit})`);
      setTimeout(() => setToast(""), 2000);
    } else {
      setToast("Enter name, price, and unit!");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const addToCart = (fruit, weightInputId) => {
    const weightInput = document.getElementById(weightInputId);
    weightInput.focus();
    let weight = parseFloat(weightInput.value);

    if (isNaN(weight) || weight <= 0) { setToast("Enter valid weight!"); setTimeout(()=>setToast(""),2000); return; }
    if (fruit.unit === "g") weight = weight / 1000;

    const subtotal = fruit.price * weight;
    setCart(prevCart => [...prevCart, { ...fruit, weight, subtotal, id: new Date().getTime() }]);
    weightInput.value = "";
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    const removed = newCart.splice(index, 1)[0];
    setCart(newCart);
    setToast(`${removed.name} removed`);
    setTimeout(() => setToast(""), 2000);
  };

  const completeOrder = () => {
    if (!customer) { setToast("Enter customer name!"); setTimeout(()=>setToast(""),2000); return; }
    if (cart.length === 0) { setToast("Cart empty!"); setTimeout(()=>setToast(""),2000); return; }

    const order = { customer, items: cart, total: cart.reduce((acc,i)=>acc+i.subtotal,0), date: new Date().toLocaleString() };
    setCompletedOrders([...completedOrders, order]);
    setCart([]); setCustomer("");
    setToast(`Order completed for ${order.customer} ₱${order.total.toFixed(2)}`);
    setTimeout(()=>setToast(""),3000);
  };

  const removeCompletedOrder = (index) => {
    const newOrders = [...completedOrders];
    const removed = newOrders.splice(index,1)[0];
    setCompletedOrders(newOrders);
    setToast(`Removed completed order for ${removed.customer}`);
    setTimeout(()=>setToast(""),2000);
  };

  const clearCart = () => { if(confirm("Clear cart?")) setCart([]); };
  const resetInventory = () => { if(confirm("Reset all inventory?")) { setFruits([]); setCart([]); } };
  const total = cart.reduce((acc, i)=>acc+i.subtotal,0);

  const glassCard = {
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "15px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    transition: "all 0.3s ease",
  };

  const glassButton = {
    padding: "14px 25px",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.2s ease",
  };

  const cartItemStyle = {
    display:"flex", justifyContent:"space-between", alignItems:"center",
    marginBottom:"8px", padding:"8px", borderRadius:"12px", backgroundColor:"#ffffff50",
    transition: "transform 0.2s ease, opacity 0.3s ease"
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Poppins', sans-serif", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: "20px", textAlign: "center" }}>🍎 Modern POS</h1>

      {/* Add Fruit */}
      <div style={{ ...glassCard, display:"flex", flexWrap:"wrap", gap:"10px", marginBottom:"20px" }}>
        <input style={{ flex:"1 1 150px", padding:"12px", fontSize:"1rem", borderRadius:"10px", border:"none", transition:"all 0.2s ease"}} placeholder="Fruit Name" value={name} onChange={e=>setName(e.target.value)} />
        <input style={{ flex:"1 1 100px", padding:"12px", fontSize:"1rem", borderRadius:"10px", border:"none", transition:"all 0.2s ease"}} type="number" placeholder="Price per unit" value={price} onChange={e=>setPrice(e.target.value)} />
        <select style={{ flex:"1 1 100px", padding:"12px", fontSize:"1rem", borderRadius:"10px", border:"none", transition:"all 0.2s ease"}} value={unit} onChange={e=>setUnit(e.target.value)}>
          <option value="kg">kg</option><option value="g">g</option><option value="pcs">pcs</option><option value="tali">tali</option>
        </select>
        <button onClick={addFruit} style={{ ...glassButton, backgroundColor:"#28a745", color:"white" }}
          onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
          onMouseLeave={e=>e.target.style.transform="scale(1)"}>Add Fruit</button>
      </div>

      {/* Customer */}
      <input style={{ ...glassCard, width:"100%", marginBottom:"20px", fontSize:"1rem", transition:"all 0.2s ease"}} placeholder="Customer Name" value={customer} onChange={e=>setCustomer(e.target.value)} />

      {/* Fruit grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"15px", marginBottom:"20px" }}>
        {fruits.map((fruit,index)=>(
          <div key={index} style={{ ...glassCard, textAlign:"center", transition:"all 0.3s ease", transform:"translateY(0)" }}>
            <div style={{ fontSize:"1.2rem", marginBottom:"8px"}}>{fruit.name}</div>
            <div style={{ marginBottom:"8px"}}>₱{fruit.price.toFixed(2)} / {fruit.unit}</div>
            <input id={`weight-${index}`} type="number" placeholder={`Weight (${fruit.unit})`} style={{ width:"80px", padding:"8px", fontSize:"1rem", borderRadius:"8px", border:"none", marginBottom:"8px", transition:"all 0.2s ease" }} />
            <button style={{ ...glassButton, backgroundColor:"#007bff", color:"white" }}
              onClick={()=>addToCart(fruit,`weight-${index}`)}
              onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
              onMouseLeave={e=>e.target.style.transform="scale(1)"}>Add</button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div style={{ ...glassCard, marginBottom:"20px" }}>
        <h2 style={{ fontSize:"1.5rem", marginBottom:"10px"}}>Cart</h2>
        {cart.length===0 ? <p>Cart empty</p> :
          cart.map((item,idx)=>(
            <div key={item.id} style={cartItemStyle}>
              <span>{item.name} - {item.weight} {item.unit} x ₱{item.price.toFixed(2)} = ₱{item.subtotal.toFixed(2)}</span>
              <button style={{ ...glassButton, backgroundColor:"#dc3545", color:"white", padding:"6px 10px" }}
                onClick={()=>removeFromCart(idx)}
                onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
                onMouseLeave={e=>e.target.style.transform="scale(1)"}>Remove</button>
            </div>
          ))
        }
        <h3>Total: ₱{total.toFixed(2)}</h3>
      </div>

      {/* Completed Orders */}
      <button style={{ ...glassButton, backgroundColor:"#6c757d", color:"white", marginBottom:"15px"}}
        onClick={()=>setShowOrders(!showOrders)}
        onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
        onMouseLeave={e=>e.target.style.transform="scale(1)"}>
        {showOrders ? "Hide Completed Orders" : "Show Completed Orders"}
      </button>

      {showOrders && (
        <div style={{ ...glassCard, maxHeight:"400px", overflowY:"auto", marginBottom:"20px", transition:"all 0.3s ease"}}>
          <h2>Completed Orders</h2>
          <div style={{ marginBottom:"15px" }}>
            <label>Select Date: </label>
            <input type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} style={{ padding:"6px", fontSize:"1rem", borderRadius:"8px", border:"none", transition:"all 0.2s ease" }} />
            <span style={{ marginLeft:"10px", fontWeight:"bold", color:"#155724" }}>💰 ₱{selectedDateSales.toFixed(2)}</span>
          </div>

          {completedOrders.length===0 ? <p>No orders yet</p> :
            completedOrders.map((order,idx)=>{
              const orderDateOnly = new Date(order.date).toISOString().slice(0,10);
              return (
                <div key={idx} style={{ marginBottom:"12px", padding:"8px", borderRadius:"12px", backgroundColor: orderDateOnly===selectedDate ? "#d4edda":"#ffffff50", transition:"all 0.3s ease" }}>
                  {/* Flex container for name, date, remove */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                    <div><strong>{order.customer}</strong> - {order.date}</div>
                    <button style={{ ...glassButton, backgroundColor:"#dc3545", color:"white", padding:"6px 10px" }}
                      onClick={()=>removeCompletedOrder(idx)}
                      onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
                      onMouseLeave={e=>e.target.style.transform="scale(1)"}>Remove</button>
                  </div>
                  <ul style={{ marginLeft:"10px" }}>
                    {order.items.map((i,j)=><li key={j}>{i.name} - {i.weight} {i.unit} x ₱{i.price.toFixed(2)} = ₱{i.subtotal.toFixed(2)}</li>)}
                  </ul>
                  <strong>Total: ₱{order.total.toFixed(2)}</strong>
                </div>
              )
            })
          }
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"15px", marginBottom:"20px" }}>
        <button style={{ ...glassButton, backgroundColor:"#17a2b8", color:"white"}} onClick={completeOrder}>Complete Order</button>
        <button style={{ ...glassButton, backgroundColor:"#ffc107", color:"white"}} onClick={clearCart}>Clear Cart</button>
        <button style={{ ...glassButton, backgroundColor:"#dc3545", color:"white"}} onClick={resetInventory}>Reset Inventory</button>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", bottom:"20px", left:"50%", transform:"translateX(-50%)",
          backgroundColor:"#17a2b8", color:"white", padding:"12px 20px",
          borderRadius:"20px", fontSize:"1rem", zIndex:1000,
          boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
          opacity: toast ? 1 : 0,
          transition:"opacity 0.5s ease"
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
