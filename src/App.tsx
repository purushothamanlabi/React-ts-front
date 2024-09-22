import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import  helloConfig from "./toastConfig"
import List from './com/list';
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import List from './com/list';
import Form from "./com/form";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Editor } from 'primereact/editor';
import Edit from './com/edit';

function App() {
  
  return (
   <div className="hello">
     <ToastContainer/>
     <Router>
       <Routes>
         <Route path="/list" element={<List />} />
         <Route path="/form" element={<Form/>} />
         <Route path="/edit/:id" element={<Edit/>} />
         <Route path="*" element={<List />} />
       </Routes>
     </Router>
   </div>
  );
}

export default App;


