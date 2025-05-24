import React, { Fragment, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QtyField from "../../../components/cart/QtyFiled";
import SideBar from "../../../components/cart/SideBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "../../../services/components/cart/getCart";
import toast from "react-hot-toast";
import { deleteCart } from "../../../services/components/cart/deleteCart";
import { Link } from "react-router-dom";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Cart = () => {
  const [qty, setQty] = useState("");

  const userid = localStorage.getItem("userid");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["carts", userid],
    queryFn: () => getCart({ userid: Number(userid) }),
    refetchOnMount: true,
  });

  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("carts");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleQtyChange = (e, index) => {
    // Handle quantity change logic here
    console.log("Qty changed at", index, "to", e.target.value);
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  const cartItems = data?.data || [];

  const handleDeleteCart = (item) => {
    deleteCartMutation.mutate({ Productid: item.productid });
  };

  return (
    <section className="ezy__epcart4 light py-14 md:py-24 bg-white text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container px-4 md:px-20 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products */}
          <div className="text-zinc-900 rounded-xl overflow-hidden w-full lg:w-2/3">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4 border rounded-lg shadow-sm"
                >
                  {/* Image */}
                  <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                    <a href="#!">
                      <img
                        src={`${IMG_URL}/uploads/${item?.productimages[0]}`}
                        crossOrigin="anonymous"
                        alt={item.productname}
                        className="max-w-full object-cover h-full rounded-xl mx-auto"
                      />
                    </a>
                  </div>

                  <div className="flex w-full">
                    {/* Product details */}
                    <div>
                      <div className="text-base md:text-lg hover:text-blue-600 mb-4">
                        <Link to={`/product-details/${item.productid}`}>
                          {item.productname}
                        </Link>
                      </div>
                      <div>
                        <QtyField
                          name={`ezy__epcart4-qty-${index}`}
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(e, index)}
                        />
                        <h3 className="text-xl font-bold text-blue-600">
                          Rs. {item.productprice}
                        </h3>
                      </div>
                    </div>

                    {/* Delete button */}
                    <div className="ml-auto">
                      <button
                        className="w-10 h-10 hover:bg-blue-200 dark:bg-opacity-20 inline-flex justify-center items-center rounded-full"
                        onClick={() => handleDeleteCart(item)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in cart.</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <SideBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
