import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import {
  FaCloudUploadAlt,
  FaHeading,
  FaLink,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import "./CreatePost.css";
import { useNavigate, useParams } from "react-router-dom";

function CreatePost() {
  const autherName = JSON.parse(localStorage.getItem("blog_rdata"));

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    auther: autherName?.name || "",
    imageurl: "",
    imageType: "url",
  });

  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState({});

 const { id } = useParams();
 const isEditMode = !!id;
  useEffect(() => {
  if (isEditMode) {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setData({
          title: post.title,
          description: post.description,
          auther: post.auther,
          imageurl: post.imageurl,
          imageType: post.imageurl?.startsWith("http")
            ? "url"
            : "file",
        });

        setImagePreview(post.imageurl);
      });
  }
}, [id]);


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const url = isEditMode
      ? `http://localhost:3000/posts/${id}`
      : "http://localhost:3000/posts";

    const method = isEditMode ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          createdAt: isEditMode
            ? data.createdAt
            : new Date().toISOString(),
        }),
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handlefileTypeChange = (type) => {
    setData((prev) => ({ ...prev, imageType: type }));
    if (type === "url") {
      setImagePreview(data.imageurl);
    } else {
      setImagePreview(null);
    }
  };

  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);

        setData((prev) => ({
          ...prev,
          imageurl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (data.imageType === "url") {
      setData((prev) => ({ ...prev, imageurl: "" }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  const validate = () => {
    const newError = {};
    if (!data.title.trim()) {
      newError.title = "Title Is Required.";
    }
    if (!data.auther.trim()) {
      newError.auther = "Auther is  Required.";
    }
    if (!data.description.trim()) {
      newError.description = "Description Is Required.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  return (
    <div className="create-post-page">
      <Navbar />

      <div className="create-post-container">
        <header className="form-header">
          <h1>Create New Post</h1>
          <p>Share Your Thoughts and Stories With The World.</p>
        </header>

        <div className="post-form-card">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={data.title}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="enter Your Catchy Title..."
                />
              </div>
              {error.title && <span className="error">{error.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="auther">Auther Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="auther"
                  id="auther"
                  value={data.auther}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Your Name"
                />
                {error.auther && <span className="error">{error.auther}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={data.description}
                onChange={handleChange}
                placeholder="What's In Your Mind ?? Write Your Story Here."
              />
              {error.description && (
                <span className="error">{error.description}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="image">Cover Image</label>

              {!imagePreview ? (
                <>
                  <div className="image-source-tabs">
                    <button
                      type="button"
                      className={`tab-btn ${data.imageType === "url" ? "active" : ""}`}
                      onClick={() => handlefileTypeChange("url")}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${data.imageType === "file" ? "active" : ""}`}
                      onClick={() => handlefileTypeChange("file")}
                    >
                      Upload File
                    </button>
                  </div>
                  {data.imageType === "url" ? (
                    <div className="input-wrapper">
                      <FaLink className="input-icon" />
                      <input
                        type="url"
                        name="imageurl"
                        className="form-control"
                        placeholder="Paste your url"
                        value={data.imageurl}
                        onChange={(e) => {
                          handleChange(e);
                          setImagePreview(e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="image-upload-area"
                      onClick={triggerFileSelect}
                    >
                      <FaCloudUploadAlt className="upload-icon" />
                      <p>Click to Upload image from your device</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handlefileChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="image-preview"
                  />

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="form-actions-row">
              <button type="submit" className="submit-btn">
                <FaRegPaperPlane />
                Publish Post
              </button>

              <button type="button" className="cancel-btn">
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;