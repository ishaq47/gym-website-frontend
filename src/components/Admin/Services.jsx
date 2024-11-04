import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../BaseUrl';

function Services() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const addService = async () => {
    try {
      // Ensure price is a number
      const serviceToPost = {
        ...newService,
        price: parseFloat(newService.price), // Convert price to a number
      };

      const response = await axios.post(`${baseUrl}/api/admin/services`, serviceToPost);
      console.log(response.data); // Log the response for debugging
      setNewService({ name: '', description: '', price: '' }); // Reset form
      alert('Service added successfully');

      // Fetch updated services
      const servicesResponse = await axios.get(`${baseUrl}/api/admin/services`);
      setServices(servicesResponse.data);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        console.error('Error adding service:', error.response.data);
        alert(`Error adding service: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
        alert('No response received from the server. Please try again later.');
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/admin/services/${id}`);
      setServices(services.filter(service => service._id !== id));
    } catch (error) {
      console.error('Error deleting service', error);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-8 text-white">Manage Services</h2>

      {/* Add New Service */}
      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          className="w-full p-2 mb-4 bg-[#030303a8] text-white"
          value={newService.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Service Description"
          className="w-full p-2 mb-4 bg-[#030303a8] text-white"
          value={newService.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Service Price"
          className="w-full p-2 mb-4 bg-[#030303a8] text-white"
          value={newService.price}
          onChange={handleInputChange}
        />
        <button onClick={addService} className="bg-indigo-600 text-white p-2 rounded">
          Add Service
        </button>
      </div>

      {/* Service List */}
      <div className="bg-[#030303a8] rounded-lg shadow-lg p-6">
        <ul>
          {services.map((service) => (
            <li key={service._id} className="mb-4">
              <h3 className="text-lg font-bold">{service.name}</h3>
              <p>{service.description}</p>
              <p className="text-indigo-600 font-bold">Price: ${service.price}</p>
              <button
                onClick={() => deleteService(service._id)}
                className="bg-red-600 text-white p-2 rounded mt-2"
              >
                Delete Service
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Services;
