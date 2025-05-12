import Button from '../Button/Button';
import Link from '../Button/Link';
import { Email, Password } from './input'

const ForgotPassword =({action=''})=>{
    return(
        <div className="tf-login-form">
            <form className="" action={action} accept-charset="utf-8">
                <div>
                    <p>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt
                        out, click unsubscribe in our emails</p>
                </div>
                <Email />
                <div>
                    <Link to='#login' data-bs-toggle="modal" text='Cancel' />
                </div>
                <div className="bottom">
                    <div className="w-100">
                        <Button type="submit" fill={true} text='Reset
                                password'/>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}
export default ForgotPassword;