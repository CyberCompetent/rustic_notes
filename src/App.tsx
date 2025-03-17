import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteEditor from './NoteEditor';
import Login from './Login.tsx';

function App() {
    return ( // Add return statement here
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/NoteEditor" element={<NoteEditor />} />
            </Routes>
        </Router>
    );
}

export default App;
