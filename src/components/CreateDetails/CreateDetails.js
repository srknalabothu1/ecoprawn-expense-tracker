import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser } from '../../services/ApiManager';
import Loader from '../Loader/Loader';

const CreateDetails = () => {
  const [formData, setFormData] = useState({
    purchaseDate: '',
    purchasedPerson: '',
    purchasedAmount: '',
    purchaseLocation: '',
    age:''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { itemId, id } = useParams();
  console.log(itemId, 'itemIditemIditemId');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data Submitted:', formData);
    const { purchaseDate, purchaseLocation, purchasedAmount, purchasedPerson,age} = formData
    const payload = {
      name: purchasedPerson,
      date: purchaseDate,
      amount: purchasedAmount,
      location: purchaseLocation,
      age: age,
      type:itemId
    }
    setLoading(true);
    createUser(payload).then((res) => {
      console.log(res, 'resultresultresult');
      setLoading(false);
      navigate(`/details/${itemId}/${id}`);
    }).catch((err) => {
      console.log(err, 'errerr');

    })
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {loading ? <Loader /> : <>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          {`${itemId} Form`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="purchaseDate" className="block text-gray-600 font-medium mb-1"> Date</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="purchasedPerson" className="block text-gray-600 font-medium mb-1"> Name</label>
            <input
              type="text"
              id="purchasedPerson"
              name="purchasedPerson"
              value={formData.purchasedPerson}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-600 font-medium mb-1"> Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="purchasedAmount" className="block text-gray-600 font-medium mb-1"> Amount</label>
            <input
              type="number"
              id="purchasedAmount"
              name="purchasedAmount"
              value={formData.purchasedAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ 
                MozAppearance: 'textfield' // for Firefox
              }}
               />
          </div>
          <div>
            <label htmlFor="purchaseLocation" className="block text-gray-600 font-medium mb-1"> Location</label>
            <input
              type="text"
              id="purchaseLocation"
              name="purchaseLocation"
              value={formData.purchaseLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit
          </button>
        </form></>}
    </div>
  );
};

export default CreateDetails;
