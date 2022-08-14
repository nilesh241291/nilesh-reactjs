import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/* Used for selected data */
const Products = (data) => {
  const products = useSelector((state) => state.allProducts.products);
   
   
 const [filteredData, setFilteredData] = useState("");
  
 /* Render data for selected category */
  const renderList = 
   products.map((product) => {
    const { _id, name, avatar, price, category } = product;
    return (
      <>
      
      { (data.type == "All" || data.type == "")  && 
         <div className="bg-gray-200" key={_id}>
         
         <div className="max-w-md px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 ">
           
           <div className="group relative">
             <Link to={`/product/${_id}`}>
               <div className=" bg-gray-200 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                 <img src={avatar} alt={name} className="w-full h-full object-center object-fill group-hover:opacity-75" />
               </div>
               <div className="flex justify-between px-7">
                 <div>
                   <h3 className="text-md text-gray-700">
                     <span aria-hidden="true" className="absolute inset-0"></span>
                     {name}
                   </h3>
                   <p className="mt-1 text-sm text-gray-500">{category}</p>
                 </div>
               </div>
               <p className="text-sm font-medium text-gray-900 px-7">{price}</p>
             </Link>
           </div>
                 
         </div>
         
       </div>
      }
      { data.type == product.category && 
      <div className="bg-gray-200" key={_id}>
         
        <div className="max-w-md px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 ">
          
          <div className="group relative">
            <Link to={`/product/${_id}`}>
              <div className=" bg-gray-200 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img src={avatar} alt={name} className="w-full h-full object-center object-fill group-hover:opacity-75" />
              </div>
              <div className="flex justify-between px-7">
                <div>
                  <h3 className="text-md text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{category}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 px-7">{price}</p>
            </Link>
          </div>
                
        </div>
        
      </div>
   }
      </>
    );
  
  });

  
  return(
    < >
    
  {renderList}
  <Link to="/addproduct">
  <svg className="w-24 h-24 my-36 mx-12" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><title>add</title><path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z"/></svg>
  </Link>
  </>
  )
}

export default Products;
