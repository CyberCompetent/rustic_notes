import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // ✅ Declare useNavigate() at the top
  const [currentPage, setCurrentPage] = useState("startup");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const displayMessage = (type: string, text: string) => {
    setMessage({ type, text });
  };

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      displayMessage("error", "Email and password are required");
      return;
    }
    displayMessage("success", "Logged in successfully");
    navigate("/NoteEditor");
  };

  const handleSignup = () => {
    if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      displayMessage("error", "All fields are required");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      displayMessage("error", "Passwords do not match");
      return;
    }
    displayMessage("success", "Signed up successfully");
    navigate("/NoteEditor");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('wood.jpg')" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {message && (
          <div className={`p-3 mb-4 text-center rounded ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {message.text}
          </div>
        )}
        {currentPage === "startup" && (
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-2xl text-black font-bold">Welcome to RusticNotes</h1>
            <p className="text-gray-600">Please login or sign up to continue.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded" onClick={() => setCurrentPage("login")}>Login</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded" onClick={() => setCurrentPage("signup")}>Sign Up</button>
          </div>
        )}
        {currentPage === "login" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-black font-semibold text-center">Login</h2>
            <input className="border text-gray-600 p-2 rounded" type="text" placeholder="Email or Username" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <input className="border p-2 text-gray-600 rounded" type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded" onClick={handleLogin}>Log In</button>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded" onClick={() => setCurrentPage("startup")}>Back</button>
          </div>
        )}
        {currentPage === "signup" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-black font-semibold text-center">Sign Up</h2>
            <input className="border p-2 text-gray-600 rounded" type="text" placeholder="Username" value={signupData.username} onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} />
            <input className="border p-2 text-gray-600 rounded" type="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
            <input className="border p-2 text-gray-600 rounded" type="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
            <input className="border p-2 text-gray-600 rounded" type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded" onClick={handleSignup}>Sign Up</button>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded" onClick={() => setCurrentPage("startup")}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;