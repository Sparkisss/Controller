import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import App from './App.tsx'
import './firebase'
import './index.scss'
import Header from './components/header/Header.tsx'
import Footer from './components/footer/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <App />
        <Footer/>
      </Provider>      
    </BrowserRouter>    
  </StrictMode>,
)
