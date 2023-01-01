import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Register() {

    let baseUrl = 'https://route-movies-api.vercel.app/'
    const [user, setUser] = useState({
        'first_name' : '',
        'last_name' : '',
        'email' : '',
        'password' : '',
    })

    let navigate = useNavigate()

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // sign Up
    async function signUp(e){
        e.preventDefault() 
        setIsLoading(true)
        let validationResult = validationRegisterForm();
        if (validationResult.error) {
            setIsLoading(false);
            setError(validationResult.error.details)
        }else{
            let {data} = await Axios.post(baseUrl+'signup',user)
            setIsLoading(false)
            if (data.message == 'success') {
                navigate('/login')
            }else{
                setError(data.message)
            }
            console.log(data);    
        }   
    }

    function getUser(e){
        setUser({...user ,[e.target.name] : e.target.value })
    }

    // Validation with joi
    function validationRegisterForm(){
        let schema = Joi.object({
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
        return schema.validate(user , {abortEarly : false} )
    }

  return (
   <>
    <div className="page-content my-0">
        <div className="responsive d-flex justify-content-center align-items-center">
            <div className="form-v9-content" >
                <form onSubmit={signUp} className="form-detail" action="#" method="post">
                    <h2>Registration Form</h2>
                    <div className="form-row-total">
                        <div className="form-row">
                            <input onChange={getUser} type="text" name="first_name" id="first-name" className="input-text" placeholder="First Name" required/>
                        </div>
                        <div className="form-row">
                            <input onChange={getUser} type="text" name="last_name" id="last-name" className="input-text" placeholder="Last Name" required/>
                        </div>
                    </div>
                    <div className="form-row-total">
                        <div className="form-row">
                            <input onChange={getUser} type="text" name="email" id="email" className="input-text" placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                        </div>
                        <div className="form-row">
                            <input onChange={getUser} type="password" name="password" id="password" className="input-text" placeholder="Password" required/>
                        </div>
                    </div>
                    <div className="form-row-last">
                        <button onChange={getUser}  type="submit" name="register" className="register" value="Register">{isLoading ? <i className='fa fa-spinner fa-spin' ></i> : 'Sign Up'} </button>
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
