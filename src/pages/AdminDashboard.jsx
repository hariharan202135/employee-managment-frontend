import { useEffect, useState } from "react";

const API_URL = "https://employee-managment-system-backend-6.onrender.com";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const token = localStorage.getItem("token");

  // ✅ useEffect with fetch INSIDE (NO ESLINT ERRORS)
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch(`${API_URL}/api/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, [token]);

  // ✅ Add employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        department,
        salary,
      }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");

      // refresh list
      const updated = await fetch(`${API_URL}/api/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(await updated.json());
    } else {
      alert("Failed to add employee");
    }
  };

  // ✅ Delete employee
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <h3>Add Employee</h3>
      <form onSubmit={handleAddEmployee}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <input placeholder="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <button type="submit">Add</button>
      </form>

      <h3>Employee List</h3>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table border="1" cellPadding="10">
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
                <td>{emp.salary}</td>
                <td>
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
