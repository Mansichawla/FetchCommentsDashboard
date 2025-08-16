import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import "./index.css";

const App = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsRes, postsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/comments"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
        ]);
        const commentsData = await commentsRes.json();
        const postsData = await postsRes.json();

        // mappping
        const postsMap = postsData.reduce((acc, post) => {
          acc[post.id] = post.title;
          return acc;
        }, {});
        setPosts(postsMap);

        // apply saved edits from local storage
        const savedEdits =
          JSON.parse(localStorage.getItem("commentEdits")) || {};
        const commentsWithEdits = commentsData.map((comment) => ({
          ...comment,
          name: savedEdits[comment.id]?.name || comment.name,
          body: savedEdits[comment.id]?.body || comment.body,
        }));
        setComments(commentsWithEdits);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleEdit = (id, field, value) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, [field]: value } : comment
    );
    setComments(updatedComments);

 

    const savedEdits = JSON.parse(localStorage.getItem("commentEdits")) || {}
    const updatedEdits = {
      ...savedEdits,
      [id] : {...savedEdits[id],[field]:value},
    };
    localStorage.setItem('commentEdits',JSON.stringify(updatedEdits));
  }

 
  const filteredComments = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <Navbar onSearch={setSearchQuery} />
        <Table
          comments={filteredComments}
          posts={posts}
          handleEdit={handleEdit}
        ></Table>
      
    </div>
  );
};
export default App;
