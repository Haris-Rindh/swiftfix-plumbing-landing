import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard({ token, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // Redirect to login if token is missing
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchLeads();
    }
  }, [token]);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');
    try {
      // AJAX (Fetch) GET leads with Authorization headers
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        onLogout();
        navigate('/login');
        return;
      }

      const data = await response.json();
      if (data.success) {
        setLeads(data.data);
      } else {
        setError(data.error || 'Failed to fetch leads.');
      }
    } catch (err) {
      setError('Network error. Make sure the backend server is running.');
      console.error('Fetch Leads Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      // AJAX (Fetch) PUT update status with Authorization headers
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.status === 401) {
        onLogout();
        navigate('/login');
        return;
      }

      const data = await response.json();
      if (data.success) {
        // Update local state
        setLeads(leads.map(lead => lead._id === leadId ? { ...lead, status: newStatus } : lead));
      } else {
        alert('Failed to update status: ' + data.error);
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      // AJAX (Fetch) DELETE lead with Authorization headers
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        onLogout();
        navigate('/login');
        return;
      }

      const data = await response.json();
      if (data.success) {
        // Update local state
        setLeads(leads.filter(lead => lead._id !== leadId));
      } else {
        alert('Failed to delete lead: ' + data.error);
      }
    } catch (err) {
      alert('Error deleting lead: ' + err.message);
    }
  };

  // Metrics calculations
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => l.status === 'Pending').length;
  const resolvedLeads = leads.filter(l => l.status === 'Resolved').length;

  const filteredLeads = filter === 'All' 
    ? leads 
    : leads.filter(l => l.status.toLowerCase() === filter.toLowerCase());

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'In Contact': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getIssueLabel = (issue) => {
    switch (issue) {
      case 'emergency': return '🚨 Emergency';
      case 'clog': return 'Blocked Drain';
      case 'leak': return 'Leak Repair';
      case 'heater': return 'Water Heater';
      case 'install': return 'Installation Quote';
      default: return issue;
    }
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[600px] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track customer inquiries and service requests from MongoDB.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchLeads} 
              className="bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2 px-4 border border-slate-300 rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H17" />
              </svg>
              Refresh
            </button>
            <button 
              onClick={onLogout} 
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="p-3 bg-swift-blue/10 text-swift-blue rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Leads</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{totalLeads}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Pending Action</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{pendingLeads}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="p-3 bg-green-500/10 text-green-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resolved Services</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{resolvedLeads}</h3>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Pending', 'In Contact', 'Scheduled', 'Resolved', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${filter === status ? 'bg-swift-blue text-white border-swift-blue' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 shadow-sm'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col justify-center items-center">
              <svg className="animate-spin h-8 w-8 text-swift-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-slate-500 font-semibold">Loading submissions from MongoDB...</span>
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-800">{error}</h4>
              <button 
                onClick={fetchLeads} 
                className="mt-4 bg-swift-blue hover:bg-swift-dark text-white font-bold py-2 px-6 rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 className="text-lg font-bold text-slate-600">No submissions found matching "{filter}"</h4>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">Customer Name</th>
                    <th scope="col" className="px-6 py-4">Phone Number</th>
                    <th scope="col" className="px-6 py-4">Requested Issue</th>
                    <th scope="col" className="px-6 py-4">Submitted Date</th>
                    <th scope="col" className="px-6 py-4">Lead Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50 transition duration-150">
                      <td className="px-6 py-4 font-bold text-slate-900">{lead.name}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        <a href={`tel:${lead.phone}`} className="hover:text-swift-blue underline decoration-dotted">
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {getIssueLabel(lead.issue)}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(lead.createdAt).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusColor(lead.status)} outline-none cursor-pointer`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Contact">In Contact</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-2 rounded-lg transition"
                          title="Delete Lead"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
