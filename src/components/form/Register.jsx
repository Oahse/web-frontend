import Button from '../Button/Button';
import Link from '../Button/Link';
import { Email, Password, Text } from './input'

const Register =({action=''})=>{
    return(
        <div className="tf-login-form">
            <form className="" action={action} accept-charset="utf-8">
                <Text name='firstname' label ='First Name'/>
                <Text name ='lastname' label ='Last Names'/>
                <Email name ='email' />
                <Password id ='password' />
                
                <div className="bottom">
                    <div className="w-100">
                        <Button type="submit" fill={true} text='Register'/>
                    </div>
                    <div className="w-100">
                        <Link to='#register' data-bs-toggle="modal" text='Already have an account? Log in here' icon='icon-arrow1-top-left' />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;