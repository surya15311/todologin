// App.js
import React, from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Signup from './components/Signup';
import Header from "./components/Header";
import Form from "./components/Form";
import "./App.css";

function App() {
  
 
  return (
    <BrowserRouter>
      <div className="container">
        <div></div>
        <div className="app-wrapper">
          <div>
            <NavBar />
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/todolist" />
                  ) : (
                    <LoginForm onLogin={handleLogin} />
                  )
                }
              />
              <Route path="/signup" element={<Signup />} />
              {/* Update the import statement to use 'TodosList' */}
              <Route
                path="/todolist"
                element={
                  isLoggedIn ? (
                    <TodosList
                      todos={todos}
                      setTodos={setTodos}
                      setEditTodo={setEditTodo}
                      handleLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="/form" element={<Form />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
