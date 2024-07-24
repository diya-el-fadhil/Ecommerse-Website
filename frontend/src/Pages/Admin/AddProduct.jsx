import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import upload_area from "../CSS/Asset/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Changed to null for clarity
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "product",
    new_price: "",
    old_price: ""
  });

  const handleImageUpload = async () => {
    if (!image) return ''; // No image to upload
    let dataObj;
    const formData = new FormData();
    formData.append('product', image);

    try {
      const response = await fetch(`${backend_url}/upload`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      // Check if response is OK and attempt to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. ${errorText}`);
      }

      const data = await response.json();
      if (!data.success) throw new Error('Image upload failed');
      return data.image_url;
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
      return '';
    }
  }

  const AddProduct = async () => {
    const imageUrl = await handleImageUpload();
    if (!imageUrl) return; // Abort if image upload failed

    const product = { ...productDetails, image: imageUrl };

    try {
      const response = await fetch(`${backend_url}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      // Check if response is OK and attempt to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. ${errorText}`);
      }

      const data = await response.json();
      if (data.success) {
        alert("Product Added");
        navigate('/admin/dashboard'); // Navigate after successful addition
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  return (
    <div className="addproduct">
      <button className="back-button" onClick={() => navigate('/admin/dashboard')}>Back</button>

      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type Title here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input type="text" name="description" value={productDetails.description} onChange={changeHandler} placeholder="Type Description here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder="Type Price here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder="Type Offer Price here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" accept="image/*" hidden />
      </div>
      <button className="addproduct-btn" onClick={AddProduct}>ADD</button>
    </div>
  );
};

export default AddProduct;
