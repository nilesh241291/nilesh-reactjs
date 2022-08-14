import React, { useState,useEffect } from "react";
import axios from "axios";
import authAxios from "../components/auth";
import Select from "react-select";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [developerEmail, setdeveloperEmail] = useState("");
  const [options,setOptions] =useState("")


 /* Token Declaration */
  const accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbGVzaDI0MTI5MUBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vbmlsZXNoMjQxMjkxIiwiaWF0IjoxNjYwMDQ2OTQzLCJleHAiOjE2NjA0Nzg5NDN9.x10i3GT01NFcUtAC9RTZTg6ovD4_r_VXDkx1nftGJlg";
  
  /* Authorization */
  const config = {
   headers: { Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-type": "application/json",
    }
  };
 
  /* Fetch categories from API */
  useEffect(() => {
    authAxios
      .get(`/categories`).then(responseCat =>{
       let categoriesFromApi = responseCat.data.categories.map((cat,index) => {
        return {label: cat.name, value: cat.name}
      });
   
  /* Set categories to select */
      setOptions({
        categories: [{value: '', label: '(Select)'}].concat(categoriesFromApi)
      });
      
      })
      .catch((err) => {
        console.log("Err: ", err);
        });
       
  },[])

  /* Add product details */
  const addProduct = () => {
    const data = { name, description, avatar, category, price, developerEmail };
    axios.post('https://upayments-studycase-api.herokuapp.com/api/products',data, config)
    .then(response => {
        if(response.data.message === "Success")
        {
            alert("Data added successfully...");
            window.location = '/';
        }
        else
        {
           alert(response.data.message);
        }
    })
    .catch((error) => {
        return  error;
    });
   
  };

  /* Event for selected category */
  const handleChange = (e) => {
    setCategory(e.value);
    console.log(e.value);
  };
 
  return (
    <div className="h-screen flex lg:flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl font-bold mt-2 lg:mr-16"> Create Product</h1>
      <div className="flex flex-col lg:mr-16 mt-5">
        <input
          id="name"
          className="text-gray-600 dark:text-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col lg:mr-16 mt-5">
        <textarea
          id="description"
          rows="4"
          className="text-gray-600 dark:text-gray-400 focus:outline-none  dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col lg:mr-16 mt-5">
        <input
          id="avatar"
          className="text-gray-600 dark:text-gray-400 focus:outline-none  dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          placeholder="image url"
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
      <div className="flex flex-col lg:mr-16 mt-5">
          <Select className="w-64 h-10" options={options.categories}  defaultValue={category} onChange={handleChange}>
          </Select>
      </div>
      <div className="flex flex-col lg:mr-16 mt-5">
        <input
          id="price"
          className="text-gray-600 dark:text-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:mr-16 mt-5">
        <input
          id="email"
          className="text-gray-600 dark:text-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          placeholder="Email"
          onChange={(e) => setdeveloperEmail(e.target.value)}
        />
      </div>

      <button
        className="mt-5 p-2 m-2 rounded-lg w-20 lg:mr-16 ring-1"
        onClick={addProduct}
      >
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
