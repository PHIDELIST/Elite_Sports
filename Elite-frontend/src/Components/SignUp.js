import { useForm } from "react-hook-form";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router-dom'; 
import { Auth } from "aws-amplify";


function SignUp() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...requestData } = data;
      if (requestData.password !== confirmPassword) {
        alert("Passwords must match");
        return;
      }

      // AWS Cognito Auth.signUp method 
      await Auth.signUp({
        username: requestData.email, 
        password: requestData.password,
        attributes: {
          name: requestData.name,
          email: requestData.email,
        },
      });

      alert("Registration successful");
      // Navigate to ConfirmationPage and pass the email as a URL parameter
      navigate(`/confirm?email=${requestData.email}`);
    } catch (error) {
      alert("Error occurred while registering: " + error.message);
    }
  };

  return (
    <div className="sign-up-page">
       <div className="recover-info">

      </div>
      <div className="sign-up-page-container">
        <h1>Sign Up</h1>
        <form className="signupform" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
          <input type="text" placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          <input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <button  type="submit">Sign Up</button>
          <p>
            Already have an account? <Link className="j" to="/login">Login</Link> 
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;