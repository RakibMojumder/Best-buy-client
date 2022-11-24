
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='dark:bg-gray-800 dark:text-slate-50'>
      <div className='w-[80%] mx-auto'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
