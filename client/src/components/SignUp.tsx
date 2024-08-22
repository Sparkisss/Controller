import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MyForm from "./Form";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); 

    const handleRegister = (email: any, password: any) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async({user}) => {
                const token = await user.getIdToken();
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: token,
                }));
                navigate('/');
            })
            .catch(console.error)
    }
    return (
        <MyForm
            title="register"
            handleClick={handleRegister}
        />
    );
};

export default SignUp;