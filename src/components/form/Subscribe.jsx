import Button from '../Button/Button';
import Link from '../Button/Link';
import { Email, Password, Text } from './input'

const Subscribe =()=>{
    return(
        <form className="form-newsletter" id="subscribe-form" action="#" method="post" acceptCharset="utf-8" data-mailchimp="true">
            <div id="subscribe-content">
            <Email field className="radius-60" name="email-form" id="subscribe-email" placeholder="Enter your email..." tabindex="0" aria-required="true"/>
            <div className="button-submit">
                <Button id={"subscribe-button"} size='sm' className='btn-icon radius-60' type="submit" fill={true} text='Subscribe' icon='icon-arrow1-top-left'/>
            </div>
            </div>
            <div id="subscribe-msg"></div>
        </form>
    )
}
export default Subscribe;