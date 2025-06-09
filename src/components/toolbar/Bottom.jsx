import { Link } from "react-router-dom";

const BottomToolBar =()=> {
    return(
        <div className="tf-toolbar-bottom type-1150">
            <div className="toolbar-item">
                <a href="#toolbarShopmb" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft">
                    <div className="toolbar-icon">
                        <i className="icon-shop"></i>
                    </div>
                    <div className="toolbar-label">Shop</div>
                </a>
            </div>
            <div className="toolbar-item">
                <a href="#canvasSearch" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft">
                    <div className="toolbar-icon">
                        <i className="icon-search"></i>
                    </div>
                    <div className="toolbar-label">Search</div>
                </a>
            </div>
            <div className="toolbar-item">
                <Link to="/account" >
                    <div className="toolbar-icon">
                        <i className="icon-account"></i>
                    </div>
                    <div className="toolbar-label">Account</div>
                </Link>
            </div>
            <div className="toolbar-item">
                <Link to="/account/wishlist">
                    <div className="toolbar-icon">
                        <i className="icon-heart"></i>
                        <div className="toolbar-count">0</div>
                    </div>
                    <div className="toolbar-label">Wishlist</div>
                </Link>
            </div>
            <div className="toolbar-item">
                <a href="#shoppingCart" data-bs-toggle="modal">
                    <div className="toolbar-icon">
                        <i className="icon-bag"></i>
                        <div className="toolbar-count">1</div>
                    </div>
                    <div className="toolbar-label">Cart</div>
                </a>
            </div>
        </div>
    )
}
export default BottomToolBar;