import React from "react";
import Navbar from "../Component/Navbar";
import { FaCloudUploadAlt, FaHeading, FaLink, FaRegPaperPlane, FaTimes, FaUser } from "react-icons/fa";

const CreatePost = () => {
  return (
    <div className="Create-post-page">
      <Navbar />

      <div className="create-post-container">
        <header className="form-header">
          <h1>Create new post</h1>
          <p>Share your thoughts and stories with world</p>
        </header>

        <div className="post-form-card">
          <form>
            {/* Title */}
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter a catchy title..."
                />
              </div>
            </div>

            {/* Author */}
            <div className="form-group">
              <label>Author name</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  placeholder="Your name..."
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="What's on your mind? Write a story here"
              ></textarea>
            </div>

            {/* Cover Image */}
            <div className="form-group">
              <label>Cover Image</label>
              <div className="image-source-tabs">
                <button className="tab-btn active" type="button">
                  Image URL
                </button>
                <button className="tab-btn" type="button">
                  Upload File
                </button>
              </div>
              <div className="input-wrapper">
                <FaLink className="input-icon"/>
                <input type="url" name="imageUrl" className="form-control" placeholder="Paste image URL here(e.g. https://..." />
              </div>
              <div className="image-upload-area">
                <FaCloudUploadAlt className="upload-icon"/>
                <p>Click to upload image from your device</p>
              </div>
              <div className="image-preview-container">
                <img src="https://avatars.mds.yandex.net/i?id=4919b0b211ba61e4dd51d0897298f97a2479abda-4612626-images-thumbs&n=13" alt="Preview" className="image-preview"/>
                <button type="button" className="remove-image-btn"><FaTimes/></button>
              </div>
            </div>
            <div className="foem-action-rows">
                <button type="submit" className="submit-btn">
                    <FaRegPaperPlane/>Publish Post
                </button>
                  <button type="submit" className="camcel-btn">
                    <FaRegPaperPlane/>Clear Form
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
