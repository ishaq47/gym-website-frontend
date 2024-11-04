// Modal.js
import { CrossIcon, Delete, DeleteIcon, ShieldCloseIcon, Trash } from 'lucide-react';
import React from 'react';
import { baseUrl } from '../../BaseUrl';

const Modal = ({ member, onClose, onDelete }) => {
  if (!member) return null; // Don't render if no member is selected

  return (
    <div className="fixed inset-0 flex items-center justify-center  md:auto bg-black bg-opacity-50 z-50">
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg max-w-md w-full Modal">
        <ShieldCloseIcon  onClick={onClose} className='float-right cursor-pointer'/>
        <h3 className="text-lg font-semibold mb-4">Member Details</h3>
       <div className='flex justify-center my-2'> <img src={`${baseUrl}/${member.photo}`} alt="member" className="w-28 h-28 object-cover rounded-full" /></div>
        <div className="mb-2"><strong>Member Name :</strong>  <span className='text-gray-400'>{member.memberName}</span></div>
        <div className="mb-2"><strong>CNIC :</strong> <span className='text-gray-400'>{member.cnic}</span> </div>
        <div className="mb-2"><strong>Father's Name :</strong> <span className='text-gray-400'>{member.fatherName}</span> </div>
        <div className="mb-2"><strong>Phone Number :</strong><span className='text-gray-400'> {member.phoneNumber}</span></div>
        <div className="mb-2"><strong>Address :</strong>  <span className='text-gray-400'>{member.address}</span></div>
        <div className="mb-2"><strong>Registration Date :</strong> <span className='text-gray-400'>{member.registrationDate}</span> </div>
        <div className="mb-2"><strong>Fee Status :</strong> <span className='text-gray-400'>{member.feeSubmitted ? 'Submitted' : 'Not Submitted'}</span> </div>
        
       
        <Trash   onClick={onDelete} className='cursor-pointer float-right'/>
        
      </div>
    </div>
  );
};

export default Modal;
