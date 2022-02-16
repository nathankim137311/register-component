import { useState } from 'react';

export default function Register() {
  // User
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Input errors
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Input valid? possible values: true, false, null
  const [isValid, setIsValid] = useState({
    email: null,
    password: null,
    confirmPassword: null
  }); 

  const registerUser = (e) => {
    e.preventDefault();
    const {email, password, confirmPassword} = isValid;

    // Check if all fields are valid then register user
    if (email && password && confirmPassword) console.log('Registered user');

    // post to server for server-side validation
  }

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateUser = () => {
    const { email, password, confirmPassword } = user;

    // Clone object states
    const errorClone = { ...error }
    const isValidClone = { ...isValid }

    // Email validation
    if (email.length === 0) {
      errorClone.email = '';
      setError(errorClone); 
    } 
    else if (emailIsValid(email)) {
      errorClone.email = '';
      setError(errorClone); 

      isValidClone.email = true;
      setIsValid(isValidClone); 
    } 
    else {
      errorClone.email = 'Not a valid email address';
      setError(errorClone); 

      isValidClone.email = false;
      setIsValid(isValidClone); 
    }

    // // Password validation
    if (password.length === 0) {
      errorClone.password = '';
      setError(errorClone); 
    } 
    else if (password.length >= 6) {
      errorClone.password = '';
      setError(errorClone); 

      isValidClone.password = true;
      setIsValid(isValidClone); 
    } else {
      errorClone.password = 'Password is less than 6 characters';
      setError(errorClone); 

      isValidClone.password = false;
      setIsValid(isValidClone);
    }
    
    // // Confirm password validation 
    if (confirmPassword.length === 0) {
      errorClone.confirmPassword = '';
      setError(errorClone);
    } 
    else if (password === confirmPassword) {
      errorClone.confirmPassword = '';
      setError(errorClone);

      isValidClone.confirmPassword = true;
      setIsValid(isValidClone);
    } 
    else {
      errorClone.confirmPassword = 'Passwords do not match';
      setError(errorClone); 

      isValidClone.confirmPassword = false;
      setIsValid(isValidClone);
    }
  }

  const handleChange = (e) => {
    // Set validation of current field to null
    const isValidClone = { ...isValid }
    isValidClone[e.target.name] = null; 
    setIsValid(isValidClone);

    // Set state of user property to current field value
    const userClone = { ...user }
    userClone[e.target.name] = e.target.value;
    setUser(userClone);

    // Set error message of current field to blank
    const errorClone = { ...error }
    errorClone[e.target.name] = '';
    setError(errorClone);
  }

  return (
    <div className="flex flex-col justify-center bg-[#1A1A1A] text-white h-screen">
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl mb-8'>Sign up</h1>
        <form className='flex flex-col' onSubmit={registerUser}>
          <div className="flex flex-col my-2 h-16">
            <input 
              className={isValid.email ? 'input border border-[#3CFF00]' : isValid.email === null ? 'input' : 'input border border-[#FF244A]'} 
              type="text" 
              placeholder="Email"
              name='email'
              onChange={(e) => handleChange(e)}
              onBlur={validateUser} 
              required
            />
            <small className='text-red-600 px-2 mt-2'>{error.email}</small>
          </div>
          <div className="flex flex-col my-2 h-16">
            <input 
              className={isValid.password ? 'input border border-[#3CFF00]' : isValid.password === null ? 'input' : 'input border border-[#FF244A]'} 
              type="password" 
              placeholder="Password" 
              name='password'
              onChange={(e) => handleChange(e)}
              onBlur={validateUser} 
              required
            />
            <small className='text-red-600 px-2 mt-2'>{error.password}</small>
          </div>
          <div className="flex flex-col my-2 h-16">
            <input 
              className={isValid.confirmPassword ? 'input border border-[#3CFF00]' : isValid.confirmPassword === null ? 'input' : 'input border border-[#FF244A]'} 
              type="password" 
              placeholder="Confirm password" 
              name='confirmPassword'
              onChange={(e) => handleChange(e)}
              onBlur={validateUser} 
              required
            />
            <small className='text-red-600 px-2 mt-2'>{error.confirmPassword}</small>
          </div>
          <button className="mt-2 mb-4 py-2 px-4 rounded-xl shadow-lg bg-[#A400FF] text-white" type="submit">Submit</button>
        </form>
        <small className="text-xs">
          Already have an account? <a className='text-[#A400FF]' href="#">Log in here</a>
        </small>
      </div>
    </div>
  );
}

// message component which pops up either error or success and text based on server
// response. 