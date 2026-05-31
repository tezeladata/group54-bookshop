import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { BooksProvider } from './context/books.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BooksProvider>
      <App />
    </BooksProvider>
  </BrowserRouter>
);
