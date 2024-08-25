import { useEffect, useState } from "react";
import axios from "axios";
import './addcourse.css'

function AddCourse() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/courses/");
    setCourses(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/courses/", {
        title,
        course_code: courseCode,
        description
      });
      alert("Course Added Successfully");
      setId("");
      setTitle("");
      setCourseCode("");
      setDescription("");
      Load();
    } catch (err) {
      alert("Course Registration Failed");
    }
  }

  async function editCourse(course) {
    setTitle(course.title);
    setCourseCode(course.course_code);
    setDescription(course.description);
    setId(course.id);
  }

  async function DeleteCourse(id) {
    await axios.delete("http://127.0.0.1:8000/api/courses/" + id);
    alert("Course Deleted Successfully");
    setId("");
    setTitle("");
    setCourseCode("");
    setDescription("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/api/courses/" + id, {
        title,
        course_code: courseCode,
        description
      });
      alert("Course Updated Successfully");
      setId("");
      setTitle("");
      setCourseCode("");
      setDescription("");
      Load();
    } catch (err) {
      alert("Course Update Failed");
    }
  }

  return (
    <div>
      
      <div className="container mt-4 mb-32">
        <form>
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              className="form-control"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-primary mt-4 bg-blue ml-32" onClick={save}>AddInstance</button>
          </div>
        </form>
      </div>
      <button className="btn btn-primary mt-4 bg-blue ml-96">List Courses</button>
      <table className="table" align="center">
        <thead>
          <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Title</th>
            <th scope="col">Course Code</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {courses.map((course) => (
          <tbody key={course.id} className={course.id% 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <tr>
              <th scope="row">{course.id}</th>
              <td>{course.title}</td>
              <td>{course.course_code}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => editCourse(course)}>
                    <i className="fas fa-search"></i>
                </button>
                <button type="button" className="btn btn-danger" onClick={() => DeleteCourse(course.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default AddCourse;
