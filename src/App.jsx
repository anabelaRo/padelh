import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import NewMatch from './pages/NewMatch';

function App() {
  const [currentPage, setPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Dashboard />;
      case 'players': return <Players />;
      case 'new': return <NewMatch setPage={setPage} />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout setPage={setPage} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
