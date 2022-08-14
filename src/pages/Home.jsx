import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import Navbar from "../components/Navbar";
import Products from "./Products";
import authAxios from "../components/auth";
import Select from "react-select"
import { useState } from "react";

const Home = () => {
  const products = useSelector((state) => state.allProducts.products);

  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await authAxios.get(`/products`).catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(setProducts(response.data.products));
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProducts();
  }, []);

  const [options,setOptions] =useState("")
  const [category, setCategory] = useState("");
  /* Authorization */
  const accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbGVzaDI0MTI5MUBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vbmlsZXNoMjQxMjkxIiwiaWF0IjoxNjYwMDQ2OTQzLCJleHAiOjE2NjA0Nzg5NDN9.x10i3GT01NFcUtAC9RTZTg6ovD4_r_VXDkx1nftGJlg";
  const config = {
   headers: { Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-type": "application/json",
    }
  };
 
  /* Get categories */
  useEffect(() => {
    authAxios
      .get(`/categories`).then(responseCat =>{
       let categoriesFromApi = responseCat.data.categories.map((cat,index) => {
        return {label: cat.name, value: cat.name}
      });
      
      setOptions({
        categories: [{value: '', label: 'All'}].concat(categoriesFromApi)
      });
      
      })
      .catch((err) => {
        console.log("Err: ", err);
        });
       
  },[])

  const handleChange = (e) => {
    if(e.value == "" || e.value == "All")
    {
      setCategory("All");
    }
    else
    {
    setCategory(e.value);
    }
  };


  return (
    <div className=" bg-gray-200">
      <Navbar />
      <div className="flex flex-row justify-between items-center px-12 mt-10">
      <h2 className=" text-2xl font-extrabold text-gray-700">
        Products
        
      </h2>
      <Select className="w-64 h-10" options={options.categories}  defaultValue={category} onChange={handleChange}>
          </Select>
      </div>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        
      <Products type={category} />
        
      </div>

     
    </div>
  );
};

export default Home;
