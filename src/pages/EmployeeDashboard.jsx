import { useEffect, useState } from "react";

const API_URL = "https://employee-managment-system-backend-6.onrender.com";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // ✅ Assuming logged-in employee is returned
        // If admin logs in, this page won’t be used
        setEmployee(data[0]);
      } catch (error) {
        console.error("Failed to fetch employee profile", error);
      }
    };

    fetchEmployeeProfile();
  }, [token]);

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
            <th>Department</th>
            <td>{employee.department}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>{employee.salary}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
