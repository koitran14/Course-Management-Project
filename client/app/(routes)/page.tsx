"use client"

import React, { useState, useEffect } from 'react';

// Define the type/interface for the student object
interface User {
  UserID: string,
  UserLastName: string,
  UserFirstName: string,
  UserEmail: string,
  UserDOB: Date,
  LoginID: string,
  RoleID: string
}

async function getUser(id: string): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user/${id}`);
    return res.json();
}

const Homepage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const fetchedUser = await getUser('U1');
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const mainContent = user ? `Welcome ${user.UserFirstName} ${user.UserLastName} to our BlackBoard`: 'No profile data';

  return (
    <div className='h-full w-full flex items-center justify-center'>
      {isLoading ? (
        <h1>Loading....</h1>
      ):(
        <h1>{mainContent}</h1>
      )}
    </div>
  );
}

export default Homepage;

