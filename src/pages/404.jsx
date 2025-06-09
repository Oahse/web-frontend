import { useState } from "react";
import Footer from "@/components/footer"
import Header from "@/components/toolbar/header"
import Extras from "@/components/extra"
import imgnotfound from "@/assets/images/item/404.svg"

const NotFound =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    return(
        <div className="preload-wrapper">
            {loading &&  <Loader />}
            <div id="wrapper">
                <Header/>

                {/* <<!-- page-404 --> */}
                <section className="page-404-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="image">
                                    <img src={imgnotfound} alt="404"/>
                                </div>
                                <div className="title">
                                    Oops...That link is broken.
                                </div>
                                <p>Sorry for the inconvenience. Go to our homepage to check out our latest collections.</p>
                                <a href="shop-default.html"
                                    className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Shop now</a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /page-404 --> */}

                <Footer />

            </div>

            <Extras categories={categories} />
        </div>
    )
}

export default NotFound;