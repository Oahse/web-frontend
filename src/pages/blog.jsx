import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra';
import BreadCrumbs from '@/components/breadcrumbs';

const Blog =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                {/* <!-- page-title --> */}
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="row">
                            <div className="col-12">
                                <div className="heading text-center">Blog</div>
                                <BreadCrumbs
                                    dir='center'
                                    links={[
                                        { name: 'Home', href: '/' },
                                        { name: 'Blog' }
                                    ]}
                                    // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                                    // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                                    // back={{ href: '/products', tooltip: 'Back to Products' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /page-title --> */}

                {/* <!-- blog-grid-main --> */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="blog-sidebar-main">
                                <div className="list-blog">
                                    <div className="blog-article-item">
                                        <div className="article-thumb">
                                            <a href="blog-detail.html">
                                                <img className="lazyload" data-src="images/shop/article/image-1.jpg"
                                                    src="images/shop/article/image-1.jpg" alt=""/>
                                            </a>
                                            <div className="article-label">
                                                <a href="blog-detail.html"
                                                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Tech</a>
                                            </div>
                                        </div>
                                        <div className="article-content">
                                            <div className="article-title">
                                                <a href="blog-detail.html" className="">The Limited Edition Club des Sports
                                                    Courchevel</a>
                                            </div>
                                            <div className="article-btn">
                                                <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                        className="icon icon-arrow1-top-left"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="blog-article-item">
                                                <div className="article-thumb">
                                                    <a href="blog-detail.html">
                                                        <img className="lazyload" data-src="images/shop/article/image-2.jpg"
                                                            src="images/shop/article/image-2.jpg" alt=""/>
                                                    </a>
                                                    <div className="article-label">
                                                        <a href="blog-detail.html"
                                                            className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Tech</a>
                                                    </div>
                                                </div>
                                                <div className="article-content">
                                                    <div className="article-title">
                                                        <a href="blog-detail.html" className="">The Variety Of Styles And Prices Are
                                                            Endless</a>
                                                    </div>
                                                    <div className="article-btn">
                                                        <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                                className="icon icon-arrow1-top-left"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-article-item">
                                                <div className="article-thumb">
                                                    <a href="blog-detail.html">
                                                        <img className="lazyload" data-src="images/shop/article/sidebar-1.jpg"
                                                            src="images/shop/article/sidebar-1.jpg" alt=""/>
                                                    </a>
                                                    <div className="article-label">
                                                        <a href="blog-detail.html"
                                                            className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Tech</a>
                                                    </div>
                                                </div>
                                                <div className="article-content">
                                                    <div className="article-title">
                                                        <a href="blog-detail.html" className="">Effortlessly Blends The Carefree
                                                            Style</a>
                                                    </div>
                                                    <div className="article-btn">
                                                        <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                                className="icon icon-arrow1-top-left"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-article-item">
                                        <div className="article-thumb">
                                            <a href="blog-detail.html">
                                                <img className="lazyload" data-src="images/shop/article/sidebar-3.jpg"
                                                    src="images/shop/article/sidebar-3.jpg" alt=""/>
                                            </a>
                                            <div className="article-label">
                                                <a href="blog-detail.html"
                                                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Tech</a>
                                            </div>
                                        </div>
                                        <div className="article-content">
                                            <div className="article-title">
                                                <a href="blog-detail.html" className="">Christine Is A True Style Icon</a>
                                            </div>
                                            <div className="article-btn">
                                                <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                        className="icon icon-arrow1-top-left"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="blog-article-item">
                                                <div className="article-thumb">
                                                    <a href="blog-detail.html">
                                                        <img className="lazyload" data-src="images/shop/article/image-3.jpg"
                                                            src="images/shop/article/image-3.jpg" alt=""/>
                                                    </a>
                                                    <div className="article-label">
                                                        <a href="blog-detail.html"
                                                            className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Tech</a>
                                                    </div>
                                                </div>
                                                <div className="article-content">
                                                    <div className="article-title">
                                                        <a href="blog-detail.html" className="">Hello Fashion by
                                                            Colombian-American</a>
                                                    </div>
                                                    <div className="article-btn">
                                                        <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                                className="icon icon-arrow1-top-left"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-article-item">
                                                <div className="article-thumb">
                                                    <a href="blog-detail.html">
                                                        <img className="lazyload" data-src="images/shop/article/image-4.jpg"
                                                            src="images/shop/article/image-4.jpg" alt=""/>
                                                    </a>
                                                    <div className="article-label">
                                                        <a href="blog-detail.html"
                                                            className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Tech</a>
                                                    </div>
                                                </div>
                                                <div className="article-content">
                                                    <div className="article-title">
                                                        <a href="blog-detail.html" className="">An Exclusive Clothing
                                                            Collaboration</a>
                                                    </div>
                                                    <div className="article-btn">
                                                        <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                                className="icon icon-arrow1-top-left"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="wg-pagination">
                                        <li className="active">
                                            <div className="pagination-item">1</div>
                                        </li>
                                        <li>
                                            <a href="#" className="pagination-item animate-hover-btn">2</a>
                                        </li>
                                        <li>
                                            <a href="#" className="pagination-item animate-hover-btn">3</a>
                                        </li>
                                        <li>
                                            <a href="#" className="pagination-item animate-hover-btn"><i
                                                    className="icon-arrow-right"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tf-section-sidebar wrap-sidebar-mobile">
                                    <div className="sidebar-item sidebar-categories">
                                        <div className="sidebar-title">Blog categories</div>
                                        <div className="sidebar-content">
                                            <ul>
                                                <li>
                                                    <a href="#">Accessories<span>(9)</span></a>
                                                </li>
                                                <li>
                                                    <a href="#">Bag<span>(9)</span></a>
                                                </li>
                                                <li>
                                                    <a href="#">Cookware & Kitchen<span>(9)</span></a>
                                                </li>
                                                <li>
                                                    <a href="#">Decor<span>(9)</span></a>
                                                </li>
                                                <li>
                                                    <a href="#">Decorate<span>(9)</span></a>
                                                </li>
                                                <li>
                                                    <a href="#">Denim<span>(9)</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-item sidebar-post">
                                        <div className="sidebar-title">Recent Post</div>
                                        <div className="sidebar-content">
                                            <ul>
                                                <li>
                                                    <div className="blog-article-item style-sidebar">
                                                        <div className="article-thumb">
                                                            <a href="blog-detail.html">
                                                                <img src="images/shop/article/sidebar-1.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="article-content">
                                                            <div className="article-label">
                                                                <a href="blog-detail.html"
                                                                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Accessories</a>
                                                            </div>
                                                            <div className="article-title">
                                                                <a href="blog-detail.html" className="">Effortlessly Blends The
                                                                    Carefree Style</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="blog-article-item style-sidebar">
                                                        <div className="article-thumb">
                                                            <a href="blog-detail.html">
                                                                <img src="images/shop/article/sidebar-2.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="article-content">
                                                            <div className="article-label">
                                                                <a href="blog-detail.html"
                                                                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Accessories</a>
                                                            </div>
                                                            <div className="article-title">
                                                                <a href="blog-detail.html" className="">The Limited Edition Club des
                                                                    Sports Courchevel</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="blog-article-item style-sidebar">
                                                        <div className="article-thumb">
                                                            <a href="blog-detail.html">
                                                                <img src="images/shop/article/sidebar-3.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="article-content">
                                                            <div className="article-label">
                                                                <a href="blog-detail.html"
                                                                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn">Fashion</a>
                                                            </div>
                                                            <div className="article-title">
                                                                <a href="blog-detail.html" className="">Christine Is A True Style
                                                                    Icon</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-item sidebar-tags">
                                        <div className="sidebar-title">Blog tags</div>
                                        <div className="sidebar-content">
                                            <ul className="tags-lists">
                                                <li>
                                                    <a href="#" className="tags-item">Bags</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="tags-item">Fashion</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-item sidebar-instagram">
                                        <div className="sidebar-title">Instagram</div>
                                        <div className="sidebar-content">
                                            <ul>
                                                <li>
                                                    <img src="images/shop/file/img-1.jpg" alt=""/>
                                                </li>
                                                <li>
                                                    <img src="images/shop/file/img-2.jpg" alt=""/>
                                                </li>
                                                <li>
                                                    <img src="images/shop/file/img-3.jpg" alt=""/>
                                                </li>
                                                <li>
                                                    <img src="images/shop/file/img-4.jpg" alt=""/>
                                                </li>
                                                <li>
                                                    <img src="images/shop/file/img-5.jpg" alt=""/>
                                                </li>
                                                <li>
                                                    <img src="images/shop/file/img-6.png" alt=""/>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-sidebar-mobile">
                    <button data-bs-toggle="offcanvas" data-bs-target="#sidebarmobile" aria-controls="offcanvasRight"><i
                            className="icon-open"></i></button>
                </div>
                {/* <!-- /blog-grid-main --> */}
                <Footer />
            </div>
            <Extras categories={categories} />
        </div>
    )
}
export default Blog;