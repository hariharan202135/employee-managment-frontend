import { useEffect, useState } from "react";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setEmployee(JSON.parse(storedUser));
    }
  }, []);

  if (!employee) {
    return <p>Loading employee profile...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Employee Dashboard</h1>

      <h3>My Profile</h3>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{employee.email}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{employee.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
