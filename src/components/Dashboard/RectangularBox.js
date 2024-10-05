import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RectangularBox.css'; // Import the CSS file for styling

const RectangularBox = ({
  width,
  height,
  backgroundColor,
  margin,
  seedsText,
  expensesText,
  purchaseDateText,
  seedsTextColor,
  expensesTextColor,
  purchaseDateTextColor,
  selectedMonth
}) => {
  const navigate = useNavigate();
  const onBoxClick = () => {
    console.log('seedsText', seedsText)
    navigate(`/details/${seedsText}/${selectedMonth}`);
  }
  return (
    <div
      className="relative flex flex-col justify-center cursor-pointer"
      style={{ width, height, backgroundColor, margin }}
      onClick={()=>onBoxClick()}
    >
      {/* Centered "Seeds" text */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 text-2xl"
        style={{ color: seedsTextColor }}
      >
        {seedsText}
      </div>

      {/* Content below "Seeds" */}
      <div className="flex flex-col items-start mt-16 mx-2">
        <div className="flex flex-col space-y-6">
          <div
            className="text-left"
            style={{ color: expensesTextColor }}
          >
            {expensesText}
          </div>
          <div
            className="text-left"
            style={{ color: purchaseDateTextColor }}
          >
            {purchaseDateText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectangularBox;
