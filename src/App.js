import React, { useState, useEffect } from "react";
import "./App.css";
const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Default grouping
  const [ordering, setOrdering] = useState("priority"); // Default sorting
  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTickets(data.tickets || []);
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      }
    };
    fetchTickets();
  }, []);

  // Group tickets based on grouping criteria
  const groupTickets = (tickets) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const key =
        grouping === "status"
          ? ticket.status
          : grouping === "user"
          ? ticket.assigned_to
          : ticket.priority;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    return grouped;
  };

  // Sort tickets based on ordering criteria
  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (ordering === "priority") return b.priority - a.priority;
      if (ordering === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTickets(sortTickets(tickets));

  // Render board columns dynamically
  const renderColumns = () => {
    return Object.entries(groupedTickets).map(([key, tickets]) => (
      <div key={key} className="kanban-column">
        <h3 className="column-title">{key || "Unassigned"}</h3>
        {tickets.map((ticket) => (
          <div key={ticket.id} className="kanban-card">
            <h4>{ticket.title}</h4>
            <p>{ticket.description}</p>
            <span className={`priority-badge priority-${ticket.priority}`}>
            {["No Priority", "Low", "Medium", "High", "Urgent"][ticket.priority]}
              </span>
            <p className="assigned-to">
              {ticket.assigned_to || "Unassigned"}
            </p>
          </div>
                  ))}
                  </div>
                ));
              };
            
              return (
                <div className="kanban-app">
                  {/* Header Section */}
                  <header className="kanban-header">
                  <div className="dropdown">
                  
                    <div className="dropdown">
                      <label htmlFor="grouping">Grouping:</label>
                      <select
                        id="grouping"
                        value={grouping}
                        onChange={(e) => setGrouping(e.target.value)}
                      >
                        <option value="status">Status</option>
                        <option value="user">User</option>
                        <option value="priority">Priority</option>
                      </select>
                    </div>
                    
                    <div className="dropdown">
                      <label htmlFor="ordering">Ordering:</label>
                      <select
                        id="ordering"
                        value={ordering}
                        onChange={(e) => setOrdering(e.target.value)}
                      >
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                      </select>
                    </div>
                    </div>
                  </header>
            
                  {/* Kanban Board */}
                  <div className="kanban-board">{renderColumns()}</div>
                </div>
              );
            };
            
            export default App;
            
