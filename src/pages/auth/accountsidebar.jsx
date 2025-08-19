import { Link } from "react-router-dom";
import AccountNavBar from '@/pages/auth/accountnavbar';

const AccountSideBar =({active=0})=>{
    
    return(
        <div className="wrap-sidebar-account">
            <AccountNavBar active={active}/>
        </div>
    )
}
export default AccountSideBar;