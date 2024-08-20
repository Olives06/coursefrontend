import React, { useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from "react-router-dom";

function Home() {
  return (
    <center className='py-64'>
    <nav>
          <ul className='border-2 text-2xl'>
            <li><Link to="/add-course">Add Course</Link></li>
            <li><Link to="/add-instance">Add Instance</Link></li>
          </ul>
        </nav>
        </center>    
  );
}

function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
    
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Course Title"
          />
        </div>

        <div className="mb-4">
           <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Course Code"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Course Description"
          />
        </div>

        <button type="submit" className="w-1/2 bg-blue-500 text-white py-2 ml-20 rounded hover:bg-blue-600">
          Add Course
        </button>
      </form>
    </div>
  );
}

function AddInstance() {
  return (
   
      <div className="flex flex-col items-center space-y-4 p-4 mt-40">
        <div className="flex items-center space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Select course</option>
            <option>Java</option>
            <option>JavaScript</option>
            <option>Python</option>
            <option>Spring Boot</option>
            <option>Spring</option>
            <option>ReactJS</option>
            <option>DJango</option>
            <option>PostgreSQL</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Refresh
          </button>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Year"
            className="px-4 py-2 border border-gray-300 rounded-md w-32"
          />
          <input
            type="text"
            placeholder="Semester"
            className="px-4 py-2 border border-gray-300 rounded-md w-32"
          />
        </div>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md">
          Add instance
        </button>
      </div>
    );
  
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-instance" element={<AddInstance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
