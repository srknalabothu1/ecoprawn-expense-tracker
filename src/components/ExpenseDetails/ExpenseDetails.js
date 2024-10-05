import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteUser, getUsers } from '../../services/ApiManager';
import DeleteModal from '../Model/DeleteModal';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

const ExpenseDetails = () => {
  const { itemId, id } = useParams();
  const navigate = useNavigate();
  const [purchases, setPurchase] = useState([]);
  const [originalPurchases, setOriginalPurchases] = useState([]); // Store original purchases
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const itemsPerPage = 10;

  const createForm = () => {
    navigate(`/create/${itemId}/${id}`);
  };

  const getDetails = async () => {
    try {
      const result = await getUsers();
      const filteredResults = result.filter(item => 
        item.type === itemId && item.date.split("-")[1] === id
      );
      setPurchase(filteredResults);
      setOriginalPurchases(filteredResults); // Store the original purchases
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onDelete = (index) => {
    setIndex(index);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const onDeleteRecord = async () => {
    setLoading(true);
    await deleteUser(index);
    setIsOpen(!isOpen);
    setLoading(false);
    getDetails();
  };

  // Calculate the items to display on the current page
  const indexOfLastPurchase = currentPage * itemsPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - itemsPerPage;
  const currentPurchases = purchases.slice(indexOfFirstPurchase, indexOfLastPurchase);

  const onSearchByName = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    // Filter purchases by name
    const filtered = originalPurchases.filter(purchase =>
      purchase.name.toLowerCase().includes(value)
    );
    setPurchase(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearFilter = () => {
    setSearchValue('');
    setPurchase(originalPurchases); // Reset purchases to the original list
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="max-w-full overflow-x-auto p-4">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4 text-[#ffff00] mt-[-17px]">{`${itemId} Table`}</h1>
        <button className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600 mt-[-17px]" onClick={createForm}>
          {`Create ${itemId}`}
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder=' Search by name'
            className='px-4 py-2'
            onChange={onSearchByName}
            value={searchValue}
            style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }} // Inline style to remove clear button
          />
          <button 
            onClick={clearFilter} 
            className="ml-2 bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
          >
            Clear Filter
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mt-4">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-3 px-4 text-left text-gray-600"> Date</th>
            <th className="py-3 px-4 text-left text-gray-600"> Name</th>
            <th className="py-3 px-4 text-left text-gray-600"> Age </th>
            <th className="py-3 px-4 text-left text-gray-600"> Amount</th>
            <th className="py-3 px-4 text-left text-gray-600"> Location</th>
            <th className="py-3 px-4 text-left text-gray-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <Loader /> : currentPurchases.map((purchase) => (
            <tr className="border-b border-gray-200" key={purchase._id}>
              <td className="py-3 px-4 text-gray-700">{purchase.date}</td>
              <td className="py-3 px-4 text-gray-700">{purchase.name}</td>
              <td className="py-3 px-4 text-gray-700">{purchase.age}</td>
              <td className="py-3 px-4 text-gray-700">RS {purchase.amount}</td>
              <td className="py-3 px-4 text-gray-700">{purchase.location}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onDelete(purchase._id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
          {isOpen && <DeleteModal isOpen onClose={onClose} onDelete={onDeleteRecord} />}
        </tbody>
      </table>
      <Pagination 
        totalItems={purchases.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

ExpenseDetails.propTypes = {
  purchases: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExpenseDetails;
