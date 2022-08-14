import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";
import Navbar from "../components/Navbar";
import authAxios from "../components/auth";

/* Get product details by id*/
const ProductDetails = () => {
  const { productId } = useParams();
  console.log(productId)

  let product = useSelector((state) => state.product);
  const { _id,avatar, name, price, category, description } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (_id) => {
    const response = await authAxios
      .get(`/products/${_id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data.product));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <div className=" bg-gray-100 ">
      <Navbar/>
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (<>
        <div className="h-full flex max-w-md mx-auto px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 justify-center">
        <img src={avatar} alt="" className="w52 h-64 rounded-lg" />
        <div className="flex flex-col ml-14 mt-10">
          <h2 className="title font-bold text-2xl">{name}</h2>
          <h2 className="price font-semibold text-gray-400 text-lg mt-10 mb-[5px]">
            {category}
          </h2>
          <h2 className="price font-semibold text-lg mt-10 mb-[5px]">
            $ {price}
          </h2>
        </div>
      </div>
      <div className="flex-grow border-t border-black mx-64">
        <div className="py-5">
            <h2 className="text-lg font-bold">Description</h2>
            <h3 className="my-5">{description}</h3>
        </div>
        </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
