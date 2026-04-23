import Dashboard from './global/views/Dashboard';
import { AuthProvider } from './global/contexts/AuthContext';
import { PartyProvider } from './global/contexts/PartyContext';

function App() {
  return (
    <AuthProvider>
      <PartyProvider>
        <Dashboard />
      </PartyProvider>
    </AuthProvider>
  );
}

export default App;