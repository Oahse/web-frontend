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
                <div className='d-flex justify-content-center align-items-center'>
                    {/* <Link to='/forgotPassword' data-bs-toggle="modal" text='Forgot your password?' /> */}
                    <ul className=" ms-auto tf-social-icon d-flex gap-10">
                        <li>
                            <Link to="#" className="box-icon w_34 round social-google social-line">
                                <img src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png" alt="Google" style={{ width: 16, height: 16 }} />
                            </Link>
                        </li>
                        <li><Link to="#" className="box-icon w_34 round social-facebook social-line"><i className="icon fs-14 icon-fb"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-twiter social-line"><i className="icon fs-12 icon-Icon-x"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-instagram social-line"><i className="icon fs-14 icon-instagram"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-tiktok social-line"><i className="icon fs-14 icon-tiktok"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-pinterest social-line"><i className="icon fs-14 icon-pinterest-1"></i></Link></li>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="w-100">
                        <Button type="submit" fill={true} text='Register'/>
                    </div>
                    <div className="w-100" >
                        <Link to='/login' text='Already have an account? Log in here' icon='icon-arrow1-top-left' />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;