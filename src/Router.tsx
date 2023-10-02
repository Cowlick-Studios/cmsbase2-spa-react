import { Routes, Route } from 'react-router-dom'

import {DashboardPage as AdminDashboardPage} from './pages/admin/DashboardPage';
import {DashboardPage as TenantDashboardPage } from './pages/tenant/DashboardPage';
import TenantPage from './pages/admin/TenantPage';
import UserPage from './pages/admin/UserPage';
import LoginPage from './pages/LoginPage';
import UnknownPage from './pages/UnknownPage';

import RequireAuthComponent from './components/RequireAuthComponent';

import { CollectionPage } from './pages/tenant/CollectionPage';
import { DocumentPage } from './pages/tenant/DocumentPage';
import { UserPage as TenantUserPage } from './pages/tenant/UserPage';
import { SettingsPage } from './pages/tenant/SettingsPage';

function Router() {
  return (
    <>
      <Routes>
        {/* System */}
        <Route path="/login" element={
          <RequireAuthComponent enforce={false}>
            <LoginPage/>
          </RequireAuthComponent>
        }/>

        {/* Admin */}
        <Route path="/admin" element={
          <RequireAuthComponent enforce={true} enforceAdmin={true}>
            <AdminDashboardPage/>
          </RequireAuthComponent>
        }/>
        <Route path="/admin/tenant" element={ 
          <RequireAuthComponent enforce={true} enforceAdmin={true}>
            <TenantPage/>
          </RequireAuthComponent>
        }/>
        <Route path="/admin/user" element={ 
          <RequireAuthComponent enforce={true} enforceAdmin={true}>
            <UserPage/>
          </RequireAuthComponent>
        }/>

        {/* Tenant */}
        <Route path="/" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <TenantDashboardPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/collection" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <CollectionPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/collection/:collectionId/documents" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <DocumentPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/user" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <TenantUserPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/settings" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <SettingsPage/>
          </RequireAuthComponent>
        }/>

        {/* Catch All */}
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
