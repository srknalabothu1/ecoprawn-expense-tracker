/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import RectangularBox from "./RectangularBox";
import { getUsers } from "../../services/ApiManager";
import { data } from "../../utils/constant";


function Dashboard() {
  const [cardData, setCardData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalByMonth, setTotalByMonth] = useState({});
  console.log(totalByMonth, 'totalByMonth', selectedMonth);
  const getDetails = async () => {
    const result = await getUsers();
    const totals = calculateTotalByMonthAndType(result) || {};
    setTotalByMonth(totals);
  };

  // Function to group data by month and type, and calculate total amount spent
  function calculateTotalByMonthAndType(data) {
    const result = {};
    data?.forEach(item => {
      const month = item.date.split("-")[1];
      const type = item.type;

      if (!result[month]) {
        result[month] = {};
      }
      if (!result[month][type]) {
        result[month][type] = 0;
      }
      result[month][type] += item.amount;
    });
    return result[selectedMonth];
  }

  useEffect(() => {
    if (selectedMonth !== '') getDetails()
  }, [selectedMonth]);
  // Function to prepare card data based on selected month totals
  const finalCardsData = () => {
    if (!selectedMonth) return data; // Return original data if no month selected

    return data?.map(item => {
      const totalExpense = Object.keys(totalByMonth).length && totalByMonth[item.seedsText] || 0; // Default to 0 if not found
      return {
        ...item,
        expensesText: `Expenses: ${totalExpense} Inr` // Update expenses text
      };
    });
  };

  console.log(finalCardsData(), 'finalCardsData()');
  return (
    <>
      <Dropdown selectedMonthProp={setSelectedMonth} />
      <div className="p-4 flex flex-wrap gap-4">
        {finalCardsData()?.map((item, index) =>
          <RectangularBox
            key={index}
            width="300px"
            height="200px"
            backgroundColor={'white'}
            margin="20px"
            seedsText={item.seedsText}
            expensesText={item.expensesText}
            seedsTextColor={item.seedsTextColor} // Custom color for "Seeds"
            expensesTextColor={item.expensesTextColor} // Custom color for Expenses
            selectedMonth={selectedMonth}
          />
        )}
        {/* Optionally, you can add content here */}
      </div>
    </>
  );
}

export default Dashboard;
