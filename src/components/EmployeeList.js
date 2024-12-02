import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`);
                setEmployees(employees.filter((employee) => employee._id !== id));
                alert('Employee deleted successfully!');
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee. Please try again.');
            }
        }
    };

    return (
        <div className="employee-list-container">
            <div className="header">
                <h2>Employee List</h2>
                <Link to="/add-employee" className="btn add-employee-btn">
                    Add Employee
                </Link>
            </div>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td className="actions">
                                <Link to={`/edit-employee/${employee._id}`} className="btn edit-btn">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(employee._id)}
                                    className="btn delete-btn"
                                >
                                    Delete
                                </button>
                                <Link to={`/view-employee/${employee._id}`} className="btn view-btn">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {employees.length === 0 && <p className="no-employees">No employees found. Add some employees!</p>}
        </div>
    );
};

export default EmployeeList;
