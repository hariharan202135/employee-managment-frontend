import { useEffect, useState } from "react";
import "./EmployeeDashboard.css";

const API_URL = "https://employee-managment-system-backend-8.onrender.com";

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

        // Logged-in employee (demo purpose)
        setEmployee(data[0]);
      } catch (error) {
        console.error("Failed to load employee profile", error);
      }
    };

    fetchEmployeeProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!employee) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <div className="employee-page">
      {/* Heading */}
      <h1 className="employee-title">Employee Dashboard</h1>

      {/* Logout */}
      <button className="employee-logout" onClick={handleLogout}>
        Logout
      </button>

      {/* Profile Card */}
      <div className="employee-card">
        <h2 className="profile-title">My Profile</h2>

        <div className="detail-row">
          <span>Name</span>
          <strong>{employee.name}</strong>
        </div>

        <div className="detail-row">
          <span>Email</span>
          <strong>{employee.email}</strong>
        </div>

        <div className="detail-row">
          <span>Department</span>
          <strong>{employee.department}</strong>
        </div>

        <div className="detail-row">
          <span>Salary</span>
          <strong>₹ {employee.salary}</strong>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
