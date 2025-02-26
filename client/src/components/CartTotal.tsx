import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal: React.FC = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext) as {
    currency: string;
    delivery_fee: number;
    getCartAmount: () => number;
  };
  const [cartAmount, setCartAmount] = useState<number | null>(null);

  useEffect(() => {
    setCartAmount(getCartAmount());
  }, [getCartAmount]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {cartAmount !== null ? `${cartAmount}.00` : "Loading..."}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <b>
            {currency}
            {cartAmount === 0
              ? 0
              : cartAmount !== null
              ? cartAmount + delivery_fee
              : "Loading..."}
            .00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
