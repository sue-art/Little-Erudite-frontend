import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { sendMessage } from "../components/admin/users/UsersFetchAPI";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((email, name, message)) {
      setLoading(true);
      const request = await sendMessage(email, name, message);

      if (request) {
        setLoading(false);
        setSuccessMessage(
          "Message sent successfully! We will get back to you soon."
        );
      } else {
        setError("Error sending message. Please try again later.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
    }
  }, [successMessage, loading]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
        {loading && (
          <div className="text-center">
            <Loader />
          </div>
        )}
        {successMessage && successMessage}
        {error && (
          <div
            className="bg-red border border-red text-white px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {successMessage ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                value={name}
                onChange={handleNameChange}
                className="block w-full rounded-md border border-green border-1 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                required
                className="block w-full rounded-md border border-green p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                rows="6"
                cols="50"
                required
                onChange={handleMessageChange}
                className="block w-full rounded-md border border-green p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="submit"
              className="flex w-full bg-green text-white rounded-full p-3"
            >
              <p className="w-full items-center text-white">Send Message</p>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
