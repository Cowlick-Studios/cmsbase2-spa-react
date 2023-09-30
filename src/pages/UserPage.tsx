import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import {axios, http} from '../services/http';
import { AppContext } from '../contexts/AppContext';
import { UserContext } from '../contexts/UserContext';

import UserTableComponent from '../components/user/UserTableComponent';

function UserPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    http.get(`/user`).then((res) => {
      setUsers(res.data.users.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      }));
    });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          users,
          setUsers,
        }}
      >
        <UserTableComponent/>
      </UserContext.Provider>
    </>
  );
}

export default UserPage;
