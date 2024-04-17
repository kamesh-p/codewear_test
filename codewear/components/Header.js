import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../slices/cartSlice";
import { toggleTheme } from "../slices/themeSlice";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const backgroundColors = {
    light: "bg-white",
    dark: "bg-gray-900",
  };
  const textColors = {
    light: "text-black",
    dark: "text-white",
  };
  const carts = useSelector((state) => state.carts);
  const { user } = useAuth();
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const cartRef = useRef();
  const length = Object.entries(carts).length - 1;

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item in carts) {
      if (item !== "_persist") {
        const product = carts[item];
        total += parseFloat(product.price) * product.qty;
      }
    }
    return total.toFixed(2);
  };

  const total = calculateTotalPrice();

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleinput = (e) => {
    const cc = e.target.value;
    console.log("cc", cc);
  };

  return (
    <div className={`${backgroundColors[theme]} ${textColors[theme]}`}>
      <header className="text-gray-600 body-font bg-white border-b-2 border-slate-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <div class="text-center ">
              <Link href="/">
                <h1 class="text-3xl font-extrabold text-black tracking-wide">
                  <span class="text-slate-400 ml-10">Coders</span>delight
                </h1>
              </Link>
            </div>
          </div>
          <div class="pt-2 relative mx-auto text-gray-600">
            <input
              class="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg"
              type="search"
              name="search"
              placeholder="Search"
              onChange={handleinput}
            />
          </div>

          {theme === "light" ? (
            <FaSun
              className="mr-14"
              size={22}
              onClick={() => dispatch(toggleTheme())}
            />
          ) : (
            <FaMoon
              className="mr-14"
              size={22}
              onClick={() => dispatch(toggleTheme())}
            />
          )}
          <FaShoppingCart size={26} onClick={toggleCart} />
          <sup className="ml-1 text-red-500 mr-12">{length}</sup>
          {isCartOpen && (
            <div
              ref={cartRef}
              className="w-72 sidebar absolute top-0 right-72 bg-white p-10 transform transition-transform translate-x-full z-10 shadow-lg"
            >
              <h2 className="font-bold text-xl mb-6">Shopping Cart</h2>
              <span
                onClick={closeCart}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                &#x2716;
              </span>
              <ol className="list-decimal pl-4 space-y-4">
                {Object.keys(carts).length <= 1 && (
                  <p className="text-sm font-normal">No items in the cart.</p>
                )}
                {Object.keys(carts).map((k) => {
                  if (k !== "_persist") {
                    return (
                      <li key={k} className="border-b pb-3">
                        <div className="flex items-center justify-between">
                          <div className="w-2/3">
                            <p className="text-base font-medium">
                              {carts[k].name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {carts[k].variant} - {carts[k].size}
                            </p>
                          </div>
                          <div className="w-1/3 flex items-center justify-end space-x-2">
                            <button
                              className="text-sm text-gray-500 hover:text-blue-500"
                              onClick={() => dispatch(decreaseQuantity(k))}
                            >
                              -
                            </button>
                            <p className="text-base font-semibold">
                              {carts[k].qty}
                            </p>
                            <button
                              className="text-sm text-gray-500 hover:text-blue-500"
                              onClick={() => dispatch(increaseQuantity(k))}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
              </ol>
              <div className="flex justify-between mt-6">
                <p className="text-base font-semibold">Subtotal</p>
                <p className="text-base font-semibold">₹{total}</p>
              </div>
              <div className="mt-4">
                <Link href="/checkout">
                  <p className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                    Checkout
                  </p>
                </Link>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearCartHandler}
                  className="block text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
