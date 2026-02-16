import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import "./PostDetails.css";
import { FaArrowLeft, FaCalendar, FaClock } from "react-icons/fa";

const PostDetails = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!post) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="post-details-page">
      <Navbar />
      <main className="post-details-container">

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Back to Feed
        </button>

        <article className="full-post">
          <header className="post-header">
            <div className="post-category">Journal</div>

            <h1 className="post-full-title">{post.title}</h1>

            <div className="post-author-meta">
              <div className="author-info">
                <div className="author-avatar">
                  {post.author?.charAt(0)}
                </div>

                <div>
                  <span className="author-name">{post.author}</span>

                  <div className="post-date-row">
                    <span>
                      <FaCalendar />{" "}
                      {new Date(post.createdAt).toDateString()}
                    </span>
                    <span className="dot"> • </span>
                    <span>
                      <FaClock /> 5 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="post-featured-image">
            <img src={post.imageUrl} alt={post.title} />
          </div>

          <div className="post-body">
            <p>{post.description}</p>
          </div>

          <footer className="post-footer">
            <div className="post-share">
              <span>Share this story:</span>
              <div className="share-buttons">
                <button className="share-btn">Twitter</button>
                <button className="share-btn">LinkedIn</button>
                <button className="share-btn">Link</button>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default PostDetails;
