import { Route, Routes } from "react-router-dom";
import Register from "../../../modules/user/pages/register";
import Login from "../../../modules/user/pages/login";
import { Home } from "../../../modules/quiz/pages/Home";
import AddQuiz from "../../../modules/admin/addquiz";
import AllQuizzes from "../../../modules/quiz/pages/Allquizzes";
import AttemptQuiz from "../../../modules/quiz/pages/attemptquiz";
const AppRoutes =()=>{
    return(
    <div className="h-full">
    <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home />}/>
        <Route path="/add-quiz" element={<AddQuiz/>}/>
        <Route path="/all-quizzes" element={<AllQuizzes />} />
        <Route path="/attempt/:id" element={<AttemptQuiz/>} />

    </Routes>
    </div>)
}
export default AppRoutes;