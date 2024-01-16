import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GlobalStyle } from 'styles/GlobalStyle';
import { Provider } from 'react-redux';
import { store } from './redux/config/configStore';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
);
