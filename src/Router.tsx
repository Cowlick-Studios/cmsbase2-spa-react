import { Routes, Route } from 'react-router-dom'

import DashboardPage from './pages/DashboardPage';
import TenantPage from './pages/TenantPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UnknownPage from './pages/UnknownPage';

import RequireAuthComponent from './components/RequireAuthComponent';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <RequireAuthComponent enforce={false}>
            <DashboardPage/>
          </RequireAuthComponent>
        }/>
        <Route path="/login" element={
          <RequireAuthComponent enforce={false}>
            <LoginPage/>
          </RequireAuthComponent>
        }/>
        <Route path="/tenant" element={ 
          <RequireAuthComponent enforce={false}>
            <TenantPage/>
          </RequireAuthComponent>
        }/>
        <Route path="/user" element={ 
          <RequireAuthComponent enforce={false}>
            <UserPage/>
          </RequireAuthComponent> 
        }/>
        <Route path="*" element={ 
          <RequireAuthComponent enforce={false}>
            <UnknownPage/>
          </RequireAuthComponent> 
        }/>
      </Routes>
    </>
  );
}

export default Router;
