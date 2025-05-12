import Icon from "@/components/Button/Icon";
import Link from "@/components/Button/Link";
import Card from "@/components/card/ProductCard";
import Grid from "@/components/grid";

const Tab= ({title, tab_list=[],active=0, content})=>{
    return(
        <div className="flat-animate-tab">
            <div className="flat-title flat-title-tab flex-row justify-content-between px-0">
                <span className="title text-nowrap fw-6 wow fadeInUp" data-wow-delay="0s">{title}</span>
                <ul className="widget-tab-5" role="tablist">
                    {tab_list.map((tab,index)=>(
                        <li key={index} className="nav-tab-item" role="presentation">
                            {tab.href[0]==='#'?
                            <Link to={tab.href} className={(active===index || tab.active === true)?'active':''} data-bs-toggle="tab" text={tab.name} />
                            
                            :
                            <a href="shop-collection-sub.html" className="d-flex align-items-center gap-10">
                                    {tab.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"
                                        fill="none">
                                        <path
                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </a>
                            }
                        </li>
                        
                    ))}
                </ul>
            </div>
            <div className="tab-content">
                {content}
                
            </div>
        </div>
    )
}
export default Tab;