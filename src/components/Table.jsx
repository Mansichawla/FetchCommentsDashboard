
import React, { useState,useEffect } from 'react';
import Pagination from './Pagination';
import Cell from './Cell';
import './Table.css';

     const Table = ({ comments, posts, handleEdit }) => {
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;

    
      useEffect(() => {
        setCurrentPage(1);
      }, [comments]);

      const totalPages = Math.ceil(comments.length / itemsPerPage);

      const paginatedComments = comments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      if (comments.length === 0) {
        return (
          <div className="table-container no-results">
            <p>No comments found. Try a different search.</p>
          </div>
        );
      }

      return (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Body</th>
                <th>Post Title</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.email}</td>
                  <Cell
                    value={comment.name}
                    onSave={(value) => handleEdit(comment.id, 'name', value)}
                  />
                  <Cell
                    value={comment.body}
                    onSave={(value) => handleEdit(comment.id, 'body', value)}
                  />
                  <td>{posts[comment.postId] || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      );
    };

export default Table;
