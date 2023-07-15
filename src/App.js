import "./App.css";
import Navbar from "./Components//Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Screens/Home";
import Product from "./Screens/Product";
import Products from "./Screens/Products";
import Cart from "./Screens/Cart";
import Orders from "./Screens/Orders";
import Wishlist from "./Screens/Wishlist";
import MyOrders from "./Screens/MyOrders";
import UsersList from "./Screens/UsersList";
import UserEdit from "./Screens/UserEdit";
import ProductList from "./Screens/ProductList";
import ProductEdit from "./Screens/ProductEdit";
import OrderList from "./Screens/OrderList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:id" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<MyOrders />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id/edit" element={<UserEdit />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/orders" element={<OrderList />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
