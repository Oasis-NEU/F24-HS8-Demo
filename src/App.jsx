import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import GroceryList from './components/GroceryList.jsx';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);  

  const logOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!session) {
    return (
      <div>
        <h1>Welcome to Oasis Grocery List</h1>
        <Auth
          supabaseClient={supabase}
          providers={[]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Oasis Grocery List</h1>
        <button onClick={logOut}>Log Out</button>
        <GroceryList />
      </div>
    );
  }
}


