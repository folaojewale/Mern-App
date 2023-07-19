import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { StudentsContextProvider } from './context/StudentsContext'
import { TutorsContextProvider } from './context/TutorsContext'
import { TutorialsContextProvider } from './context/TutorialContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TutorialsContextProvider>
    <TutorsContextProvider>
    <StudentsContextProvider>
      <App />
    </StudentsContextProvider>
    </TutorsContextProvider>
    </TutorialsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)