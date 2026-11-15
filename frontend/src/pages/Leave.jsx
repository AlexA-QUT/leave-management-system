import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

// what the form looks like when its empty
const blankForm = { type: 'Annual', startDate: '', endDate: '', reason: '' };

// colours for the status badge
const badgeColour = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

const Leave = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState(blankForm);
  const [error, setError] = useState(''); // red box
  const [message, setMessage] = useState(''); // green box

  // token so the backend knows who is logged in
  const headers = { headers: { Authorization: `Bearer ${user?.token}` } };

  // get the leave list from the backend
  const loadLeaves = async () => {
    try {
      const res = await axiosInstance.get('/api/leaves', headers);
      setLeaves(res.data);
    } catch (err) {
      setError("Couldn't load leave requests");
    }
  };

  // load the list when the page first opens
  useEffect(() => {
    if (user) loadLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <p className="p-6">Please log in first</p>;

  // employee submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axiosInstance.post('/api/leaves', formData, headers);
      setMessage('Leave request sent');
      setFormData(blankForm); // clear the form after
      loadLeaves(); // refresh so the new one shows up
    } catch (err) {
      // show the error from the backend eg. end date before start date
      setError(err.response?.data?.message || 'Something went wrong, try again');
    }
  };

  // employee cancels a pending request
  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this request?')) return; // just in case they clicked by accident
    setError('');
    setMessage('');
    try {
      await axiosInstance.delete(`/api/leaves/${id}`, headers);
      setMessage('Request cancelled');
      loadLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not cancel');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* heading changes depending on who is logged in */}
      <h1 className="text-2xl font-bold mb-4">
        {user.role === 'manager' ? 'Team Leave' : 'My Leave'}
      </h1>

      {/* error / success messages */}
      {error && <p className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</p>}
      {message && <p className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</p>}

      {/* only employees can request leave */}
      {user.role === 'employee' && (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
          <h2 className="text-xl font-bold mb-4">Request Leave</h2>

          <label className="block mb-1 text-sm">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="Annual">Annual</option>
            <option value="Personal">Personal</option>
          </select>

          <label className="block mb-1 text-sm">Start date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-1 text-sm">End date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Submit
          </button>
        </form>
      )}

      {/* the list of requests - shows a message if theres none */}
      {leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests yet</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
            <div className="flex justify-between">
              {/* manager also sees who asked for it */}
              <h3 className="font-bold">
                {leave.type} leave {user.role === 'manager' && leave.employee ? `(${leave.employee.name})` : ''}
              </h3>
              <span className={`px-2 py-1 rounded text-sm ${badgeColour[leave.status]}`}>
                {leave.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
            </p>
            <p>{leave.reason}</p>
            {leave.managerComment && <p className="text-sm italic">Manager: {leave.managerComment}</p>}

            {/* employee can cancel while its still pending */}
            {user.role === 'employee' && leave.status === 'Pending' && (
              <button
                onClick={() => handleCancel(leave._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Leave;