import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

export default function Login(props) {
    let baseUrl = 'https://route-movies-api.vercel.app/'
    const [user, setUser] = useState({
        'email' : '',
        'password' : '',
    })

    let navigate = useNavigate()

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    async function logIn(e){
        e.preventDefault() 
        setIsLoading(true)
        let validationResult = validateLoginForm();
        if (validationResult.error) {
            setIsLoading(false);
            setError(validationResult.error.details)
        }else{
            let {data} = await Axios.post(baseUrl+'signin',user)
            setIsLoading(false)
            if (data.message == 'success') {
                localStorage.setItem('token' , data.token )
                props.saveUserData();
                navigate('/home')
            }else{
                setError(data.message)
            }
            console.log(data); 
        }      
    }


    function getUser(e){
        setUser({...user ,[e.target.name] : e.target.value })
    }

    // Login with Joi 
    function validateLoginForm(){
        let schema = Joi.object({
          email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
          password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), 
        })
        return schema.validate(user , {abortEarly : false} )
      }
      

  return (
   <>
    <div className="page-content my-0">
        <div className="responsive d-flex justify-content-center align-items-center">
            <div className="form-v9-content " >
                <form onSubmit={logIn} className="form-detail" action="#" method="post">
                    <h2>Login Form</h2>
                    <div className="form-row-total">
                        {/* Email */}
                        <div className="form-row">
                            <input onChange={getUser} type="text" name="email" id="email" className="input-text" placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                        </div>
                        {/* Password */}
                        <div className="form-row">
                            <input onChange={getUser} type="password" name="password" id="password" className="input-text" placeholder="Password" required/>
                        </div>
                    </div>
                    <div className="form-row-last">
                        <button onChange={getUser}  type="submit" name="login" className="register" value="Login">{isLoading ? <i className='fa fa-spinner fa-spin' ></i> : 'Log In'} </button>
                    </div>
                </form>
                {error &&
                <div className="alert alert-danger w-50 m-auto mt-1 mb-4"> 
                    {error}
                </div>}
                
            </div>
        </div>
		
	</div>
   </>
  )
}