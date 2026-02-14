import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import "./EditPost.css";
const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    auther: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="create-post-container">
        <h2>Edit Post</h2>

        <form onSubmit={handleUpdate}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <input
            name="auther"
            value={formData.auther}
            onChange={handleChange}
            placeholder="Author"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <button type="submit">Update Post</button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
