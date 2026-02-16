import React, { useEffect, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaHeading,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "./CreatePost.css";
import Navbar from "../Component/Navbar";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const autherName = JSON.parse(localStorage.getItem("blog_rdata"));

  const [data, setData] = useState({
    title: "",
    description: "",
    auther: autherName?.name || "",
    imageUrl: "",
    imageType: "url",
  });

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});

  // Fetch post for edit
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setData({
          title: post.title || "",
          description: post.description || "",
          auther: post.auther || "",
          imageUrl: post.imageUrl || "",
          imageType: post.imageUrl?.startsWith("data:")
            ? "file"
            : "url",
        });

        setImagePreview(post.imageUrl || null);
      })
      .catch((err) => console.error("Edit fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setData((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setData((prev) => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    setData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileTypeChange = (type) => {
    setData((prev) => ({ ...prev, imageType: type }));
    setImagePreview(null);
  };

  const validate = () => {
    const newError = {};
    if (!data.title.trim()) newError.title = "Title is required.";
    if (!data.auther.trim()) newError.auther = "Author is required.";
    if (!data.description.trim())
      newError.description = "Description is required.";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const postData = {
      title: data.title,
      description: data.description,
      auther: data.auther,
      imageUrl: data.imageUrl,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Post Updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating post");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Post Deleted Successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  return (
    <div className="create-post-page">
      <Navbar />

      <div className="create-post-container">
        <header className="form-header">
          <h1>Edit Post</h1>
          <p>Update your story and make it better.</p>
        </header>

        <div className="post-form-card">
          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter your catchy title..."
                />
              </div>
              {error.title && <p className="error-text">{error.title}</p>}
            </div>

            {/* AUTHOR */}
            <div className="form-group">
              <label>Author Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="auther"
                  value={data.auther}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </div>
              {error.auther && <p className="error-text">{error.auther}</p>}
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={data.description}
                onChange={handleChange}
                placeholder="What's in your mind?"
              />
              {error.description && (
                <p className="error-text">{error.description}</p>
              )}
            </div>

            {/* IMAGE */}
            <div className="form-group">
              <label>Cover Image</label>

              {imagePreview ? (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="preview" className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <>
                  <div className="image-source-tabs">
                    <button
                      type="button"
                      className={`tab-btn ${
                        data.imageType === "url" ? "active" : ""
                      }`}
                      onClick={() => handleFileTypeChange("url")}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${
                        data.imageType === "file" ? "active" : ""
                      }`}
                      onClick={() => handleFileTypeChange("file")}
                    >
                      Upload File
                    </button>
                  </div>

                  {data.imageType === "url" ? (
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Paste image URL"
                      value={data.imageUrl}
                      onChange={handleImageUrlChange}
                    />
                  ) : (
                    <div className="image-upload-area" onClick={triggerFileSelect}>
                      <FaCloudUploadAlt className="upload-icon" />
                      <p>Click to upload image</p>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        hidden
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* BUTTONS */}
            <div className="form-actions-row">
              <button type="submit" className="submit-btn">
                <FaRegPaperPlane /> Update Post
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
