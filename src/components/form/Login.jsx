import Button from '../Button/Button';
import Link from '../Button/Link';
import { Email, Password } from './input'

const Login =({action=''})=>{
    return(
        <div className="tf-login-form">
            <form className="" action={action} accept-charset="utf-8">
                <Email />
                <Password />
                <div>
                    <Link to='#forgotPassword' data-bs-toggle="modal" text='Forgot your password?' />
                </div>
                <div className="bottom">
                    <div className="w-100">
                        <Button type="submit" fill={true} text='Log In'/>
                    </div>
                    <div className="w-100">
                        <Link to='#register' data-bs-toggle="modal" text='New customer? Create your account' icon='icon-arrow1-top-left' />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;