import { Navigate } from 'react-router-dom';
import {useAuthContext} from "../context/AuthProvider";


export const RequireAuth = ({children}) => {

    const auth = useAuthContext();
    const access = JSON.parse(localStorage.getItem('access-key'));

     if (!auth.user && !access)
        return <Navigate to='/connexion' />

    return children
}