import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import VIewEmp from "./components/VIewEmp";
import EditEmp from "./components/EditEmp";
import Footer from "./components/Footer";

function App() {
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/addemp" element={<AddEmployee/>}></Route>
          <Route path="/viewemp" element={<VIewEmp/>}></Route>
          <Route path="/editemp/:id" element={<EditEmp/>}></Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App
