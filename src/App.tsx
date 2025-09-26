import { useState } from 'react';
import { LoginPage } from './components/login-page-standalone';
import { Dashboard } from './components/dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const handleLogin = (success: boolean) => {
    setIsLoggedIn(success);
    if (success) {
      setUser({ id: 'alvin', name: 'Dr. Alvin Kim' });
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

export default App;
