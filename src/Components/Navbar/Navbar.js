import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Nav, NavDropdown } from "react-bootstrap";
import classes from "./Navbar.module.css";
import ModalComponent from "../Modal/Modal";
import { IoMdContact, IoMdHeart } from "react-icons/io";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { CgLogOff } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authActions from "./../../Reducers/authReducer";
import userActions from "./../../Reducers/userReducer";
import { myOrdersReset } from "../../Reducers/orderReducer";
const Navbar = (props) => {
  const [query, setQuery] = useState("");
  const [modalType, setModalType] = useState("");
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(query);
  };

  const [show, setShow] = useState(false);

  const displayModal = (type) => {
    return () => {
      setModalType(type);

      setShow(true);
    };
  };
  const handleClose = () => {
    //dispatch(authActions.setToInitial());
    setShow(false);
  };
  // const handleShow = () => ;
  const showDropDown = () => setDisplayDropDown(true);
  const hideDropDown = () => setDisplayDropDown(false);

  const logoutHandler = (e) => {
    dispatch(authActions.logout());
    dispatch(myOrdersReset());
    dispatch(userActions.userListReset());
    dispatch();
    console.log(userInfo);
  };
  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      setShow(false);
    }
  }, [isLoggedIn]);
  const activeStyle = {
    color: "#ed213b",
    textDecoration: "underline",
  };
  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          {/* <div className={classes.col1}> */}
          <div className="d-flex align-items-center">
            <div className={classes.brand}>
              <h1 className={classes.brandName}>
                <span style={{ color: "#ed213b" }}>SHOP</span>
                <span style={{ color: "#333" }}>KART</span>
              </h1>
            </div>
            <div className="d-flex">
              {/* <form onSubmit={searchHandler}>
              <div className={classes.searchbar}>
                <div>
                  <input
                    type="search"
                    placeholder="Search for products brands and more"
                    name="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={classes.searchInput}
                  />
                </div>
                <button type="submit" className={classes.searchBtn}>
                  <IoSearch className={classes.searchIcon} />
                </button>
              </div>
            </form> */}

              <NavLink
                //style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) =>
                  isActive ? classes.activeNavItem : classes.navItem
                }
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                //style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) =>
                  isActive ? classes.activeNavItem : classes.navItem
                }
                to="/wishlist"
              >
                Wishlist
              </NavLink>
              <NavLink
                //style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) =>
                  isActive ? classes.activeNavItem : classes.navItem
                }
                to="/order"
              >
                My Orders
              </NavLink>
              <NavLink
                //style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) =>
                  isActive ? classes.activeNavItem : classes.navItem
                }
                to="/cart"
              >
                Cart
              </NavLink>
              <NavDropdown
                className={classes.navItem}
                title="Products"
                id="basic-nav-dropdown"
                //style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <Link className={classes.dropdownItems} to="products/home">
                  Home
                </Link>
                <NavDropdown.Divider style={{ margin: "0" }} />
                <Link
                  className={classes.dropdownItems}
                  to="products/electronics"
                >
                  Electronics
                </Link>
                <NavDropdown.Divider style={{ margin: "0" }} />
                <Link className={classes.dropdownItems} to="products/fashion">
                  Fashion
                </Link>
              </NavDropdown>
              {isLoggedIn && userInfo.isAdmin && (
                <NavDropdown
                  className={classes.navItem}
                  title="Admin"
                  id="basic-nav-dropdown"
                  //style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <Link className={classes.dropdownItems} to="admin/users">
                    Users
                  </Link>
                  <NavDropdown.Divider style={{ margin: "0" }} />
                  <Link className={classes.dropdownItems} to="admin/products">
                    Products
                  </Link>
                  <NavDropdown.Divider style={{ margin: "0" }} />
                  <Link className={classes.dropdownItems} to="admin/orders">
                    Orders
                  </Link>
                  <NavDropdown.Divider style={{ margin: "0" }} />
                </NavDropdown>
              )}
            </div>
          </div>
          {/* <button
              type="button"
              className={classes.button}
              onClick={displayModal("login")}
            >
              Login
            </button> */}
          <div className="d-flex">
            {/* <NavDropdown
              id="nav-dropdown"
              title={`${isLoggedIn ? "My Account" : "Login"}`}
              className={isLoggedIn ? classes.button2 : classes.navBtn}
              onClick={(e) => {
                console.log(e.target);
                if (
                  (e.target.classList.contains("nav-item") ||
                    e.target.id === "nav-dropdown") &&
                  !isLoggedIn
                ) {
                  console.log("login");
                  return displayModal("login")();
                }
              }}
              onMouseOver={showDropDown}
              //onMouseLeave={hideDropDown}
              show={displayDropDown}
            >
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> 
              <ul onMouseLeave={hideDropDown} className={classes.menuList}>
                {!isLoggedIn && (
                  <>
                    <li className={classes.firstItem}>
                      <span>New Customer? </span>
                      <button
                        type="button"
                        onClick={displayModal("signup")}
                        className={classes.btn}
                      >
                        Sign Up
                      </button>
                    </li>

                    <NavDropdown.Divider style={{ margin: "0" }} />
                  </>
                )}
                <li className={classes.listItem}>
                  <Link to="/profile" className={classes.link}>
                    <IoMdContact />
                    <span className={classes.menuItem}>My Profile</span>
                  </Link>
                </li>
                <NavDropdown.Divider style={{ margin: "0" }} />
                <li className={classes.listItem}>
                  <Link to="/orders" className={classes.link}>
                    <RiShoppingBag3Fill />
                    <span className={classes.menuItem}>Orders</span>
                  </Link>
                </li>
                <NavDropdown.Divider style={{ margin: "0" }} />
                <li className={classes.listItem}>
                  <Link to="/wishlist" className={classes.link}>
                    <IoMdHeart />
                    <span className={classes.menuItem}>Wishlist</span>
                  </Link>
                </li>

                {isLoggedIn && (
                  <>
                    <NavDropdown.Divider style={{ margin: "0" }} />
                    <li className={classes.listItem} onClick={logoutHandler}>
                      <p
                        style={{ marginBottom: "0px" }}
                        className={classes.link}
                      >
                        <CgLogOff className={classes.logoutIcon} />
                        <span className={classes.menuItem}>Logout</span>
                      </p>
                    </li>
                  </>
                )}
              </ul>
            </NavDropdown> */}

            <button
              type="button"
              className={classes.navBtn}
              onClick={isLoggedIn ? logoutHandler : displayModal("login")}
            >
              {isLoggedIn ? (
                <CgLogOff className={classes.icon} />
              ) : (
                <IoMdContact className={classes.icon} />
              )}
              <span className={classes.btntext}>
                {isLoggedIn ? "Logout" : "Login"}
              </span>
            </button>

            {/* <button className={classes.navBtn}>
              <FaShoppingCart className={classes.icon} />
              <span className={classes.btntext}>Cart</span>
            </button> */}
            <button type="button" className={classes.navBtn}>
              <BsFillMoonFill />
            </button>
          </div>
          {/* </div> */}
        </nav>
      </header>
      {show && modalType === "login" && (
        <ModalComponent
          heading="Login"
          text="Get access to your Orders, wishlist and Recommendations"
          handleClose={handleClose}
          show={show}
          display={displayModal}
          linkText="New to Shopkart? Create an account"
          btnText="Login"
          modalType="login"
        />
      )}
      {show && modalType === "signup" && (
        <ModalComponent
          heading="Looks like you're new here!"
          text="Sign up with your name and email to get started"
          handleClose={handleClose}
          show={show}
          display={displayModal}
          btnText="CONTINUE"
          modalType="signup"
        />
      )}
    </>
  );
};

export default Navbar;
