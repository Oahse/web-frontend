import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra';

const PrivacyPolicy =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                {/* <!-- page-title --> */}
                <div className="tf-page-title style-2">
                    <div className="container-full">
                        <div className="heading text-center">Privacy Policy</div>
                    </div>
                </div>
                {/* <!-- /page-title --> */}
                {/* <!-- main-page --> */}
                <section className="flat-spacing-25">
                    <div className="container">
                        <div className="tf-main-area-page">
                            <h4>The Company Private Limited Policy</h4>
                            <p>The Company Private Limited and each of their respective subsidiary, parent and affiliated
                                companies is deemed to operate this Website (“we” or “us”) recognizes that you care how
                                information about you is used and shared. We have created this Privacy Policy to inform you what
                                information we collect on the Website, how we use your information and the choices you have
                                about the way your information is collected and used. Please read this Privacy Policy carefully.
                                Your use of the Website indicates that you have read and accepted our privacy practices, as
                                outlined in this Privacy Policy.</p>
                            <p>Please be advised that the practices described in this Privacy Policy apply to information
                                gathered by us or our subsidiaries, affiliates or agents: (i) through this Website, (ii) where
                                applicable, through our Customer Service Department in connection with this Website, (iii)
                                through information provided to us in our free standing retail stores, and (iv) through
                                information provided to us in conjunction with marketing promotions and sweepstakes.</p>
                            <p>We are not responsible for the content or privacy practices on any websites.</p>
                            <p>We reserve the right, in our sole discretion, to modify, update, add to, discontinue, remove or
                                otherwise change any portion of this Privacy Policy, in whole or in part, at any time. When we
                                amend this Privacy Policy, we will revise the “last updated” date located at the top of this
                                Privacy Policy.</p>
                            <p>If you provide information to us or access or use the Website in any way after this Privacy
                                Policy has been changed, you will be deemed to have unconditionally consented and agreed to such
                                changes. The most current version of this Privacy Policy will be available on the Website and
                                will supersede all previous versions of this Privacy Policy.</p>
                            <p>If you have any questions regarding this Privacy Policy, you should contact our Customer Service
                                Department by email at marketing@company.com</p>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
            <Extras categories={categories} />
        </div>
     )
 }
 export default PrivacyPolicy;