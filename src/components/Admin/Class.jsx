import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../BaseUrl';

const Class = () => {
  const [classesData, setClassesData] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    instructor: '',
    time: '',
    capacity: '',
    description: '',
    image: '',
  });

  // Fetch all classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/classes`);
        setClassesData(response.data);
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    };

    fetchClasses();
  }, []);

  // Handle input changes for the new class
  const handleInputChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  // Add a new class
  const addClass = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/classes`, newClass);
      setClassesData([...classesData, response.data]); // Add new class to the state
      setNewClass({ name: '', instructor: '', time: '', capacity: '', description: '', image: '' }); // Reset form
      alert('Class added successfully');
    } catch (error) {
      console.error('Error adding class', error);
    }
  };

  // Delete a class by ID
  const deleteClass = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/classes/${id}`);
      setClassesData(classesData.filter((classInfo) => classInfo._id !== id)); // Remove deleted class from state
      alert('Class deleted successfully');
    } catch (error) {
      console.error('Error deleting class', error);
    }
  };

  return (
    <div className="min-h-screen mx-auto md:p-8  w-full p-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">Class Management</h1>

      {/* Add New Class Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Add New Class</h2>
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          className="w-full p-2 mb-4 bg-[#030303fb] border rounded-lg border-gray-500 text-white"
          value={newClass.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          className="w-full p-2 mb-4 bg-[#030303fb] border rounded-lg border-gray-500 text-white"
          value={newClass.instructor}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="time"
          placeholder="Class Time"
          className="w-full p-2 mb-4 bg-[#030303fb] border rounded-lg border-gray-500 text-white"
          value={newClass.time}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="w-full p-2 mb-4 bg-[#030303fb] border rounded-lg border-gray-500 text-white"
          value={newClass.capacity}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Class Description"
          className="w-full p-2 mb-4  bg-[#030303fb] border rounded-lg border-gray-500 text-white"
          value={newClass.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full p-2 mb-4 bg-[#030303fb] border rounded-lg border-gray-500 text-white"
          value={newClass.image}
          onChange={handleInputChange}
        />
        <button onClick={addClass} className="bg-indigo-600 text-white p-2 rounded">
          Add Class
        </button>
      </div>

      {/* Classes Table */}
      <div className="overflow-x-auto   Width md:w-auto ">
        <table className="w-full table-auto bg-[#030303a8]   shadow-lg rounded-lg">
          <thead>
            <tr className=" text-white">
              <th className="p-4 border-b-2">Name</th>
              <th className="p-4 border-b-2">Instructor</th>
              <th className="p-4 border-b-2">Time</th>
              <th className="p-4 border-b-2">Capacity</th>
              <th className="p-4 border-b-2">Description</th>
              <th className="p-4 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classesData.map((classInfo) => (
              <tr key={classInfo._id} className="border-b">
                <td className="p-4">{classInfo.name}</td>
                <td className="p-4">{classInfo.instructor}</td>
                <td className="p-4">{classInfo.time}</td>
                <td className="p-4">{classInfo.capacity}</td>
                <td className="p-4">{classInfo.description.split(" ").slice(0, 8).join(" ")}...</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteClass(classInfo._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Class;
