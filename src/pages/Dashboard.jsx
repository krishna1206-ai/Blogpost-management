import React from "react";
import Navbar from "../component/Navbar";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome to your dashboard</h1>
            <p>
              Manage your post,track engagement and connect with your audience
            </p>
          </div>
        </div>
        <div className="dashboard-start-overview">
          <div className="dash-card">
            <h3>Total Post</h3>
            <span className="dash-number">10</span>
          </div>
          <div className="dash-card">
            <h3>Your stories</h3>
            <span className="dash-number">5</span>
          </div>
          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">10</span>
          </div>
        </div>
        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button className="create-shortcut-btn">
              <FaPlus />
              New Post
            </button>
          </div>
          <div className="posts-grid">
            <div className="post-card">
              <div className="post-image-container">
                <img
                  src="https://images.unsplash.com/photo-149975031010"
                  alt="post"
                  className="post-card-image"
                />
                <div className="post-actions">
                  <button className="action-btn edit-btn" title="Edit post">
                    <MdEdit size={22} color="#ffffff" />
                  </button>
                  <button className="action-btn delete-btn" title="Delete post">
                    <MdDelete size={22} color="#ffffff" />
                  </button>
                </div>
              </div>
              <div className="post-card-content">
                <div className="post-meta">
                  <span className="post-author">By Admin</span>
                  <span className="post-date">Recent</span>
                </div>
                <h3 className="post-card-title">SImple post Title</h3>
                <p className="post-card-description">
                  this is the static description of maintain UI design weithout
                </p>
                <button className="read-more-btn">Read more</button>
              </div>
            </div>
            {/* post card 2 */}

            <div className="post-card">
              <div className="post-image-container">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd"
                  alt="post"
                  className="post-card-image"
                />
                <div className="post-actions">
                  <button className="action-btn edit-btn" title="Edit post">
                    <MdEdit size={22} color="#ffffff" />
                  </button>
                  <button className="action-btn delete-btn" title="Delete post">
                    <MdDelete size={22} color="#ffffff" />
                  </button>
                </div>
              </div>
              <div className="post-card-content">
                <div className="post-meta">
                  <span className="post-author">By Admin</span>
                  <span className="post-date">Recent</span>
                </div>
                <h3 className="post-card-title">SImple post Title</h3>
                <p className="post-card-description">
                  this is the static description of maintain UI design weithout
                </p>
                <button className="read-more-btn">Read more</button>
              </div>
            </div>

            <div className="post-card-content">
              <div className="post-meta">
                <span className="post-author">By User</span>
                <span className="post-date">Recent</span>
              </div>
              <h3 className="post-card-title">Another Static Post</h3>
              <p className="post-card-description">
                Static content example to keep the dashboard layout and style
              </p>
              <button className="read-more-btn">Read more</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
