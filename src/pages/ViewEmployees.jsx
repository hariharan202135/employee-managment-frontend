import { useEffect, useState } from "react";
import axios from "axios";

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://employee-managment-system-backend-tw8.onrender.com/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(res.data);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.department} - ₹{emp.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewEmployees;
