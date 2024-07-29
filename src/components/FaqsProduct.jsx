import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';

const FAQSection = (props) => {
  const pid = props.pid;
  const auth = props.auth
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [visibleFAQs, setVisibleFAQs] = useState(2);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    product_id: pid,
  });

  useEffect(() => {
    // Fetch FAQ data from the API
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`api/fetchAllQuestionAnswers?pid=${pid}`, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
              'Accept': '*/*',
              'channel-code': 'ANDROID'
            }
          });
        if (response.data.status === 'success') {
          setFaqs(response.data.Data);
        }
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFAQs();
  }, []);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setVisibleFAQs(expanded ? 2 : faqs.length);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'api/postYourQuestion',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'Channel-Code': 'ANDROID',
          },
        }
      );
      if (response.data.status === 'success') {
        // Handle success
        alert('Question posted successfully!');
        setShowForm(false); // Hide the form after submission
        setFormData({ ...formData, question: '' }); // Reset the form
      }
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleLikeUnlike = async (questionId, action) => {
    try {
      const response = await axios.post(
        'api/likeUnlikeQuestion',
        {
          question_id: questionId,
          action: action,
        },
        {
          headers: {
            'Channel-Code': 'ANDROID',
            'Auth': auth
          },
        }
      );
      if (response.data.status === 'success') {
        // Update likes/unlikes in state
        setFaqs(prevFaqs => prevFaqs.map(faq =>
          faq.id === questionId ? {
            ...faq,
            qa_like: action === '1' ? faq.qa_like + 1 : faq.qa_like,
            qa_unlike: action === '0' ? faq.qa_unlike + 1 : faq.qa_unlike,
          } : faq
        ));
      }
    } catch (error) {
      console.error('Error liking/unliking question:', error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 mx-auto my-12 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
        <button
          className="text-red-600 font-semibold bg-red-100 px-4 py-2 rounded-md hover:bg-red-200 transition"
          onClick={() => setShowForm(true)}
        >
          ASK NOW
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6">
          
          {/* <div className="mb-6">
            <label htmlFor="question" className="block text-xl font-semibold text-gray-800">
                Your Question
            </label>
            <input
                type="text"
                name="question"
                id="question"
                value={formData.question}
                onChange={handleFormChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Type your question here..."
                required
            />
            </div> */}


<div className="mb-6">
  <label htmlFor="question" className="block text-xl font-semibold text-gray-800 mb-2">
    Your Question
  </label>
  <input
    type="text"
    name="question"
    id="question"
    value={formData.question}
    onChange={handleFormChange}
    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 ease-in-out"
    placeholder="Type your question here..."
    required
  />
</div>




          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Submit Question
          </button>
        </form>
      )}
      <p className="text-gray-500 mb-6">Displaying Questions {visibleFAQs} / {faqs.length}</p>
      {faqs.slice(0, visibleFAQs).map((faq, index) => (
        // <div key={faq.id} className="border-b border-dotted border-gray-300 pb-6 mb-6">
        //   <h3 className="font-semibold text-xl text-gray-700 mb-2">Q{index + 1}: {faq.question}</h3>
        //   <p className="text-gray-600 text-lg">Ans: {faq.answer || 'No answer yet.'}</p>
        //   <div className="flex items-center gap-4 mt-2">
        //     <button className="flex items-center text-gray-600" onClick={() => handleLikeUnlike(faq.id, '1')}>
        //       <FaThumbsUp className="mr-1" /> {faq.qa_like}
        //     </button>
        //     <button className="flex items-center text-gray-600" onClick={() => handleLikeUnlike(faq.id, '0')}>
        //       <FaThumbsDown className="mr-1" /> {faq.qa_unlike}
        //     </button>
        //   </div>
        // </div>

        <div key={faq.id} className="border border-gray-300 rounded-lg shadow-md p-6 mb-6 bg-white hover:bg-gray-50 transition-colors duration-300">
  <h3 className="font-semibold text-2xl text-gray-800 mb-3">Q{index + 1}: {faq.question}</h3>
  <p className="text-gray-700 text-lg mb-4">Ans: {faq.answer || 'No answer yet.'}</p>
  <div className="flex items-center gap-4">
    <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-200" onClick={() => handleLikeUnlike(faq.id, '1')}>
      <FaThumbsUp className="mr-1" /> {faq.qa_like}
    </button>
    <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200" onClick={() => handleLikeUnlike(faq.id, '0')}>
      <FaThumbsDown className="mr-1" /> {faq.qa_unlike}
    </button>
  </div>
</div>



        
      ))}
      <button
        className="flex items-center text-blue-600 font-semibold mt-4 hover:text-blue-700 transition"
        onClick={handleToggleExpand}
      >
        {expanded ? 'VIEW LESS FAQs' : 'VIEW MORE FAQs'}
        {expanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
      </button>
    </div>
  );
};

export default FAQSection;
