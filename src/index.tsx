import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
