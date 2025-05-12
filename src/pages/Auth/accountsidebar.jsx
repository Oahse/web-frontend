
const AccountSideBar =({active=0})=>{
    const navLinks = [
            {
              "href": "my-account-dashboard.html",
              "active": active===0 ?true:false,
              "name": "Dashboard"
            },
            {
              "href": "my-account-orders.html",
              "active": active===1 ?true:false,
              "name": "Orders"
            },
            {
              "href": "my-account-address.html",
              "active": active===2 ?true:false,
              "name": "Address"
            },
            {
              "href": "my-account-edit.html",
              "active": active===3 ?true:false,
              "name": "Account Details"
            },
            {
              "href": "my-account-wishlist.html",
              "active": active===4 ?true:false,
              "name": "Wishlist"
            },
            {
              "href": "login.html",
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