import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = "https://employee-managment-system-backend-8.onrender.com";
  const token = localStorage.getItem("token");

  // ✅ Fetch Employees (wrapped with useCallback)
  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [API_URL, token]);

  // ✅ Safe useEffect
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // ✅ Add Employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API_URL}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, department, salary }),
      });

      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await fetch(`${API_URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Add Employee */}
        <div className="card">
          <h2>Add Employee</h2>
          <form className="add-form" onSubmit={handleAddEmployee}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <button type="submit" className="add-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </form>
        </div>

        {/* Employee List */}
        <div className="card">
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>₹ {emp.salary}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-data">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
