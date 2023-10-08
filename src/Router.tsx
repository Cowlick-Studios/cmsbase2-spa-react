import { Routes, Route } from 'react-router-dom'

import RequireAuthComponent from './components/RequireAuthComponent';

// Admin
import {DashboardPage as AdminDashboardPage} from './pages/admin/DashboardPage';
import TenantPage from './pages/admin/TenantPage';
import UserPage from './pages/admin/UserPage';
import LoginPage from './pages/LoginPage';
import UnknownPage from './pages/UnknownPage';

// Tenant
import {DashboardPage as TenantDashboardPage } from './pages/tenant/DashboardPage';
import { CollectionPage } from './pages/tenant/CollectionPage';
import { DocumentPage } from './pages/tenant/DocumentPage';
import { MediaPage } from './pages/tenant/MediaPage';
import { EmailPage } from './pages/tenant/EmailPage';
import { UserPage as TenantUserPage } from './pages/tenant/UserPage';
import { RequestPage } from './pages/tenant/RequestPage';
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

        <Route path="/collection/:collectionName/documents" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <DocumentPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/media" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <MediaPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/mail" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <EmailPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/user" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <TenantUserPage/>
          </RequireAuthComponent>
        }/>

        <Route path="/request" element={
          <RequireAuthComponent enforce={true} enforceTenant={false}>
            <RequestPage/>
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
