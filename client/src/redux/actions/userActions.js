import axios from 'axios'
import {message} from 'antd'


export const getAllUsers=()=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try{
        const response = await axios.get('/api/users/getallUsers')
        localStorage.setItem('users' ,JSON.stringify(response.data))
        dispatch({type: 'GET_ALL_USERS', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    }catch (error){
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})

    }
}

export const admin=(email)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try{
        const response = await axios.post('/api/users/makeAdmin',email)
        message.success(response.data.message)
        dispatch({type: 'GET_ALL_USERS', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    }catch (error){
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})

    }
}

export const userLogin=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try{
        const response = await axios.post('/api/users/login',reqObj)
        if (response.data.loginError) {
            message.error(response.data.message);
            dispatch({type: 'LOADING' , payload:false})
            return;
        }
        localStorage.setItem('user' ,JSON.stringify(response.data))
        message.success('Login success')
        dispatch({type: 'LOADING' , payload:false})
        setTimeout(() => {
            window.location.href='/'
         
        }, 500);
    }catch (error){
        console.log(error)
        message.error('Something went wrong')
        dispatch({type: 'LOADING' , payload:false})

    }
}

export const userRegister=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try{
        if(reqObj.password !== reqObj.cpassword ) {
            message.error('Password mismatch');
            dispatch({type: 'LOADING' , payload:false})
            return;
        }
        const response = await axios.post('/api/users/register',reqObj)
        if (response.data.loginError) {
            message.error(response.data.message);
            dispatch({type: 'LOADING' , payload:false})
            return;
        }
        message.success('Registration successfull')
        setTimeout(() => {
            window.location.href='/login'
         
        }, 500);
        dispatch({type: 'LOADING' , payload:false})
        
    }catch (error){
        console.log(error)
        message.error('Something  wrong')
        dispatch({type: 'LOADING' , payload:false})

    }
}