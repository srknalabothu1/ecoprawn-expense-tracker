// src/App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation/Navigation';
import ExpenseDetails from './components/ExpenseDetails/ExpenseDetails';
import CreateDetails from './components/CreateDetails/CreateDetails';
import Loader from '../src/components/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {
        loading ? <Loader /> :
          <div className="bg-custom-bg bg-cover bg-center h-screen w-screen">
            <p className='flex ml-[30px] pt-[17px] custom-pink'>
              <FontAwesomeIcon icon={faHome} className="cursor-pointer" onClick={onHomeClick} color='#ff1493' />
            </p><Navigation /><Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/details/:itemId/:id" element={<ExpenseDetails />} />
              <Route path="/create/:itemId/:id" element={<CreateDetails />} />
              {/* Add more routes here if needed */}
            </Routes>

          </div>}
    </>
  );
}

export default App;
