import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("called after API", posts);
  }, [posts]);
  useEffect(() => {
    fetchData();
  }, []);

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
            <span className="dash-number">{posts.length}</span>
          </div>

          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">{posts.length}</span>
          </div>
        </div>

        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button className="create-shortcut-btn">
              <FaPlus /> New Post
            </button>
          </div>

          <div className="posts-grid">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-image-container">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-card-image"
                  />

                  <div className="post-actions">
                    <button className="action-btn edit-btn" title="Edit Post">
                      <MdEdit size={22} color="white" />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Delete Post"
                    >
                      <MdDelete size={22} color="white" />
                    </button>
                  </div>
                </div>

                <div className="post-card-content">
                  <div className="post-meta">
                    <span className="post-author">By {post.author}</span>
                    <span className="post-date">
                      {new Date(post.createdAt).toDateString()}
                    </span>
                  </div>

                  <h3 className="post-card-title">{post.title}</h3>

                  <p className="post-card-description">{post.description}</p>

                  <button className="read-more-btn">Read More</button>
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
