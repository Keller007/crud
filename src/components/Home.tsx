import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post } from "../interface";
import "./Home.css";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:7070/notes");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleDelete =
    (postId: number) => async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();

      try {
        const response = await fetch(`http://localhost:7070/notes/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };
  const handleRefresh = async () => {
    try {
      const response = await fetch("http://localhost:7070/notes");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error refreshing posts:", error);
    }
  };

  return (
    <div className="home-container">
      <button className="refresh-button" onClick={handleRefresh}>
        Обновить
      </button>
      <div className="post-list">
        {posts.length === 0 ? (
          <>
            <div className="placeholder-post">
              <p> Создайте свой первый пост!</p>
            </div>
          </>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <i className="delete-icon" onClick={handleDelete(post.id)}></i>
              <div className="post-details">
                <p>{post.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/posts/new" className="create-post-button">
        Создать пост
      </Link>
    </div>
  );
};

export default Home;
