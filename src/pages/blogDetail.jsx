import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra'
const BlogDetail =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                {/* <!-- blog-detail --> */}
                <div className="blog-detail">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="blog-detail-main">
                                    <div className="blog-detail-main-heading">
                                        <ul className="tags-lists justify-content-center">
                                            <li>
                                                <a href="#" className="tags-item">ACCESSORIES</a>
                                            </li>
                                            <li>
                                                <a href="#" className="tags-item">BAGS</a>
                                            </li>
                                        </ul>
                                        <div className="title">Something About This Style Of Jeans</div>
                                        <div className="meta">by <span>admin</span> on <span>Oct 02</span></div>
                                        <div className="image">
                                            <img className="lazyload" data-src="images/blog/blog-detail.jpg"
                                                src="images/blog/blog-detail.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <blockquote>
                                        <div className="icon">
                                            <img src="images/item/quote.svg" alt=""/>
                                        </div>
                                        <div className="text">
                                            Typography is the work of typesetters, compositors, typographers, graphic designers,
                                            art directors, manga artists, comic book artists, graffiti artists, and now—anyone
                                            who arranges words, letters, numbers, and symbols for publication, display, or
                                            distribution—from clerical workers and newsletter writers to anyone self-publishing
                                            materials.
                                        </div>
                                    </blockquote>
                                    <div className="grid-image">
                                        <div>
                                            <img className="lazyload" data-src="images/blog/blog-detail-1.jpg"
                                                src="images/blog/blog-detail-1.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="lazyload" data-src="images/blog/blog-detail-2.jpg"
                                                src="images/blog/blog-detail-2.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="desc">
                                        Pellentesque dapibus hendrerit tortor. Nam ipsum risus, rutrum vitae, vestibulum eu,
                                        molestie vel, lacus. Sed libero. Phasellus tempus. Etiam feugiat lorem non metus
                                        Maecenas vestibulum mollis diam. Pellentesque auctor neque nec urna. Pellentesque
                                        commodo eros a enim. Etiam sit amet orci eget eros faucibus tincidunt. Vestibulum purus
                                        quam, scelerisque ut, mollis sed, nonummy id, metus.In hac habitasse platea dictumst.
                                        Etiam ultricies nisi vel augue. Pellentesque egestas, neque sit amet convallis pulvinar,
                                        justo nulla eleifend augue, ac auctor orci leo non est. Quisque rutrum. Duis leo. <br/>
                                        <br/> <br/>
                                        Pellentesque dapibus hendrerit tortor. Nam ipsum risus, rutrum vitae, vestibulum eu,
                                        molestie vel, lacus. Sed libero. Phasellus tempus. Etiam feugiat lorem non metus. Morbi
                                        mattis ullamcorper velit. Donec sodales sagittis magna. Curabitur a felis in nunc
                                        fringilla tristique. Quisque malesuada placerat nisl. Phasellus gravida semper nisi.
                                        <br/> <br/> <br/>
                                        Curabitur blandit mollis lacus. Phasellus nec sem in justo pellentesque facilisis.
                                        Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce ac felis sit
                                        amet ligula pharetra condimentum. Integer tincidunt. <br/> <br/> <br/>
                                        Maecenas vestibulum mollis diam. Pellentesque auctor neque nec urna. Pellentesque
                                        commodo eros a enim. Etiam sit amet orci eget eros faucibus tincidunt. Vestibulum purus
                                        quam, scelerisque ut, mollis sed, nonummy id, metus.In hac habitasse platea dictumst.
                                        Etiam ultricies nisi vel augue. Pellentesque egestas, neque sit amet convallis pulvinar,
                                        justo nulla eleifend augue, ac auctor orci leo non est. Quisque rutrum. Duis leo.
                                    </div>
                                    <div className="bot d-flex justify-content-between flex-wrap align-items-center">
                                        <ul className="tags-lists">
                                            <li>
                                                <a href="#" className="tags-item"><span>Accessories</span></a>
                                            </li>
                                        </ul>
                                        <div className="d-flex align-items-center gap-20">
                                            <p>Share:</p>
                                            <ul className="tf-social-icon d-flex style-default">
                                                <li><a href="#" className="box-icon round social-facebook border-line-black"><i
                                                            className="icon fs-14 icon-fb"></i></a></li>
                                                <li><a href="#" className="box-icon round social-twiter border-line-black"><i
                                                            className="icon fs-12 icon-Icon-x"></i></a></li>
                                                <li><a href="#" className="box-icon round social-instagram border-line-black"><i
                                                            className="icon fs-14 icon-instagram"></i></a></li>
                                                <li><a href="#" className="box-icon round social-tiktok border-line-black"><i
                                                            className="icon fs-14 icon-tiktok"></i></a></li>
                                                <li><a href="#" className="box-icon round social-pinterest border-line-black"><i
                                                            className="icon fs-14 icon-pinterest-1"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tf-article-navigation">
                                        <div className="item position-relative d-flex w-100 prev">
                                            <a href="#" className="icon">
                                                <i className="icon-arrow-left"></i>
                                            </a>
                                            <div className="inner">
                                                <a href="#">PREVIOUS</a>
                                                <h6>
                                                    <a href="#">Fashionista editors reveal their designer</a>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="item position-relative d-flex w-100 justify-content-end next">
                                            <div className="inner text-end">
                                                <a href="#">NEXT</a>
                                                <h6>
                                                    <a href="#">The next generation of leather alternatives</a>
                                                </h6>
                                            </div>
                                            <a href="#" className="icon">
                                                <i className="icon-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-sidebar-mobile d-flex">
                    <button data-bs-toggle="offcanvas" data-bs-target="#sidebarmobile" aria-controls="offcanvasRight"><i
                            className="icon-open"></i></button>
                </div>
                {/* <!-- /blog-detail --> */}

                {/* <!-- Related Articles --> */}
                <section className="mb_30">
                    <div className="container">
                        <div className="flat-title">
                            <h5 className="">Related Articles</h5>
                        </div>
                        <div className="hover-sw-nav view-default hover-sw-5">
                            <div dir="ltr" className="swiper tf-sw-recent" data-preview="3" data-tablet="2" data-mobile="1"
                                data-space-lg="30" data-space-md="30" data-space="15" data-pagination="1" data-pagination-md="1"
                                data-pagination-lg="1">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" lazy="true">
                                        <div className="blog-article-item">
                                            <div className="article-thumb radius-10">
                                                <a href="blog-detail.html">
                                                    <img className="lazyload" data-src="images/blog/blog-1.jpg"
                                                        src="images/blog/blog-1.jpg" alt="img-blog"/>
                                                </a>
                                                <div className="article-label">
                                                    <a href="shop-collection-list.html"
                                                        className="tf-btn style-2 btn-fill radius-3 animate-hover-btn">Shop
                                                        collection</a>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <div className="article-title">
                                                    <a href="blog-detail.html" className="">Pop-punk is back in fashion</a>
                                                </div>
                                                <div className="article-btn">
                                                    <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                            className="icon icon-arrow1-top-left"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide" lazy="true">
                                        <div className="blog-article-item">
                                            <div className="article-thumb radius-10">
                                                <a href="blog-detail.html">
                                                    <img className="lazyload" data-src="images/blog/blog-2.jpg"
                                                        src="images/blog/blog-2.jpg" alt="img-blog"/>
                                                </a>
                                                <div className="article-label">
                                                    <a href="shop-collection-list.html"
                                                        className="tf-btn style-2 btn-fill radius-3 animate-hover-btn">Shop
                                                        collection</a>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <div className="article-title">
                                                    <a href="blog-detail.html" className="">The next generation of leather
                                                        alternatives</a>
                                                </div>
                                                <div className="article-btn">
                                                    <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                            className="icon icon-arrow1-top-left"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide" lazy="true">
                                        <div className="blog-article-item">
                                            <div className="article-thumb radius-10">
                                                <a href="blog-detail.html">
                                                    <img className="lazyload" data-src="images/blog/blog-3.jpg"
                                                        src="images/blog/blog-3.jpg" alt="img-blog"/>
                                                </a>
                                                <div className="article-label">
                                                    <a href="shop-collection-list.html"
                                                        className="tf-btn style-2 btn-fill radius-3 animate-hover-btn">Shop
                                                        collection</a>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <div className="article-title">
                                                    <a href="blog-detail.html" className="">An Exclusive Clothing Collaboration</a>
                                                </div>
                                                <div className="article-btn">
                                                    <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                            className="icon icon-arrow1-top-left"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide" lazy="true">
                                        <div className="blog-article-item">
                                            <div className="article-thumb radius-10">
                                                <a href="blog-detail.html">
                                                    <img className="lazyload" data-src="images/blog/blog-4.jpg"
                                                        src="images/blog/blog-4.jpg" alt="img-blog"/>
                                                </a>
                                                <div className="article-label">
                                                    <a href="shop-collection-list.html"
                                                        className="tf-btn style-2 btn-fill radius-3 animate-hover-btn">Shop
                                                        collection</a>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <div className="article-title">
                                                    <a href="blog-detail.html" className="">The next generation of leather
                                                        alternatives</a>
                                                </div>
                                                <div className="article-btn">
                                                    <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                            className="icon icon-arrow1-top-left"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide" lazy="true">
                                        <div className="blog-article-item">
                                            <div className="article-thumb radius-10">
                                                <a href="blog-detail.html">
                                                    <img className="lazyload" data-src="images/blog/blog-5.jpg"
                                                        src="images/blog/blog-5.jpg" alt="img-blog"/>
                                                </a>
                                                <div className="article-label">
                                                    <a href="shop-collection-list.html"
                                                        className="tf-btn style-2 btn-fill radius-3 animate-hover-btn">Shop
                                                        collection</a>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <div className="article-title">
                                                    <a href="blog-detail.html" className="">The next generation of leather
                                                        alternatives</a>
                                                </div>
                                                <div className="article-btn">
                                                    <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                            className="icon icon-arrow1-top-left"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide" lazy="true">
                                        <div className="blog-article-item">
                                            <div className="article-thumb radius-10">
                                                <a href="blog-detail.html">
                                                    <img className="lazyload" data-src="images/blog/blog-6.jpg"
                                                        src="images/blog/blog-6.jpg" alt="img-blog"/>
                                                </a>
                                                <div className="article-label">
                                                    <a href="shop-collection-list.html"
                                                        className="tf-btn style-2 btn-fill radius-3 animate-hover-btn">Shop
                                                        collection</a>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <div className="article-title">
                                                    <a href="blog-detail.html" className="">The next generation of leather
                                                        alternatives</a>
                                                </div>
                                                <div className="article-btn">
                                                    <a href="blog-detail.html" className="tf-btn btn-line fw-6">Read more<i
                                                            className="icon icon-arrow1-top-left"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-sw nav-next-slider nav-next-recent box-icon w_46 round"><span
                                    className="icon icon-arrow-left"></span></div>
                            <div className="nav-sw nav-prev-slider nav-prev-recent box-icon w_46 round"><span
                                    className="icon icon-arrow-right"></span></div>
                            <div className="sw-dots d-flex style-2 sw-pagination-recent justify-content-center"></div>
                        </div>
                    </div>
                </section>
                {/* <!-- /Related Articles --> */}
                <br/>
                <Footer />
            </div>
            <Extras categories={categories} />
        </div>
    )
}
export default BlogDetail;