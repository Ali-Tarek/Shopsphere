import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../index.css";
import { assets } from "../assets/assets";
import { CartItems, ShopContext } from "../context/ShopContext";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavBar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(
    ShopContext
  ) as unknown as {
    setShowSearch: (value: boolean) => void;
    getCartCount: () => number;
    navigate: (path: string) => void;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium sticky top-0 z-10 bg-white ">
      <Link to={"/"}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          SHOPSPHERE
        </h1>
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            className="flex flex-col items-center gap-1 uppercase"
            to={item.path}
          >
            <p>{item.name}</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="Profile Icon"
            className="w-5 cursor-pointer"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="Cart Icon" className="w-5 min-w-5" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu Icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small screeen */}
      <div
        className={`${
          visible ? "block" : "hidden"
        } fixed top-0 left-0 h-full w-full bg-white z-10`}
      >
        <div className="flex justify-end p-5">
          <img
            onClick={() => setVisible(false)}
            src={assets.close_icon}
            alt="Close Icon"
            className="w-5 cursor-pointer"
          />
        </div>

        <ul className="flex flex-col gap-5 text-xl text-gray-700">
          {navItems.map((item) => (
            <NavLink
              onClick={() => setVisible(false)}
              key={item.path}
              className="flex flex-col items-center gap-1 uppercase"
              to={item.path}
            >
              <p>{item.name}</p>
              <hr className="w-1/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
