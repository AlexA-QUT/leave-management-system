import { useAuth } from '../context/AuthContext';

// Leave page for both roles 
// The request form and list are added in from the LMS-7 task in jira
const Leave = () => {
  const { user } = useAuth();
  if (!user) return <p className="p-6">Please log in.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Leave</h1>
      <p className="text-gray-600">
        Welcome, {user.name}. You are logged in as <strong className="capitalize">{user.role}</strong>.
      </p>
    </div>
  );
};

export default Leave;