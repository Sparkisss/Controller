import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";

const RegistrationPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <SignUp/>
            <p style={{fontSize:'2em'}}>
                Already have an account <Link to={"/login"}>Sign in</Link>
            </p>
        </div>
    );
};

export default RegistrationPage;
