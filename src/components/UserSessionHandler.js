'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const UserSessionHandler = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      if (isLoaded && user) {
        const { id: userId, emailAddresses } = user;

        const email = emailAddresses && emailAddresses[0]?.emailAddress;
        const firstname = user && user.firstName;
        const lastname = user && user.lastName;
       
        if (email) {
          const res = await fetch('/api/CreateUpdateUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, email,firstname,lastname }),
          });

          if (res.ok) {
            console.log('User created or updated successfully');
          } else {
            console.log('Failed to create or update user');
          }
        } else {
          console.log('No email found for the user');
        }
      }
    };

    if (isLoaded) {
      checkUser();
    }
  }, [user, isLoaded]); 

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return null;
};

export default UserSessionHandler;
