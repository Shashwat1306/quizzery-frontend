import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {registerSchema} from "../validations/register-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Angry} from 'lucide-react';
import { Alert, AlertTitle,AlertDescription } from "@/components/ui/alert";
import { doRegister } from "../api/user-api";


const Register = () => {
  const [status,setStatus] = useState(false);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  });
  const AlertJSX=(<div>
    <Alert variant="destructive">
      <Angry/>
      <AlertTitle>Register Message</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  </div>)
  const registerSubmit=async (userData:unknown)=>{
    console.log('Form submitted', userData);
    try{
      const result=await doRegister(userData);
      console.log('Registration successful', result);
      if(result.data.message){
        setStatus(false);
        navigate('/login');
      }
      else{
        setStatus(true);
        setMessage("Unable to register");
        console.log("Unable to register");
      }
    }
    catch(err:any){
      setStatus(true);
      setMessage(err.response.data.message);
      console.error('Registration failed', err);
    }
  }
    return(
        <div  className="h-full flex items-center justify-center">
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="space-y-1 text-center">Welcome to Quizzery</CardTitle>
        <CardDescription className="text-center">
          Registration Form
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status && AlertJSX} 
        <br/>
        <form onSubmit={handleSubmit(registerSubmit)}>
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
          <br></br>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <span className="text-red-500">
            {errors.password && errors.password.message}
          </span>
          <br></br>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              type="text"
              id="name"
              placeholder="name"
            />
          </div>
          <span className="text-red-500">
            {errors.name && errors.name.message}  
          </span>
          <br />
          <br />
          <div className="grid w-full max-w-sm items-center gap-3">
            <Button className="bg-purple-300 hover:bg-purple-400 text-black">Register</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
    )
}
export default Register;