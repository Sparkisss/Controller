import { Link } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
    return (
        <div>
            <h1>Login</h1>
            <Login/>
            <p style={{fontSize:'2em'}}>You don't have an account <Link to={'/registration'}>registred</Link></p>
        </div>
    );
};

export default LoginPage;