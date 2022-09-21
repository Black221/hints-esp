import { Navigate } from 'react-router-dom';
import {useAuthContext} from "../context/AuthProvider";
import {useStateContext} from "../context/ContextProvider";


export const RequireAuth = ({children}) => {

    const {
        userInfo
    } = useStateContext();

    const auth = useAuthContext();

    const access = JSON.parse(localStorage.getItem('access-key'));

     if ( !auth.user && !access)
        return <Navigate to='/connexion' />

     if (!userInfo.department)
         return <Navigate to='/redirection' />

    return children
}