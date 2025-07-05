"use client";

import { useState } from "react";
import "./Dashboard.css";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { userData } = useUser(); // this will give you fullName

  // const userName = userData.fullName || "Guest";
  const fullName = userData.fullName || "Guest"; // "Onukwu Ifeanyichukwu Boluwatife"
  const nameParts = fullName.trim().split(" "); // ["Onukwu", "Ifeanyichukwu", "Boluwatife"]
  const shortName = nameParts.length > 1 ? nameParts[1] : nameParts[0];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const customers = [
    {
      name: "Jane Cooper",
      company: "Microsoft",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: "Active",
    },
    {
      name: "Floyd Miles",
      company: "Yahoo",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      country: "Kiribati",
      status: "Inactive",
    },
    {
      name: "Ronald Richards",
      company: "Adobe",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      country: "Israel",
      status: "Inactive",
    },
    {
      name: "Marvin McKinney",
      company: "Tesla",
      phone: "(252) 555-0126",
      email: "marvin@tesla.com",
      country: "Iran",
      status: "Active",
    },
    {
      name: "Jerome Bell",
      company: "Google",
      phone: "(629) 555-0129",
      email: "jerome@google.com",
      country: "Réunion",
      status: "Active",
    },
    {
      name: "Kathryn Murphy",
      company: "Microsoft",
      phone: "(406) 555-0120",
      email: "kathryn@microsoft.com",
      country: "Curaçao",
      status: "Active",
    },
    {
      name: "Jacob Jones",
      company: "Yahoo",
      phone: "(208) 555-0112",
      email: "jacob@yahoo.com",
      country: "Brazil",
      status: "Active",
    },
    {
      name: "Kristin Watson",
      company: "Facebook",
      phone: "(704) 555-0127",
      email: "kristin@facebook.com",
      country: "Åland Islands",
      status: "Inactive",
    },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo" onClick={toggleSidebar}>
            <div className="logo-icon">
              <img src="/assets/setting1.png" alt="Profile" />
            </div>
            <span className="logo-text">Dashboard</span>
            <span className="version">v.01</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item">
            <span className="nav-icon">
              <img src="/assets/ListMenu.png" alt="Profile" />
            </span>
            <span className="nav-text">Dashboard</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">
              <img src="/assets/ListMenu(1).png" alt="Profile" />
            </span>
            <span className="nav-text">Product</span>
            <span className="nav-arrow">›</span>
          </div>
          <div className="nav-item active">
            <span className="nav-icon">
              <img src="/assets/ListMenu(2).png" alt="Profile" />
            </span>
            <span className="nav-text">Customers</span>
            <span className="nav-arrow">›</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">
              <img src="/assets/ListMenu(3).png" alt="Profile" />
            </span>
            <span className="nav-text">Income</span>
            <span className="nav-arrow">›</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">
              <img src="/assets/ListMenu(4).png" alt="Profile" />
            </span>
            <span className="nav-text">Promote</span>
            <span className="nav-arrow">›</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">
              <img src="/assets/ListMenu(5).png" alt="Profile" />
            </span>
            <span className="nav-text">Help</span>
            <span className="nav-arrow">›</span>
          </div>
        </nav>

        <div className="upgrade-card">
          <h3>Upgrade to PRO to get access all Features!</h3>
          <button className="upgrade-btn">Get Pro Now!</button>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            <img
              className="profilePic"
              src="src/assets/pic 1.png"
              alt="Profile"
            />
          </div>
          <div className="user-info">
            <div className="user-name">{shortName}</div>
            <div className="user-role">Software Engineer</div>
          </div>
          <span className="dropdown-arrow">⌄</span>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <img src="/assets/setting1.png" alt="Profile" />
            </button>
            <h1>Hello {shortName} 👋,</h1>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <span className="search-icon">
              <img src="/assets/search1.png" alt="Profile" />
            </span>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon customers">
              <img src="/assets/Group10.png" alt="Profile" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Customers</div>
              <div className="stat-value">5,423</div>
              <div className="stat-change positive">↗ 16% this month</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon members">
              <img src="/assets/Group10(1).png" alt="Profile" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Members</div>
              <div className="stat-value">1,893</div>
              <div className="stat-change negative">↘ 1% this month</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <img src="/assets/Group10(2).png" alt="Profile" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Active Now</div>
              <div className="stat-value">189</div>
              <div className="user-avatars">
                <div className="avatar">
                  <img
                    className="profilePic1"
                    src="/assets/pic2.png"
                    alt="Profile"
                  />
                </div>
                <div className="avatar">
                  <img
                    className="profilePic1"
                    src="/assets/pic3.png"
                    alt="Profile"
                  />
                </div>
                <div className="avatar">
                  <img
                    className="profilePic1"
                    src="/assets/pic4.png"
                    alt="Profile"
                  />
                </div>
                <div className="avatar">
                  <img
                    className="profilePic1"
                    src="/assets/pic5.png"
                    alt="Profile"
                  />
                </div>
                <div className="avatar">
                  <img
                    className="profilePic1"
                    src="/assets/pic6.png"
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="customers-section">
          <div className="section-header">
            <div className="section-title">
              <h2>All Customers</h2>
              <span className="active-members">Active Members</span>
            </div>
            <div className="section-controls">
              <div className="search-box">
                <input type="text" placeholder="Search" />
                <span className="search-icon">
                  <img src="/assets/search1.png" alt="Profile" />
                </span>
              </div>
              <div className="sort-dropdown">
                <span>Sort by: Newest</span>
                <span className="dropdown-arrow">⌄</span>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.company}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.country}</td>
                    <td>
                      <span
                        className={`status ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span className="pagination-info">
              Showing data 1 to 8 of 256K entries
            </span>
            <div className="pagination-controls">
              <button className="pagination-btn">‹</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">4</button>
              <span>...</span>
              <button className="pagination-btn">40</button>
              <button className="pagination-btn">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
