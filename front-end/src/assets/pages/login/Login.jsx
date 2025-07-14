import './login.css';
import { createRef, useState} from 'react';
import { axiosClient } from '../../../api/axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Link} from 'react-router-dom';
export default function Login() {
    const emailRef=createRef();
    const passwordRef=createRef();
    const[errors,setErrors]=useState(null);
    const{setUser,setToken}=useStateContext()
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload={
            email:emailRef.current.value, 
            password:passwordRef.current.value, 
        }
        axiosClient.post('/login',payload)
            .then(({data})=>{
                // localStorage.setItem('ACCESS_TOKEN',data.token);
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err)=>{
                const response=err.response;
                if(response  && response.status===422){
                    if(response.data.errors){
                        setErrors(response.data.errors)
                    }else{
                        setErrors({
                            email:[response.data.message]
                        })
                    }
                }
            })
    };

    return (
        <>
        <form className="form animated fadeInDown " onSubmit={handleSubmit}>
            {errors && <div className='text-red-600'>
                {Object.keys(errors).map(key=>(
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            <h2 className="text-2xl py-4">Login</h2>

            <label className="label">Email</label>
            <div className="input">
                <input type="email" placeholder="Enter your email" ref={emailRef}  />
            </div>
            <label className="label">Password</label>
            <div className="input">
                <input type="password" placeholder="Enter your password" ref={passwordRef}  />
            </div>
            <button type="submit" className="button-submit">Login</button>
            <p className="p">Don't have an account? <Link to='/signup' className="span">Sign Up</Link></p>
        </form>
    </>);
}
