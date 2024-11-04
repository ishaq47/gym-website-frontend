import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../BaseUrl';
import Modal from './Modal';

function Member() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    memberName: '',
    cnic: '',
    fatherName: '',
    phoneNumber: '',
    address: '',
    registrationDate: '',
    feeSubmitted: false,
    photo: null,
  });

  // Fetch members from the API
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/members`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Reset fee status to not submitted on the 1st of each month
  useEffect(() => {
    const today = new Date();
    if (today.getDate() === 1) {
      setMembers((prevMembers) =>
        prevMembers.map((member) => ({ ...member, feeSubmitted: false }))
      );
    }
  }, []);

  // Update form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload for photo
  const handleFileChange = (e) => {
    setNewMember((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  // Toggle fee status
  const handleFeeStatusChange = (status) => {
    setNewMember((prev) => ({ ...prev, feeSubmitted: status }));
  };

  // Add new member to the list
  const handleAddMember = async () => {
    const formData = new FormData();
    for (const key in newMember) {
      formData.append(key, newMember[key]);
    }

    try {
      const response = await axios.post(`${baseUrl}/api/members`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMembers((prev) => [...prev, response.data]);
      setNewMember({
        memberName: '',
        cnic: '',
        fatherName: '',
        phoneNumber: '',
        address: '',
        registrationDate: '',
        feeSubmitted: false,
        photo: null,
      });
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  // Open modal to show member details
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // Delete a member
  const handleDeleteMember = async () => {
    try {
      await axios.delete(`${baseUrl}/api/members/${selectedMember._id}`);
      setMembers((prev) => prev.filter((member) => member._id !== selectedMember._id));
      setIsModalOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="w-full p-4 text-white bg-[#030303e0]">
      <h2 className="text-xl font-semibold mb-4">Add Member</h2>
      <div className="space-y-2">
        <div>
          <label>Member Name</label>
          <input
            type="text"
            name="memberName"
            placeholder="Member Name"
            value={newMember.memberName}
            onChange={handleInputChange}
            className="w-full p-2 bg-[#030303fb] border rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>CNIC</label>
          <input
            type="text"
            name="cnic"
            placeholder="CNIC"
            value={newMember.cnic}
            onChange={handleInputChange}
            className="w-full p-2 bg-[#030303fb] border rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>Father's Name</label>
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={newMember.fatherName}
            onChange={handleInputChange}
            className="w-full p-2 bg-[#030303fb] border rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newMember.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 bg-[#030303fb] border rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={newMember.address}
            onChange={handleInputChange}
            className="w-full p-2 bg-[#030303fb] border rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>Registration Date</label>
          <input
            type="date"
            name="registrationDate"
            value={newMember.registrationDate}
            onChange={handleInputChange}
            className="w-full p-2 bg-[#030303fb] border text-white rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={handleFileChange}
            className="w-full p-2 bg-[#030303fb] border rounded-lg border-gray-500"
          />
        </div>
        <div>
          <label>Fee Status</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="feeSubmitted"
                value="true"
                checked={newMember.feeSubmitted === true}
                onChange={() => handleFeeStatusChange(true)}
                className="mr-2"
              />
              Submitted
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="feeSubmitted"
                value="false"
                checked={newMember.feeSubmitted === false}
                onChange={() => handleFeeStatusChange(false)}
                className="mr-2"
              />
              Not Submitted
            </label>
          </div>
        </div>
        <button onClick={handleAddMember} className="bg-blue-500 text-white p-2 rounded">
          Add Member
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-8">Members List</h3>
      <div className="overflow-x-auto mt-4 Width md:w-auto">
        <table className="text-left bg-[#030303a8]">
          <thead>
            <tr className=" text-white">
              <th className="p-2">Photo</th>
              <th className="p-2">Member Name</th>
              <th className="p-2">CNIC</th>
              <th className="p-2">F Name</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">Address</th>
              <th className="p-2">Registration Date</th>
              <th className="p-2">Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="text-gray-400 cursor-pointer hover:bg-gray-700" onClick={() => handleMemberClick(member)}>
                <td className="p-2">
                  <img src={`${baseUrl}/${member.photo}`} alt="member" className="w-12 h-12 object-cover rounded-full" />
                </td>
                <td className="p-2">{member.memberName}</td>
                <td className="p-2">{member.cnic}</td>
                <td className="p-2">{member.fatherName}</td>
                <td className="p-2">{member.phoneNumber}</td>
                <td className="p-2">{member.address}</td>
                <td className="p-2">{member.registrationDate}</td>
                <td className="p-2">{member.feeSubmitted ? 'Submitted' : 'Not Submitted'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          member={selectedMember}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteMember}
        />
      )}
    </div>
  );
}

export default Member;

