import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { MdDeleteSweep, MdOpenInNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import "./Favorites.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Favorites = () => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const removeFavorite = (postId) => {
    const updated = favorites.filter((id) => id !== postId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.info("Removed from favorites");
  };

  const clearAllFavorites = () => {
    if (!window.confirm("Clear all saved posts?")) return;
    localStorage.setItem("favorites", "[]");
    setFavorites([]);
    toast.info("Collection cleared");
  };

  const favoritePosts = posts.filter((post) =>
    favorites.includes(post.id)
  );

  return (
    <div className="favorites-page-container">
      <Navbar />

      <main className="favorites-main">
        {/* HERO */}
        <div className="favorites-hero">
          <div className="hero-shape"></div>
          <div className="hero-content">
            <h1>Your Reading List</h1>
            <p>Enjoy the collection of stories you've curated.</p>
          </div>
        </div>

        <div className="favorites-content">
          {/* HEADER */}
          <div className="favorites-header">
            <h2>
              Curated Collection
              <span className="count-badge">
                {favoritePosts.length}
              </span>
            </h2>

            {favoritePosts.length > 0 && (
              <button
                className="clear-all-btn"
                onClick={clearAllFavorites}
              >
                <MdDeleteSweep size={20} />
                Clear List
              </button>
            )}
          </div>

          {/* EMPTY STATE */}
          {favoritePosts.length === 0 && (
            <div className="fav-empty-state">
              <div className="empty-icon-wrapper">
                <FaRegStar className="empty-icon" />
              </div>
              <h3>Your List is empty</h3>
              <p>Discover interesting posts and save them to read later</p>
              <button
                className="browse-btn"
                onClick={() => navigate("/dashboard")}
              >
                Explore Stories
              </button>
            </div>
          )}

          {/* FAVORITE POSTS */}
          <div className="favorites-grid">
            {favoritePosts.map((post) => (
              <div className="fav-card" key={post.id}>
                <div className="fav-card-image">
                  <img src={post.imageUrl} alt={post.title} />
                  <div className="fav-card-overlay">
                    <button
                      className="read-btn"
                      onClick={() =>
                        navigate(`/post-detail/${post.id}`)
                      }
                    >
                      <MdOpenInNew />
                      Read Article
                    </button>
                  </div>
                </div>

                <div className="fav-card-body">
                  <div className="fav-meta">
                    <span className="fav-author">{post.author}</span>
                    <span className="fav-date">
                      {new Date(post.createdAt).toDateString()}
                    </span>
                  </div>

                  <h3 className="fav-title">{post.title}</h3>

                  <p className="fav-excerpt">
                    {post.description?.slice(0, 120)}...
                  </p>

                  <button
                    className="remove-fav-btn"
                    onClick={() => removeFavorite(post.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favorites;