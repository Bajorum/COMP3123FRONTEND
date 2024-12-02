import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEmployee.css';

const AddEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/employees', {
                firstName,
                lastName,
                email,
            });
            alert('Employee added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="add-employee-container">
            <div className="add-employee-card">
                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Id</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn save-btn">
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
