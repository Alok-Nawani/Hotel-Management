import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header(){
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white shadow-sm">
      <div className="text-lg font-bold">Restaurant OMS</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, {user?.name || user?.username}
        </span>
        <button 
          onClick={logout}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  )
}