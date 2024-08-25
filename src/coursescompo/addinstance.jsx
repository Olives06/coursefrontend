import { useEffect, useState } from "react";
import axios from "axios";


function AddInstance() {
  const [id, setId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/instances/");
    setInstances(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/instances/", {
        year,
        semester,
        course
      });
      alert("Instance Added Successfully");
      setId("");
      setYear("");
      setSemester("");
      setCourse("");
      Load();
    } catch (err) {
      alert("Instance Registration Failed");
    }
  }

  async function editInstance(instance) {
    setYear(instance.year);
    setSemester(instance.semester);
    setCourse(instance.course);
    setId(instance.id);
  }

  async function DeleteInstance(id) {
    await axios.delete("http://127.0.0.1:8000/api/instances/" + id);
    alert("Instance Deleted Successfully");
    setId("");
    setYear("");
    setSemester("");
    setCourse("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/api/instances/" + id, {
        year,
        semester,
        course
      });
      alert("Instance Updated Successfully");
      setId("");
      setYear("");
      setSemester("");
      setCourse("");
      Load();
    } catch (err) {
      alert("Instance Update Failed");
    }
  }

  return (
    <div>
      <h1>Course Instance Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              className="form-control"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Semester</label>
            <input
              type="text"
              className="form-control"
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Course ID</label>
            <input
              type="text"
              className="form-control"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>Register</button>
            <button className="btn btn-warning mt-4" onClick={update}>Update</button>
          </div>
        </form>
      </div>

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Instance ID</th>
            <th scope="col">Year</th>
            <th scope="col">Semester</th>
            <th scope="col">Course</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {instances.map((instance) => (
          <tbody key={instance.id}>
            <tr>
              <th scope="row">{instance.id}</th>
              <td>{instance.year}</td>
              <td>{instance.semester}</td>
              <td>{instance.course}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => editInstance(instance)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => DeleteInstance(instance.id)}>Delete</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default AddInstance;
