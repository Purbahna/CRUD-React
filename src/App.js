// src/App.js
import React from 'react';
import DynamicTable from './components/DynamicTable.js';
import './components/CrudTable.css'


function App() {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
  ];
  const apiUrl = 'https://mocki.io/v1/1fd0ed0a-8463-4d1b-961f-653c4049a9af'; 

  return (
    <div className="container mt-5">
      <h1>Dynamic Table Example</h1>
      
      <DynamicTable columns={columns} apiUrl={apiUrl} 
      pagination={{
        pageSize: 5,
      }}
      scroll={{
        y: 120,
      }}
      />
    </div>
  );
}
export default App;


// src/App.js
// import React from 'react';
// import DynamicTable from './components/DynamicTable';

// function App() {
//   const columns = ['ID', 'Name', 'Age'];
//   const data = [
//     { ID: 1, Name: 'John Doe', Age: 30 },
//     { ID: 2, Name: 'Jane Smith', Age: 25 },
//     { ID: 3, Name: 'Alex Demie', Age: 23 }
//   ];

//   return (
//     <div className="container mt-5">
//       <h1>Dynamic Table Example</h1>
//       <DynamicTable columns={columns} data={data} />
//     </div>
//   );
// }

// export default App;




