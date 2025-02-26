import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
// import { products } from "../assets/assets";
import { Product } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ShopContextType {
  products: Product[];
  currency: string;
  delivery_fee: number;
  backendUrl: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  cartItems: CartItems;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  navigate: (path: string) => void;
}

export const ShopContext = createContext<ShopContextType>({
  products: [],
  currency: "$",
  delivery_fee: 10,
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  search: "",
  setSearch: () => {},
  setCartItems: () => {},
  setToken: () => {},
  showSearch: false,
  setShowSearch: () => {},
  addToCart: () => {},
  getCartCount: () => 0,
  cartItems: {},
  updateQuantity: () => {},
  getCartAmount: () => 0,
  navigate: () => {},
});

export interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const addToCart = useCallback(async (itemId: string, size: string) => {
    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[itemId]) {
        newCartItems[itemId][size] = (newCartItems[itemId][size] || 0) + 1;
      } else {
        newCartItems[itemId] = { [size]: 1 };
      }
      return newCartItems;
    });

    if (!token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          { headers: { token: localStorage.getItem("token") || "" } }
        );
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  }, []);

  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce(
      (totalCount, itemSizes) =>
        totalCount +
        Object.values(itemSizes).reduce((sum, count) => sum + count, 0),
      0
    );
  }, [cartItems]);

  const updateQuantity = useCallback(
    (itemId: string, size: string, quantity: number) => {
      setCartItems((prevCartItems) => {
        const newCartItems = { ...prevCartItems };
        if (newCartItems[itemId]) {
          newCartItems[itemId][size] = quantity;
        }
        return newCartItems;
      });

      if (token) {
        try {
          axios.post(
            backendUrl + "/api/cart/update",
            {
              itemId,
              size,
              quantity,
            },
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          if (axios.isAxiosError(error)) {
            toast.error(error.message);
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      }
    },
    [
      backendUrl,
      token,
      setCartItems,
      cartItems,
      setProducts,
      products,
      setToken,
    ]
  );

  const getUserCart = async (token: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        // console.log("Getting user cart");
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") as string);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, itemSizes]) => {
        const itemInfo = products.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += Object.entries(itemSizes).reduce(
            (sum, [, count]) => sum + itemInfo.price * count,
            0
          );
        }
        return totalAmount;
      },
      0
    );
  }, [cartItems, products]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    backendUrl,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setCartItems,
    navigate,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
