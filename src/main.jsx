import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"



//importing pages 
import Hello from "./Hello"
import About from "./About"
import MultipartForm from "./MultipartForm"
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"
import App from "./component/App"
// defining routes 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Hello />
  },
  {
    path: "/about",
    element: <About />
  } ,
  {
    path : "/processing" ,
    element : <MultipartForm />
  } ,
  {
    path : "/signup" ,
    element : <SignUpForm />
  } ,
  {
    path : "/login" ,
    element : <LoginForm />
  } , 
  {
    path : "/testCompoent" ,
    element : <App />
  }
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
