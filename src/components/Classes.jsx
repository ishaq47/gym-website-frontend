import React, { useState, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';
import axios from 'axios';
import { baseUrl } from '../BaseUrl';

// ClassCard component to display individual class details
const ClassCard = ({ classInfo }) => {
  return (
    <div className="bg-[#2523239d] rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg overflow-hidden">
      <img src={classInfo.image} alt={classInfo.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{classInfo.name}</h3>
        <p className="text-white mb-2">Instructor: {classInfo.instructor}</p>
        <div className="flex items-center text-white mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>{classInfo.time}</span>
        </div>
        <div className="flex items-center text-white mb-4">
          <Users className="w-4 h-4 mr-2" />
          <span>Capacity: {classInfo.capacity}</span>
        </div>
        <div className="mt-4">
          <p className='text-white'>Description:</p>
          <p className="text-gray-400 mb-4">{classInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

// Main Classes component
const Classes = () => {
  const [classesData, setClassesData] = useState([]);

  // Fetch all classes from the API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/classes`);
        setClassesData(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">Our Gym Classes</h1>

      {/* Classes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classesData?.map((classInfo) => (
          <ClassCard key={classInfo._id} classInfo={classInfo} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
