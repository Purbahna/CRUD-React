// src/DynamicTable.js
// import './CrudTable.css'
// // src/DynamicTable.js
// import React from 'react';

// const DynamicTable = ({ columns, data }) => {
//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           {columns.map((column, index) => (
//             <th key={index}>{column}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             {columns.map((column, columnIndex) => (
//               <td key={columnIndex}>{item[column]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default DynamicTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd'

const DynamicTable = ({ columns, apiUrl }) => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const fetchData = () => {
    axios.get(apiUrl)
      .then(response => {
        setData(response.data.users);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [apiUrl]);
  

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index, newData) => {
    axios.put(`${apiUrl}`, newData)
      .then(() => {
        fetchData();
        setEditingIndex(-1);
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const handleDelete = (index) => {
    // Delete data on the server and then update local state
    axios.delete('https://mocki.io/v1/51bbeef8-722d-426f-82f0-49588759f717')
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
      <Table className="table">
        {/* <div className='d-flex justify-content-end'>
            <Link to='/create' className='btn btn-success'>Add +</Link>
        </div> */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={item[column.dataIndex]}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index][column.dataIndex] = e.target.value;
                        setData(newData);
                      }}
                    />
                  ) : (
                    item[column.dataIndex]
                  )}
                </td>
              ))}
              <td>
                {editingIndex === index ? (
                  <button className='btn btn-success' onClick={() => handleSave(index, data[index])}>Save</button>
                ) : (
                  <>
                    <button className='btn btn-primary' onClick={() => handleEdit(index)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DynamicTable;
