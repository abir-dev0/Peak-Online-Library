import { useRef, useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };
    
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setErrors(null); // Clear any previous errors
    
                // Redirect to ReaderLayout after successful signup
                return <Navigate to='/reader/home' />;
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({ general: 'An error occurred. Please try again later.' });
                }
            });
    };
    

    return (
        <>
            <form className="form animated fadeInDown" onSubmit={handleSubmit}>
                {errors && <div className='text-red-600'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                <h2 className="text-2xl py-4">
                    Sign Up
                </h2>

                <label className="label">Full Name</label>
                <div className="input">
                    <input type="text" placeholder="Enter your full name" ref={nameRef} />
                </div>
                <label className="label">Email</label>
                <div className="input">
                    <input type="email" placeholder="Enter your email" ref={emailRef} />
                </div>
                <label className="label">Password</label>
                <div className="input">
                    <input type="password" placeholder="Enter your password" ref={passwordRef} />
                </div>
                <label className="label">Confirm Password</label>
                <div className="input">
                    <input type="password" placeholder="password confirmation" ref={passwordConfirmationRef} />
                </div>
                <button type="submit" className="button-submit">SignUp</button>
                <p className="p">Already have an account? <Link to='/login' className="span">Sign In</Link></p>
            </form>
        </>
    );
}
