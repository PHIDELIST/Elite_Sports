import './LoginPage.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Auth } from "aws-amplify";


function LoginPage() {  
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    
    try {
      const user = await Auth.signIn(email, password);

      const token = user.signInUserSession.accessToken.jwtToken;
      const userID = user.username;
      const name = user.signInUserSession.idToken.payload.name;  
      localStorage.setItem('token', token);
      localStorage.setItem('userID', userID);
      localStorage.setItem('name', name);
      window.location.href = "/"
    } catch (error) {
      alert(error.message);
      console.log('Error:', error);
    }
  };

  return (
    <div className="LoginPage">
      <h1>Sign into your account</h1>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>
        <input type="password" placeholder="Password" {...register('password')} />
        <p>{errors.password?.message}</p>
        <button type="submit">Login</button>
      </form>
      <p>
        New here?  <a href="/signup">SignUp</a> 
      </p>
      <p>Can't remember your password? <a href="/reset-password">Reset Password</a></p>
    </div>
  );
}

export default LoginPage;