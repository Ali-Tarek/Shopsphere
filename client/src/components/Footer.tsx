import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="text-center sm:text-start">
          {" "}
          {/* Add text-center class */}
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-gray-900 mb-5">
              SHOPSPHERE
            </h1>
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Stay connected for exclusive offers and the latest trends. Shop with
            confidence—quality and style delivered to your doorstep!
          </p>
        </div>

        <div className="text-center sm:text-start">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="text-center sm:text-start">
          <p className="text-xl font-medium mb-5 uppercase">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+201152526996</li>
            <li>shopsphere@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ shopsphere.com All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
