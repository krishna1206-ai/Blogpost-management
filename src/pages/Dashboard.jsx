import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // ✅ Same storage key as CreatePost
  const authData = JSON.parse(localStorage.getItem("blog_rdata"));

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Only count YOUR posts
  const yourStories = posts.filter(
    (post) =>
      post.auther?.trim().toLowerCase() ===
      authData?.name?.trim().toLowerCase()
  );

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      // remove from UI
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashbord-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome to your Dashboard</h1>
            <p>
              Manage your posts, track engagement, and connect with your audience.
            </p>
          </div>
        </div>

        <div className="dashboard-stats-overview">
          <div className="dash-card">
            <h3>Total Posts</h3>
            <span className="dash-number">{posts.length}</span>
          </div>

          <div className="dash-card">
            <h3>Your Stories</h3>
            <span className="dash-number">{yourStories.length}</span>
          </div>

          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">
              {posts.length - yourStories.length}
            </span>
          </div>
        </div>

        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button
              className="create-shortcut-btn"
              onClick={() => navigate("/create-post")}
            >
              <FaPlus /> New Post
            </button>
          </div>

          <div className="posts-grid">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-image-container">
                  <img
                    src={post.imageUrl || "https://via.placeholder.com/300"}
                    alt={post.title}
                    className="post-card-image"
                  />

                  <div className="post-actions">
                    <button
                      className="action-btn edit-btn"
                      title="Edit Post"
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                    >
                      <MdEdit size={22} color="white" />
                    </button>

                    <button
                      className="action-btn delete-btn"
                      title="Delete Post"
                      onClick={() => handleDelete(post.id)}
                    >
                      <MdDelete size={22} color="white" />
                    </button>
                  </div>
                </div>

                <div className="post-card-content">
                  <div className="post-meta">
                    <span className="post-author">By {post.auther}</span>
                    <span className="post-date">
                      {new Date(post.createdAt).toDateString()}
                    </span>
                  </div>

                  <h3 className="post-card-title">{post.title}</h3>

                  <p className="post-card-description">
                    {post.description}
                  </p>

                  <button
                    className="read-more-btn"
                    onClick={() => navigate(`/post-detail/${post.id}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
