import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// import jetbrains-mono Font
import '@fontsource/jetbrains-mono/300-italic.css';
import '@fontsource/jetbrains-mono/400-italic.css';
import '@fontsource/jetbrains-mono/500-italic.css';
import '@fontsource/jetbrains-mono/600-italic.css';
import '@fontsource/jetbrains-mono/700-italic.css';
import '@fontsource/jetbrains-mono/800-italic.css';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import theme from './theme.tsx';
import { Provider } from 'react-redux';
import { store } from './features/store.ts';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <CssBaseline />
    <GlobalStyles
      styles={{
        body: {
          backgroundImage: "radial-gradient(rgba(0,0,0,0.5) 1px, transparent 0)",
          backgroundSize: "25px 25px"
        },
      }}
    />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>
  // </StrictMode>,
)
