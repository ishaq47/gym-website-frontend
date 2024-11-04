import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add a function here to send formData to a backend or an email service
        alert('Form submitted');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-6 background ">
            <div className="w-full max-w-lg bg-[#241010a6] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Contact Swabi Muscles Gym (SMG)</h2>
                <p className="text-center text-white mb-8">We'd love to hear from you! Please fill out the form below.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-1" htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter subject"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-1" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-500 text-white rounded-lg focus:outline-none bg-transparent focus:border-blue-500"
                            rows="4"
                            placeholder="Type your message here"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
