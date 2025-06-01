
const AccountSideBar =({active=0})=>{
    const navLinks = [
            {
              "href": "/account",
              "active": active===0 ?true:false,
              "name": "Dashboard"
            },
            {
              "href": "/account/orders",
              "active": active===1 ?true:false,
              "name": "Orders"
            },
            {
              "href": "/account/address",
              "active": active===2 ?true:false,
              "name": "Account Address"
            },
            {
              "href": "/account/details",
              "active": active===3 ?true:false,
              "name": "Account Details"
            },
            {
              "href": "/account/wishlist",
              "active": active===4 ?true:false,
              "name": "Wishlist"
            },
            {
              "href": "/login",
              "active": active===5 ?true:false,
              "name": "Logout"
            }
        ]
    return(
        <div className="wrap-sidebar-account">
            <ul className="my-account-nav">
                {
                    navLinks.map((link, index)=>(
                        <li key={index}>
                            <a href={link.href} className={`my-account-nav-item ${(active===index || link.active ===true) && 'active'}`}>{link.name}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default AccountSideBar;