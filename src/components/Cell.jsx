import React, { useState } from 'react';
import './Cell.css';

    const Cell = ({ value, onSave }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [cellValue, setCellValue] = useState(value);

      const handleBlur = () => {
        setIsEditing(false);
        if (cellValue !== value) {
          onSave(cellValue);
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
          e.preventDefault();
          handleBlur();
        }
      };

      return (
        <td onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <textarea
              value={cellValue}
              onChange={(e) => setCellValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="editable-input"
            />
          ) : (
            <span className="editable-text">{value}</span>
          )}
        </td>
      );
    };
export default Cell;