import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center p-4 bg-purple-300 ">
      <div  className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        {localStorage.token && <Link to="/all-quizzes">All Quizzes</Link>}
      </div>
      <div className="flex gap-4 items-center">
         {localStorage.token && localStorage.role=="admin" && <Link to="/add-quiz">Add Quiz</Link>}
         
        {!localStorage.token && <Link to="/Register">Register</Link>}
        {!localStorage.token && <Link to="/Login">Login</Link>}
        {localStorage.token && <Button
          onClick={handleLogout}
          className="bg-purple-500 hover:bg-purple-600  h-8  p-2 mt-0"
        >Log Out</Button>}
      </div>
    </div>
  );
};
export default Header;
