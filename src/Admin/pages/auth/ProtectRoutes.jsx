import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { approveProduct, getCategory } from '../../../redux/features/products/productActions';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized,setIsAuthorized] = useState(null)

  /* Fetch-Draft */

  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getCategory())
    dispatch(approveProduct())
  },[])

 useEffect(()=>{
    const checkTokenValidity= async()=>{
        const accessToken = sessionStorage.getItem('accessToken');
        if(!accessToken){
            setIsAuthorized(false)
            navigate('/auth/signin')
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/auth/tokenValidation',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${accessToken}`
                }
            })
            const data = await response.json()
            if(data.status=== 200){
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log('Error',error);
            setIsAuthorized(false)
        }
    }
    checkTokenValidity()
 },[]);

 
if(isAuthorized){
    return children
}else{
    navigate('/auth/signin')
    return null;
}
};
export default ProtectedRoute;
