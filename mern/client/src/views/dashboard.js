import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
import {renderDonutChart, renderLineChart} from '../components/charts'
import './dashboard.css'
import axios from 'axios'

let allTransactions = [];

const fetchData = async (start, end) => {
  let dailyTransactions = [];
  let transactionsData = [];
  let rangeIncome = 0;

  try {
    // Convert start and end dates to ISO strings
    const startDate = new Date(start).toISOString().split('T')[0];
    const endDate = new Date(end).toISOString().split('T')[0];

    // Fetch transactions data
    const transactionsResponse = await axios.get('http://localhost:5000/server/users/agg_data', {
      params: {
        dateRangeStart: startDate,
        dateRangeEnd: endDate,
        sum: false
      }
    });
    transactionsData = transactionsResponse.data;

    // Calculate the number of days in the date range
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round(Math.abs((new Date(endDate) - new Date(startDate)) / oneDay));

    // Process transactions data
    for (let i = 0; i <= diffDays; i++) {
      let currentDateStr = new Date(start);
      currentDateStr.setDate(currentDateStr.getDate() + i);
      currentDateStr = currentDateStr.toISOString().split('T')[0];
      let dailyIncome = 0;

      // Filter transactions for the current date
      const transactionsForDay = transactionsData.filter(transaction => {
        const transactionDate = transaction.date.split('T')[0];
        return transactionDate === currentDateStr;
      });

      // Calculate daily net income
      for (const transaction of transactionsForDay) {
        dailyIncome += transaction.amount;
      }

      // Update range income
      rangeIncome += dailyIncome;

      // Store the result in the format { date: 'YYYY-MM-DD', value: net_income }
      dailyTransactions.push({ date: currentDateStr, value: -(rangeIncome) });
    }

    console.log(dailyTransactions);
    return dailyTransactions;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  // use 1 month data by default
  let endDate = new Date(); // Current date
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - 30); // 30 days ago
  allTransactions = await fetchData(startDate, endDate);
  console.log(allTransactions);
const Dashboard = (props) => {
  const [chartData, setChartData] = useState(allTransactions);
  // set range to 1 week
  const oneWeekRange = async () => {
    startDate = new Date(endDate.getTime() - (7*24*60*60*1000)); // 7 days ago
    const data = await fetchData(startDate, endDate);
    console.log(startDate)
    setChartData(data); // Update state with fetched data
    renderLineChart(data, 7, '.dashboard-line-graph-container');
  };  

  // set range to 1 month
  const oneMonthRange = async () => {
    startDate = new Date(endDate.getTime() - (30*24*60*60*1000)); // 30 days ago
    const data = await fetchData(startDate, endDate);
    setChartData(data); // Update state with fetched data
    renderLineChart(data, 30, '.dashboard-line-graph-container');
  };  

  // set range to 3 months
  const threeMonthsRange = async () => {
    startDate = new Date(endDate.getTime() - (90*24*60*60*1000)); // 90 days ago
    console.log(startDate)
    const data = await fetchData(startDate, endDate);
    console.log(data)
    //setChartData(data); // Update state with fetched data
    renderLineChart(data, 90, '.dashboard-line-graph-container');
  };  

  // set range to 6 months
  const sixMonthsRange = async () => {
    startDate = new Date(endDate.getTime() - (180*24*60*60*1000)); // 180 days ago
    console.log(endDate)
    const data = await fetchData(startDate, endDate);
    setChartData(data); // Update state with fetched data
    renderLineChart(data, 180, '.dashboard-line-graph-container');
  };  

  // set range to 1 year
  const oneYearRange = async () => {
    startDate = new Date(endDate.getTime() - (365*24*60*60*1000));
    console.log(startDate)
    const data = await fetchData(startDate, endDate);
    setChartData(data); // Update state with fetched data
    renderLineChart(data, 365, '.dashboard-line-graph-container');
  }; 

  const [activeTab, setActiveTab] = useState('weekly');
  useEffect(() => {
    //renderLineChart(data, '.dashboard-line-graph-container');
    let values = [1, 1, 1];
    axios.get('http://localhost:5000/server/users/agg_data', 
    {
      params: {
        //personalFinanceCategory: 'GENERAL_MERCHANDISE',
        dateRangeStart: '2024-03-01',
        dateRangeEnd: '2024-04-01',
        sum: false,
      }
    }).then((response) => {
      console.log(response);
      values[0] = (response.data)
    })

    axios.get('http://localhost:5000/server/users/agg_data', 
    {
      params: {
        personalFinanceCategory: 'GROCERIES',
      }
    }).then((response) => {
      values[1] = (response.data)
    })

    axios.get('http://localhost:5000/server/users/agg_data', 
    {
      params: {
        personalFinanceCategory: 'UTILITIES',
      }
    }).then((response) => {
      values[2] = (response.data)
    })
    .catch((error) => {
      console.log(error);
    })
    // Sample data for the donut chart
    console.log(values);
    const data = [
      { label: "Merch", value: values[0] },
      { label: "Groceries", value: values[1] },
      { label: "Utilities", value: values[2] }
    ];

    //test data for the line chart
    const weeklyData = [
      { date: "2024-01-01", value: 10 },
      { date: "2024-02-01", value: 20 },
      { date: "2024-03-01", value: 15 },
      { date: "2024-04-01", value: 25 },
      { date: "2024-05-01", value: 18 },
      { date: "2024-06-01", value: 30 }
    ]

    const monthlyData = [
      { date: "2024-01-01", value: 63 },
      { date: "2024-02-01", value: 20 },
      { date: "2024-03-01", value: 42 },
      { date: "2024-04-01", value: 55 },
      { date: "2024-05-01", value: 23 },
      { date: "2024-06-01", value: 50 }
    ]

    const yearlyData = [
      { date: "2024-01-01", value: 34 },
      { date: "2024-02-01", value: 20 },
      { date: "2024-03-01", value: 65 },
      { date: "2024-04-01", value: 55 },
      { date: "2024-05-01", value: 72 },
      { date: "2024-06-01", value: 21 },
      { date: "2024-06-01", value: 60}
    ]

    const handleTabChange = (tab) => {
      setActiveTab(tab);
      switch (tab) {
        case 'weekly':
          setChartData(weeklyData);
          break;
        case 'monthly':
          setChartData(monthlyData);
          break;
        case 'yearly':
          setChartData(yearlyData);
          break;
        default:
          break;
      }
    };


    // Call the render function
    //if (!window.chartRendered) {
      renderDonutChart(data, '.dashboard-right-top');
      console.log(chartData)
      console.log(yearlyData)
      oneWeekRange();
      //window.chartRendered = true;
   // }
  }, []);
  
  
  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Dashboard - Profiteer</title>
        <meta property="og:title" content="Dashboard - Profiteer" />
      </Helmet>
      <div className="dashboard-container1">
        <div className="dashboard-background">
          <div className="dashboard-background1">
            <header data-thq="thq-navbar" className="dashboard-navbar">
              <Link to="/" className="dashboard-navlink">
                <h2 className="dashboard-text">Profiteer</h2>
              </Link>
              <div
                data-thq="thq-navbar-nav"
                data-role="Nav"
                className="dashboard-desktop-menu"
              >
                <nav
                  data-thq="thq-navbar-nav-links"
                  data-role="Nav"
                  className="dashboard-nav"
                ></nav>
                <img
                  alt="image"
                  src="https://cdn.iconscout.com/icon/free/png-256/free-notification-bell-3114519-2598151.png?f=webp"
                  className="dashboard-notificationicon"
                />
                <Link to="/register" className="dashboard-logoutbutton button">
                  <span className="dashboard-text1">Log Out</span>
                </Link>
              </div>
              <div data-thq="thq-burger-menu" className="dashboard-burger-menu">
                <svg viewBox="0 0 1024 1024" className="dashboard-icon">
                  <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                </svg>
              </div>
              <div data-thq="thq-mobile-menu" className="dashboard-mobile-menu">
                <div
                  data-thq="thq-mobile-menu-nav"
                  data-role="Nav"
                  className="dashboard-nav1"
                >
                  <div className="dashboard-container2">
                    <h2 className="dashboard-text2">OnConf</h2>
                    <div
                      data-thq="thq-close-menu"
                      className="dashboard-menu-close"
                    >
                      <svg viewBox="0 0 1024 1024" className="dashboard-icon02">
                        <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                      </svg>
                    </div>
                  </div>
                  <nav
                    data-thq="thq-mobile-menu-nav-links"
                    data-role="Nav"
                    className="dashboard-nav2"
                  >
                    <span className="navLink dashboard-text3">About</span>
                    <span className="navLink dashboard-text4">Features</span>
                    <span className="navLink dashboard-text5">Pricing</span>
                    <span className="navLink dashboard-text6">Team</span>
                    <span className="navLink dashboard-text7">Blog</span>
                  </nav>
                  <div className="dashboard-button-container">
                    <button className="dashboard-login button">Login</button>
                    <button className="button dashboard-register">
                      Register
                    </button>
                  </div>
                  <div className="dashboard-icon-group">
                    <div className="dashboard-icons">
                      <svg
                        viewBox="0 0 950.8571428571428 1024"
                        className="dashboard-icon04"
                      >
                        <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 877.7142857142857 1024"
                        className="dashboard-icon06"
                      >
                        <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 602.2582857142856 1024"
                        className="dashboard-icon08"
                      >
                        <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <img
                  alt="image"
                  src="/quote-background.svg"
                  className="dashboard-background2"
                />
              </div>
            </header>
            <div className="dashboard-dashboard-left"></div>
            <div className="dashboard-dashboard-right">
              <div className="dashboard-container3">
                <div className="dashboard-right-bottom">
                  <div className="dashboard-line-graph-container"></div>
                  <div className="dashboard-right-bottom-buttons">
                    <button
                      type="button"
                      className="dashboard-week-button button"
                      onClick={oneWeekRange}
                    >
                      1W
                    </button>
                    <button
                      type="button"
                      className="dashboard-one-month-button button"
                      onClick={oneMonthRange}
                    >
                      1M
                    </button>
                    <button
                      type="button"
                      className="dashboard-three-months-button button"
                      onClick={threeMonthsRange}
                    >
                      3M
                    </button>
                    <button
                      type="button"
                      className="dashboard-six-months-button button"
                      onClick={sixMonthsRange}
                    >
                      6M
                    </button>
                    <button
                      type="button"
                      className="dashboard-one-year-button button"
                      onClick={oneYearRange}
                    >
                      1Y
                    </button>
                  </div>
                </div>
                <div className="dashboard-right-top"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard