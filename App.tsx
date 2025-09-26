import React, { useState } from 'react';
import { LoginPage } from './components/login-page';
import { Dashboard } from './components/dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      setUser({ id: 'alvin', name: 'Dr. 김아빈' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}