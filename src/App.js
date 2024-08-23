import React, { useState } from 'react';
import axios from 'axios';

function AddCourseInstance() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [code, setCode] = useState('');
  const [instances, setInstances] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInstance = { year, semester, course_title: courseTitle, code };

    try {
      const response = await axios.post('/api/course-instances/', newInstance);
      setInstances([...instances, response.data]);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter year"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Select semester</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter semester"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter course title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter course code"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Add instance
        </button>
      </form>

      {instances.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Course Instances</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="w-full bg-blue-500 text-white">
                <th className="py-2">Course Title</th>
                <th className="py-2">Year-Sem</th>
                <th className="py-2">Code</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="py-2">{instance.course_title}</td>
                  <td className="py-2">
                    {instance.year}-{instance.semester}
                  </td>
                  <td className="py-2">{instance.code}</td>
                  <td className="py-2">
                    <button className="text-blue-600 hover:text-blue-900">🔍</button>{' '}
                    <button className="text-red-600 hover:text-red-900">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddCourseInstance;
