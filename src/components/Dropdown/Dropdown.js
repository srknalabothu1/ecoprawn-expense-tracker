// src/components/Dropdown.js

import React, { useEffect, useState } from 'react';

const months = [
    { key: 'January', value: '01' },
    { key: 'February', value: '02' },
    { key: 'March', value: '03' },
    { key: 'April', value: '04'},
    { key: 'May', value: '05' },
    { key: 'June', value: '06' },
    { key: 'July', value: '07' },
    { key: 'August', value: '08' },
    { key: 'September', value: '09' },
    { key: 'October', value: '10' },
    { key: 'November', value: '11' },
    { key: 'December', value: '12' }
];

const Dropdown = ({ selectedMonthProp }) => {

    const [selectedMonth, setSelectedMonth] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectMonth = (month) => {
        setSelectedMonth(month);
        setIsOpen(false);
    };
    useEffect(() => {

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // returns a zero-based index (0 for January, 11 for December)

        // If you want the month in a human-readable format (1 for January, 12 for December)
        const humanReadableMonth = currentMonth;
        setSelectedMonth(months[humanReadableMonth].key)
        selectedMonthProp(months[humanReadableMonth].value)
        console.log(humanReadableMonth, 'humanReadableMonth');
    }, [])
    return (
        <div className="relative flex justify-end text-left mr-12" >
            <div>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {selectedMonth}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {months.map((month, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    selectedMonthProp(month.value);
                                    selectMonth(month.key)
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {month.key}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
