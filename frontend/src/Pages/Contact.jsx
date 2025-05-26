import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,     // Replace with your EmailJS Service ID
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,    // Replace with your EmailJS Template ID
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY      // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          toast.success('Your message has been sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          toast.error('Something went wrong. Please try again.');
          console.error(error);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pink-50 font-playfair py-10 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden md:flex">
          <div className="hidden md:flex w-1/2 items-stretch">
            <img
              src="https://res.cloudinary.com/dmvtv7s5m/image/upload/v1747918004/20240706_162844_e9gug8.jpg"
              alt="Plant"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
              className="object-contain rounded-l-3xl"
            />
          </div>

          <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Let's Connect 📸</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-3 text-lg placeholder-gray-500 transition-all"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-3 text-lg placeholder-gray-500 transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-3 text-lg placeholder-gray-500 transition-all resize-none"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white text-lg py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
