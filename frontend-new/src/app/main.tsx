// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/style/index.css'
import App from './App.tsx'
import { store } from './store.ts'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>,
)
