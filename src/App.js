
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import ThemeProvider from './contexts/ThemeProvider';
import router from './Routes/Routes';

const queryClient = new QueryClient();

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

function App() {
  return (
    <ThemeProvider>
      <div className='bg-[#F2F4F8] dark:bg-slate-800 dark:text-cyan-400'>
        <div className='w-[90%] lg:w-[80%] mx-auto'>
          <QueryClientProvider client={queryClient}>
            <Elements stripe={stripePromise}>
              <RouterProvider router={router}></RouterProvider>
            </Elements>
          </QueryClientProvider>
          <Toaster position='top-center' />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
