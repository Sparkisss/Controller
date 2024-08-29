import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const {isAuth, email} = useAuth();
    
    sessionStorage.setItem('auth', isAuth.toString());    
    let auth = sessionStorage.getItem('auth') === 'true';

    return auth ? (
        <div>
            <h1>Welcome!</h1>
            <Link to={'/device'}>Device data page</Link>
            <Link to={'/archive'}>Archive page</Link>
            <Link to={'/slider'}>Slider page</Link>
            <Link to={'/tasks'}>Task page</Link>
            <button
                onClick={() => dispatch(removeUser())}>
                Log out from {email}
            </button>
        </div>
    ) : (        
        <Navigate to="/login" replace={true}/>        
    );
};

export default HomePage;