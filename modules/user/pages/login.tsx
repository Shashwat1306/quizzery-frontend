import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "../validations/register-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { doLogin } from "../api/user-api";
const Login = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const alertJSX = (
    <div>
      <Alert variant="default">
        <AlertTitle></AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
  const mySubmit = async (userObject: unknown) => {
    try {
      const result = await doLogin(userObject);

      if (result.data.token) {
        localStorage.role = result.data.role;
        localStorage.token = result.data.token;
        setStatus(false);
        Navigate("/all-quizzes");
      } else {
        setStatus(true);
        setMessage(result.data.message || "Invalid Login or Password");
      }
    } catch (err:any) {
      setStatus(true);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="h-full flex items-center justify-center ">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="space-y-1 text-center">Login Here</CardTitle>
          <CardDescription className="text-center">
            Quizzery Login Form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(mySubmit)}>
            {status && alertJSX}
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Email"
              />
              <span className="text-red-500">
                {errors.email && errors.email.message}
              </span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Password"
              />
              <span className="text-red-500">
                {errors.password && errors.password.message}
              </span>
            </div>

            <br />
            <div className="grid w-full max-w-sm items-center gap-3">
              <Button className="bg-purple-300 hover:bg-purple-400 text-black">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
