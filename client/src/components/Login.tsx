import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import MyForm from "./form/MyForm";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

const Login = () => {
    const dispatch = useAppDispatch();    
    const navigate = useNavigate(); 

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(async({user}) => {
                const token = await user.getIdToken();
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: token,
                }));
                navigate('/');
            })
            .catch(() => alert('Invalid user!'))
    }
    return (
        <MyForm
            title="Sign in"
            handleClick={handleLogin}
        />
    );
};

export default Login;