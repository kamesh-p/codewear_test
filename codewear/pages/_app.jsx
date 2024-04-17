import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../src/app/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Provider } from "react-redux";
import { store, persistor } from "../store"; 
import Header from "../components/Header";
import { RecoilRoot } from "recoil"; 

import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, []); 


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const isProductPage = router.pathname.startsWith("/product/");


  const noauthreq = [
    "/",
    "/login",
    "/signup",
    "/cups",
    "/hoodies",
    "t-shirts",
    "/phone",
    "/forget",
    
  ];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <RecoilRoot> 
          <AuthContextProvider>
            {noauthreq.includes(router.pathname) || isProductPage ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoutes>
                <Component {...pageProps} />
              </ProtectedRoutes>
            )}
          </AuthContextProvider>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
