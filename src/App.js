
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='bg-[#F2F4F8]'>
      <div className='w-[90%] lg:w-[80%] mx-auto'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
        <Toaster position='top-center' />
      </div>
    </div>
  );
}

export default App;
