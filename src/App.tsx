import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home';
import Authentication from './routes/authentication/authentication';
import Shop from './routes/Shop/Shop';
import CheckoutPage from './routes/checkout/checkout';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import Layout from './routes/Layout/Layout';
import { ThemeProvider } from './components/Theme-Provider/theme-provider';
import { useEffect } from 'react';
import { supabase } from './supabase/supabase';
import { useAuthContext } from './contexts/hooks/useAuthContext';
import ProductDetail from './routes/ProductDetail/ProductDetail';

const App = () => {

    
  const { handleSetUser } = useAuthContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session: ", session);
      if (session) {
        handleSetUser({
          uid: session.user.id,
          email: session.user.email,
          token: session.access_token,
        });
      } else {
        handleSetUser(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session on auth state change:", session);
      if (session) {
        handleSetUser({
          uid: session.user.id,
          email: session.user.email,
          token: session.access_token,
        });
      } else {
        handleSetUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route path='/' element={<Layout />}> 
                    <Route index element={<Home />} />
                    <Route path='shop/*' element={<Shop />} />
                    <Route path='checkout' element={<CheckoutPage />} />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Route>
            
                <Route path='auth' element={<Authentication />} />
            </Routes>
        </ThemeProvider>

    );
};

export default App;
