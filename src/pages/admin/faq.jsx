import React, { useEffect, useState } from "react";

import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { fetchFaqs } from "@/services/api/faq";
import Accordion from "@/components/admin/accordion";
import useAdminStyles from '@/hooks/useAdminStyles';

const AdminFaqs = ({ isLoggedIn, loggedInUser,categories=[] }) => {
    useAdminStyles(); // ✅ dynamically manages admin styles
    const [loading, setLoading] = useState(false);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const [faqData, setFaqData] = useState([
        {
          "category": "Shopping Information",
          "faqs": [
            {
              "question": "How much is shipping and how long will it take?",
              "answer": "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              'active': true
            },
            {
              "question": "How long will it take to get my package?",
              "answer": "Packages are usually delivered within 3-5 business days depending on location."
            },
            {
              "question": "What happens if my package is delayed?",
              "answer": "If there is a delay, we will notify you and offer a full refund if necessary."
            }
          ]
        },
        {
          "category": "Payment Information",
          "faqs": [
            {
              "question": "What payment methods are accepted?",
              "answer": "We accept credit cards, PayPal, and bank transfers."
            },
            {
              "question": "Is there a fee for credit card payments?",
              "answer": "No, there are no additional fees for credit card payments.",
              'active': true
            },
            {
              "question": "Can I use my loyalty points to pay?",
              "answer": "Yes, loyalty points can be used for purchases, subject to the terms and conditions."
            }
          ]
        }
      ]);

    const showHideMenu = (e) => {
        e.preventDefault();
        var layoutWrap = document.getElementById('layout-wrap');
        if (isHeaderFullWidth) {
            layoutWrap.classList.remove('full-width');
        } else {
            layoutWrap.classList.add('full-width');
        }
        setIsHeaderFullWidth(!isHeaderFullWidth);
    };

    // Fetch FAQ data
    useEffect(() => {
        const getFaqs = async () => {
            setLoading(true);
            try {
                // Uncomment when you fetch data from the API
                // const result = await fetchFaqs();
                // setFaqData(result.data); // Store the fetched FAQs in state
                console.log('Data fetch simulation for now');
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        getFaqs();
    }, []); // This useEffect runs once when the component is mounted

    // Toggle active state for FAQs
    const toggleActive = (categoryIndex, faqIndex) => {
        setFaqData(prevFaqData => {
            const updatedFaqData = [...prevFaqData];
            updatedFaqData[categoryIndex].faqs[faqIndex].active =
                !updatedFaqData[categoryIndex].faqs[faqIndex].active;
            return updatedFaqData;
        });
    };

    return (
        <div id="wrapper">
            <div id="page" className="">
                <div id="layout-wrap" className="layout-wrap">
                    {loading && <Preloader />}
                    <SideBar activeMenu={1} onshowHideMenu={showHideMenu} />
                    <div className="section-content-right">
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={loggedInUser} />
                        <div className="main-content">
                            <div className="main-content-inner">
                                <div className="main-content-wrap">
                                    <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                        <h3>FAQ</h3>
                                        <Breadcrumbs
                                            items={[
                                                { label: 'Dashboard', href: '/admin' },
                                                { label: 'FAQ' }
                                            ]}
                                        />
                                    </div>
                                    <div className="tf-section-2">
                                        {/* Iterate over faqData and display it dynamically */}
                                        {faqData.length > 0 ? (
                                            faqData.map((category, categoryIndex) => (
                                                <Accordion 
                                                    key={categoryIndex} 
                                                    category={category}  
                                                    // toggleActive={toggleActive} 
                                                />
                                            ))
                                        ) : (
                                            <div>No FAQs available</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <AdminFooter />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminFaqs;
