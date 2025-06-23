import { useState } from 'react';
import BottomToolBar from '@/components/toolbar/Bottom';
import Modal from '@/components/modal';
import Login from '@/components/form/Login';
import ForgotPassword from '@/components/form/ForgotPassword';
import Register from '@/components/form/Register';
import { Link } from 'react-router-dom';
import grocery1 from '@/assets/images/products/grocery-1.jpg';
import grocery2 from '@/assets/images/products/grocery-2.jpg';
import Scroller3 from '@/components/scroller3';
import { ToastContainer, notify } from '@/services/notifications/ui';
import QuantitySelector from '@/components/quantityselector';
import VariantPicker from '@/components/variantpicker';
import Camera from '@/components/form/Camera';
import AccountNavBar from '@/pages/auth/accountnavbar';
import Search2 from '@/components/form/Search2';
import { handleAddToCart,handleAddToWishlist, getDiscount } from '@/services/helper';
import PaymentOptions from '@/components/paymentMethods';
import { paymentMethods,rateSentence } from '@/services/helper';
import { sendMessage,editMessage } from "@/services/sockets";

const Extras  =({categories=[], product=null, amount=1, active=0, user, paymentMethod, currentComment})=>{
    
    const [quantity, setQuantity] = useState(amount);
    const defaultMethod = paymentMethods.find(pm => pm.id === 'credit_card') || paymentMethods[0];
    const initialMethod = paymentMethod ? paymentMethods.find(pm => pm.id === paymentMethod) : defaultMethod;
    
    const [paymentmethod, setpaymentMethod] = useState(initialMethod);
    const [askformData, setAskFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [selectedRating, setSelectedRating] = useState(0); // UI feedback only
    const [editedRating, setEditedRating] = useState(0);
    const [reviewformData, setReviewFormData] = useState({
        userid: user?.id || '',
        userimage: user?.image,
        username: `${user?.firstname}${user?.firstname}`,
        datetime: new Date().toISOString(),
        product_id: product?.id,
        rating: 0,
        comment: "",
    });
    
    const [editformData, setEditFormData] = useState(currentComment);
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setAskFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleStarClick = (index) => {
        const newRating = index + 1;
        setSelectedRating(newRating);
        setReviewFormData((prev) => ({
            ...prev,
            rating: newRating,
        }));


        setEditedRating(newRating);
        setEditFormData((prev) => ({
            ...prev,
            rating: newRating,
        }));
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;

        setReviewFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => {
            return {
                ...currentComment,
                [name]: value,
            };
        });

    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!reviewformData.rating || !reviewformData.comment) {
        
            notify({ text: `Please fill in all required fields.`, type: 'error' });
        return;
        }

        try {
            const key = `reviews_${product.id}`;
            const res = sendMessage(key, JSON.stringify(reviewformData));
            if (res.success){
                // Reset form
                setReviewFormData({
                    userid: user?.id || '',
                    userimage: user?.image,
                    username: `${user?.firstname}${user?.firstname}`,
                    datetime: new Date().toISOString(),
                    product_id: product?.id,
                    rating: 0,
                    comment: "",
                });
                notify({ text: `Review submitted successfully!`, type: 'success' });
            }else{
                notify({ text: res.error, type: 'error' });
            }
        } catch (error) {
            notify({ text: `Review submission failed: ${error}!`, type: 'error' });
        }
    };
    const handleReviewEdit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!editformData.rating || !editformData.comment) {
            notify({ text: `Please fill in all required fields.`, type: 'error' });
            return;
        }

        try {
            const key = `reviews_${product.id}`;
            const res = editMessage(key, JSON.stringify(editformData));
            if (res.success){
                // Reset form
                setEditFormData({
                    userid: user?.id || '',
                    userimage: user?.image,
                    username: `${user?.firstname}${user?.firstname}`,
                    datetime: new Date().toISOString(),
                    product_id: product?.id,
                    rating: 0,
                    comment: "",
                });
                notify({ text: `Review Edited successfully!`, type: 'success' });
            }else{
                notify({ text: res.error, type: 'error' });
            }
        } catch (error) {
            notify({ text: `Review Edit failed: ${error}!`, type: 'error' });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!askformData.name || !askformData.email || !askformData.message) {
        alert("Please fill in all required fields.");
        return;
        }

        // Log or send the form data (example only)
        try {
            // console.log("Form Submitted:", askformData);
            // alert("Form submitted successfully!");
            notify({ text: `Ask a question Form submitted successfully!`, type: 'success' });

            // Reset form
            setAskFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            // alert("Something went wrong. Please try again later.");
            notify({ text: `Ask a question Form submission failed: ${error}!`, type: 'error' });
        }
    };

    return(
        <>
            <button id="goTop" style={{opacity:1}}>
                <span className="border-progress"></span>
                <span className="icon icon-arrow-up"></span>
            </button>
            {/* <!-- toolbar-bottom --> */}
            <BottomToolBar />
            {/* <!-- /toolbar-bottom --> */}

            <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="edit_review">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="header">
                            <div className="demo-title">Edit a Review</div>
                            <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                        </div>
                        <div className="overflow-y-auto">
                                <form onSubmit={handleReviewEdit}>
                                    
                                    <fieldset className='mb-3'>
                                        <label className='me-2'>Rating * </label>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <i
                                                    key={index}
                                                    onClick={() => handleStarClick(index)}
                                                    className={`icon icon-star ${(index < currentComment?.rating || (index < editformData?.rating) || index < editedRating) ? 'icon-active' : 'icon-inactive'}`}
                                                    style={{ cursor: 'pointer' }}
                                                ></i>
                                            ))}
                                    </fieldset>
                                    <fieldset>
                                        <label>Comment</label>
                                        <textarea name="comment" rows="4" value={editformData?.comment || currentComment?.comment}
                                            onChange={handleEditChange}></textarea>
                                    </fieldset>
                                    <button type="submit" className="tf-btn w-100 btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn">
                                        <span>Save</span>
                                    </button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="write_review">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="header">
                            <div className="demo-title">Write a Review</div>
                            <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                        </div>
                        <div className="overflow-y-auto">
                                <form onSubmit={handleReviewSubmit}>
                                    
                                    <fieldset className='mb-3'>
                                        <label className='me-2'>Rating *</label>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <i
                                                    key={index}
                                                    onClick={() => handleStarClick(index)}
                                                    className={`icon icon-star ${index < selectedRating ? 'icon-active' : 'icon-inactive'}`}
                                                    style={{ cursor: 'pointer' }}
                                                ></i>
                                            ))}


                                    </fieldset>
                                    <fieldset>
                                        <label>Comment</label>
                                        <textarea name="comment" rows="4" value={reviewformData.comment}
                                            onChange={handleReviewChange}></textarea>
                                    </fieldset>
                                    <button type="submit" className="tf-btn w-100 btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn">
                                        <span>Send</span>
                                    </button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- modal ask_question --> */}
            <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="ask_question">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="header">
                            <div className="demo-title">Ask a question</div>
                            <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                        </div>
                        <div className="overflow-y-auto">
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
                                        <label>Name *</label>
                                        <input type="text" name="name" required value={askformData.name}
                                            onChange={handleChange}/>
                                    </fieldset>
                                    <fieldset>
                                        <label>Email *</label>
                                        <input type="email" name="email" required value={askformData.email}
                                                onChange={handleChange}/>
                                    </fieldset>
                                    <fieldset>
                                        <label>Phone number</label>
                                        <input type="number" name="phone" value={askformData.phone}
                                            onChange={handleChange}/>
                                    </fieldset>
                                    <fieldset>
                                        <label>Message</label>
                                        <textarea name="message" rows="4" required value={askformData.message}
                                            onChange={handleChange}></textarea>
                                    </fieldset>
                                    <button type="submit" className="tf-btn w-100 btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn">
                                        <span>Send</span>
                                    </button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /modal ask_question -->

            <!-- modal delivery_return --> */}
            <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="delivery_return">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="header">
                            <div className="demo-title">Shipping & Delivery</div>
                            <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                        </div>
                        <div className="overflow-y-auto">
                            <div className="tf-product-popup-delivery">
                                <div className="title">Delivery</div>
                                <p className="text-paragraph">All orders shipped with UPS Express.</p>
                                <p className="text-paragraph">Always free shipping for orders over US $250.</p>
                                <p className="text-paragraph">All orders are shipped with a UPS tracking number.</p>
                            </div>
                            <div className="tf-product-popup-delivery">
                                <div className="title">Returns</div>
                                <p className="text-paragraph">Items returned within 14 days in like-new condition are eligible for full refund or store credit.</p>
                                <p className="text-paragraph">Refunds go to the original form of payment.</p>
                                <p className="text-paragraph">Customer pays return shipping. Original shipping fees are non-refundable.</p>
                                <p className="text-paragraph">Sale items are final purchase.</p>
                            </div>
                            <div className="tf-product-popup-delivery">
                                <div className="title">Help</div>
                                <p className="text-paragraph">Need help? Reach out any time.</p>
                                <p className="text-paragraph">Email: <a href="mailto:contact@domain.com">contact@domain.com</a></p>
                                <p className="text-paragraph mb-0">Phone: +1 (23) 456 789</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /modal delivery_return -->

            <!-- modal share social --> */}
            <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="share_social">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="header">
                            <div className="demo-title">Share</div>
                            <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                        </div>
                        <div className="overflow-y-auto">
                            <ul className="tf-social-icon d-flex gap-10">
                                <li><a href="#" className="box-icon social-facebook bg_line"><i className="icon icon-fb"></i></a></li>
                                <li><a href="#" className="box-icon social-twiter bg_line"><i className="icon icon-Icon-x"></i></a></li>
                                <li><a href="#" className="box-icon social-instagram bg_line"><i className="icon icon-instagram"></i></a></li>
                                <li><a href="#" className="box-icon social-tiktok bg_line"><i className="icon icon-tiktok"></i></a></li>
                                <li><a href="#" className="box-icon social-pinterest bg_line"><i className="icon icon-pinterest-1"></i></a></li>
                            </ul>
                            <form className="form-share">
                                <fieldset>
                                    <input type="text" value="https://themesflat.co/html/ecomus/" readOnly />
                                </fieldset>
                                <div className="button-submit">
                                    <button type="button" className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Copy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /modal share social --> */}

            <div className="modal fade modalDemo" id="modalDemo">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="header">
                            <h5 className="demo-title">Ultimate HTML Theme</h5>
                            <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                        </div>
                        <div className="mega-menu">
                            <div className="row-demo">
                                <div className="demo-item">
                                    <Link to="index-2.html">
                                        <div className="demo-image position-relative">
                                            <img className="lazyload" data-src="images/demo/home-01.jpg"
                                                src="images/demo/home-01.jpg" alt="home-01"/>
                                            <div className="demo-label">
                                                <span className="demo-new">New</span>
                                                <span>Trend</span>
                                            </div>
                                        </div>
                                        <span className="demo-name">Home Fashion 01</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-multi-brand.html">
                                        <div className="demo-image position-relative">
                                            <img className="lazyload" data-src="images/demo/home-multi-brand.jpg"
                                                src="images/demo/home-multi-brand.jpg" alt="home-multi-brand"/>
                                            <div className="demo-label">
                                                <span className="demo-new">New</span>
                                                <span className="demo-hot">Hot</span>
                                            </div>
                                        </div>
                                        <span className="demo-name">Home Multi Brand</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-02.html">
                                        <div className="demo-image position-relative">
                                            <img className="lazyload" data-src="images/demo/home-02.jpg"
                                                src="images/demo/home-02.jpg" alt="home-02"/>
                                            <div className="demo-label">
                                                <span className="demo-hot">Hot</span>
                                            </div>
                                        </div>
                                        <span className="demo-name">Home Fashion 02</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-03.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-03.jpg"
                                                src="images/demo/home-03.jpg" alt="home-03"/>
                                        </div>
                                        <span className="demo-name">Home Fashion 03</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-04.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-04.jpg"
                                                src="images/demo/home-04.jpg" alt="home-04"/>
                                        </div>
                                        <span className="demo-name">Home Fashion 04</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-05.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-05.jpg"
                                                src="images/demo/home-05.jpg" alt="home-05"/>
                                        </div>
                                        <span className="demo-name">Home Fashion 05</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-06.html">
                                        <div className="demo-image position-relative">
                                            <img className="lazyload" data-src="images/demo/home-06.jpg"
                                                src="images/demo/home-06.jpg" alt="home-06"/>
                                        </div>
                                        <span className="demo-name">Home Fashion 06</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-drinkwear.html">
                                        <div className="demo-image position-relative">
                                            <img className="lazyload" data-src="images/demo/home-drinkwear.png"
                                                src="images/demo/home-drinkwear.png" alt="home-drinkwear"/>
                                            <div className="demo-label">
                                                <span className="demo-new">New</span>
                                            </div>
                                        </div>
                                        <span className="demo-name">Home Drinkwear</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-supplement.html">
                                        <div className="demo-image position-relative">
                                            <img className="lazyload" data-src="images/demo/home-supplement.png"
                                                src="images/demo/home-supplement.png" alt="home-supplement"/>
                                            <div className="demo-label">
                                                <span className="demo-new">New</span>
                                            </div>
                                        </div>
                                        <span className="demo-name">Home Supplement</span>
                                    </Link>
                                </div>

                                <div className="demo-item">
                                    <Link to="home-personalized-pod.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-personalized-pod.jpg"
                                                src="images/demo/home-personalized-pod.jpg" alt="home-personalized-pod"/>
                                        </div>
                                        <span className="demo-name">Home Personalized Pod</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-pickleball.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-pickleball.png"
                                                src="images/demo/home-pickleball.png" alt="home-pickleball"/>
                                        </div>
                                        <span className="demo-name">Home Pickleball</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-ceramic.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-ceramic.png"
                                                src="images/demo/home-ceramic.png" alt="home-ceramic"/>
                                        </div>
                                        <span className="demo-name">Home Ceramic</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-food.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-food.png"
                                                src="images/demo/home-food.png" alt="home-food"/>
                                        </div>
                                        <span className="demo-name">Home Food</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-camp-and-hike.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-camp-and-hike.png"
                                                src="images/demo/home-camp-and-hike.png" alt="home-camp-and-hike"/>
                                        </div>
                                        <span className="demo-name">Home Camp And Hike</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-07.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-07.jpg"
                                                src="images/demo/home-07.jpg" alt="home-07"/>
                                        </div>
                                        <span className="demo-name">Home Fashion 07</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-08.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-08.jpg"
                                                src="images/demo/home-08.jpg" alt="home-08"/>
                                        </div>
                                        <span className="demo-name">Home Fashion 08</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-skincare.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-skincare.jpg"
                                                src="images/demo/home-skincare.jpg" alt="home-skincare"/>
                                        </div>
                                        <span className="demo-name">Home Skincare</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-headphone.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-headphone.jpg"
                                                src="images/demo/home-headphone.jpg" alt="home-headphone"/>
                                        </div>
                                        <span className="demo-name">Home Headphone</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-giftcard.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-giftcard.jpg"
                                                src="images/demo/home-giftcard.jpg" alt="home-gift-card"/>
                                        </div>
                                        <span className="demo-name">Home Gift Card</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-furniture.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-furniture.jpg"
                                                src="images/demo/home-furniture.jpg" alt="home-furniture"/>
                                        </div>
                                        <span className="demo-name">Home Furniture</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-furniture-02.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-furniture2.jpg"
                                                src="images/demo/home-furniture2.jpg" alt="home-furniture-2"/>
                                        </div>
                                        <span className="demo-name">Home Furniture 2</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-skateboard.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-skateboard.jpg"
                                                src="images/demo/home-skateboard.jpg" alt="home-skateboard"/>
                                        </div>
                                        <span className="demo-name">Home Skateboard</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-stroller.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-stroller.jpg"
                                                src="images/demo/home-stroller.jpg" alt="home-stroller"/>
                                        </div>
                                        <span className="demo-name">Home Stroller</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-decor.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-decor.jpg"
                                                src="images/demo/home-decor.jpg" alt="home-decor"/>
                                        </div>
                                        <span className="demo-name">Home Decor</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-electronic.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-electronic.jpg"
                                                src="images/demo/home-electronic.jpg" alt="home-electronic"/>
                                        </div>
                                        <span className="demo-name">Home Electronic</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-setup-gear.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-setup-gear.jpg"
                                                src="images/demo/home-setup-gear.jpg" alt="home-setup-gear"/>
                                        </div>
                                        <span className="demo-name">Home Setup Gear</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-dog-accessories.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-dog-accessories.jpg"
                                                src="images/demo/home-dog-accessories.jpg" alt="home-dog-accessories"/>
                                        </div>
                                        <span className="demo-name">Home Dog Accessories</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-kitchen-wear.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-kitchen.jpg"
                                                src="images/demo/home-kitchen.jpg" alt="home-kitchen-wear"/>
                                        </div>
                                        <span className="demo-name">Home Kitchen Wear</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-phonecase.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-phonecase.jpg"
                                                src="images/demo/home-phonecase.jpg" alt="home-phonecase"/>
                                        </div>
                                        <span className="demo-name">Home Phonecase</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-paddle-boards.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home_paddle_board.jpg"
                                                src="images/demo/home_paddle_board.jpg" alt="home-paddle_board"/>
                                        </div>
                                        <span className="demo-name">Home Paddle Boards</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-glasses.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-glasses.jpg"
                                                src="images/demo/home-glasses.jpg" alt="home-glasses"/>
                                        </div>
                                        <span className="demo-name">Home Glasses</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-pod-store.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-pod-store.jpg"
                                                src="images/demo/home-pod-store.jpg" alt="home-pod-store"/>
                                        </div>
                                        <span className="demo-name">Home POD Store</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-activewear.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-activewear.jpg"
                                                src="images/demo/home-activewear.jpg" alt="home-activewear"/>
                                        </div>
                                        <span className="demo-name">Activewear</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-handbag.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-handbag.jpg"
                                                src="images/demo/home-handbag.jpg" alt="home-handbag"/>
                                        </div>
                                        <span className="demo-name">Home Handbag</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-tee.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-tee.jpg"
                                                src="images/demo/home-tee.jpg" alt="home-tee"/>
                                        </div>
                                        <span className="demo-name">Home Tee</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-sock.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-socks.jpg"
                                                src="images/demo/home-socks.jpg" alt="home-sock"/>
                                        </div>
                                        <span className="demo-name">Home Sock</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-jewerly.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-jewelry.jpg"
                                                src="images/demo/home-jewelry.jpg" alt="home-jewelry"/>
                                        </div>
                                        <span className="demo-name">Home Jewelry</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-sneaker.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-sneaker.jpg"
                                                src="images/demo/home-sneaker.jpg" alt="home-sneaker"/>
                                        </div>
                                        <span className="demo-name">Home Sneaker</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-accessories.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-accessories.jpg"
                                                src="images/demo/home-accessories.jpg" alt="home-accessories"/>
                                        </div>
                                        <span className="demo-name">Home Accessories</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-grocery.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-gocery.jpg"
                                                src="images/demo/home-gocery.jpg" alt="home-grocery"/>
                                        </div>
                                        <span className="demo-name">Home Grocery</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-baby.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-baby.jpg"
                                                src="images/demo/home-baby.jpg" alt="home-baby"/>
                                        </div>
                                        <span className="demo-name">Home Baby</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-cosmetic.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-cosmetic.png"
                                                src="images/demo/home-cosmetic.png" alt="home-cosmetic"/>
                                        </div>
                                        <span className="demo-name">Home Cosmetic</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-plant.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-plant.png"
                                                src="images/demo/home-plant.png" alt="home-plant"/>
                                        </div>
                                        <span className="demo-name">Home Plant</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-swimwear.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-swimwear.png"
                                                src="images/demo/home-swimwear.png" alt="home-swimwear"/>
                                        </div>
                                        <span className="demo-name">Home Swimwear</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-electric-bike.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-electric-bike.png"
                                                src="images/demo/home-electric-bike.png" alt="home-electric-bike"/>
                                        </div>
                                        <span className="demo-name">Home Electric Bike</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-footwear.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-footwear.jpg"
                                                src="images/demo/home-footwear.jpg" alt="home-footwear"/>
                                        </div>
                                        <span className="demo-name">Home Footwear</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-book-store.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-bookstore.png"
                                                src="images/demo/home-bookstore.png" alt="home-bookstore"/>
                                        </div>
                                        <span className="demo-name">Home Bookstore</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-gaming-accessories.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-gaming-accessories.png"
                                                src="images/demo/home-gaming-accessories.png" alt="home-gaming-accessories"/>
                                        </div>
                                        <span className="demo-name">Home Gaming Accessories</span>
                                    </Link>
                                </div>
                                <div className="demo-item">
                                    <Link to="home-parallax.html">
                                        <div className="demo-image">
                                            <img className="lazyload" data-src="images/demo/home-skincare.jpg"
                                                src="images/demo/home-skincare.jpg" alt="home-skincare"/>
                                        </div>
                                        <span className="demo-name">Home Parallax</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <!-- mobile menu --> */}
            <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
                <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
                <div className="mb-canvas-content">
                    <div className="mb-body">
                        <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                            <li className="nav-mb-item">
                                <Link to="/" className="mb-menu-link">Home</Link>
                            </li>
                            
                            <li className="nav-mb-item">
                                <Link to="/Linkbout" className="mb-menu-link">About</Link>
                            </li>
                            <li className="nav-mb-item">
                                <Link to="/contact" className="mb-menu-link">Contact</Link>
                            </li>
                            <li className="nav-mb-item">
                                <Link to="/faq" className="mb-menu-link">Faq</Link>
                            </li>
                            <li className="nav-mb-item">
                                <Link to="/blog" className="mb-menu-link">Blog</Link>
                            </li>
                            
                        </ul>
                        <div className="mb-other-content">
                            <div className="d-flex group-icon">
                                <Link to="/account/wishlist" className="site-nav-icon"><i className="icon icon-heart"></i>Wishlist</Link>
                                <Link to="#canvasSearch"  data-bs-toggle='offcanvas' data-bs-target="#canvasSearch" className="site-nav-icon"><i className="icon icon-search"></i>Search</Link>
                            </div>
                            <div className="mb-notice">
                                <Link to="/contact" className="text-need">Need help ?</Link>
                            </div>
                            <ul className="mb-info">
                                <li>Address: 1234 Fashion Street, Suite 567, <br/> New York, NY 10001</li>
                                <li>Email: <b>info@fashionshop.com</b></li>
                                <li>Phone: <b>(212) 555-1234</b></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mb-bottom">
                        <Link to="/login/" className="site-nav-icon"><i className="icon icon-account"></i>Login</Link>
                        <span className='ms-2'></span>
                        <Link to="/admin" className="site-nav-icon"><i className="icon icon-account"></i>Admin</Link>
                        <div className="bottom-bar-language">
                            <div className="tf-currencies">
                                <select className="image-select center style-default type-currencies">
                                    <option data-thumbnail="images/country/fr.svg">EUR € | France</option>
                                    <option data-thumbnail="images/country/de.svg">EUR € | Germany</option>
                                    <option selected data-thumbnail="images/country/us.svg">USD $ | United States</option>
                                    <option data-thumbnail="images/country/vn.svg">VND ₫ | Vietnam</option>
                                </select>
                            </div>
                            <div className="tf-languages">
                                <select className="image-select center style-default type-languages">
                                    <option>English</option>
                                    <option>العربية</option>
                                    <option>简体中文</option>
                                    <option>اردو</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- mobile menu --> */}
            
            <div class="offcanvas offcanvas-start canvas-filter canvas-sidebar canvas-sidebar-account" id="mbAccount">
                <div class="canvas-wrapper">
                    <header class="canvas-header">
                        <span class="title">ACCOUNT</span>
                        <span class="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
                    </header>
                    <div class="canvas-body sidebar-mobile-append"> 
                        <AccountNavBar active={active}/>
                    </div>
                </div>
            </div>

            {/* <!-- canvasSearch --> */}
            <div className="offcanvas offcanvas-end canvas-search" id="canvasSearch">
                <div className="canvas-wrapper">
                    <header className="tf-search-head ">
                        <div className="title fw-5">
                            Search our site
                            <div className="close">
                                <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
                            </div>
                        </div>
                        <Search2 />
                    </header>
                    <div className="canvas-body p-0">
                        <div className="tf-search-content">
                            <div className="tf-cart-hide-has-results">
                                <div className="tf-col-quicklink">
                                    <div className="tf-search-content-title fw-5">Quick link</div>
                                    <ul className="tf-quicklink-list">
                                        <li className="tf-quicklink-item">
                                            <Link to="/products" className="">Fruits and Veggies</Link>
                                        </li>
                                        <li className="tf-quicklink-item">
                                            <Link to="/products" className="">Oils</Link>
                                        </li>
                                        <li className="tf-quicklink-item">
                                            <Link to="/products" className="">Brands</Link>
                                        </li>
                                        <li className="tf-quicklink-item">
                                            <Link to="/products" className="">Nuts, Flowers and Beverages</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tf-col-content">
                                    <div className="tf-search-content-title fw-5">Need some inspiration?</div>
                                    <div className="tf-search-hidden-inner">
                                        <div className="tf-loop-item">
                                            <div className="image">
                                                <Link to="/products/1">
                                                    <img src={grocery1} alt=""/>
                                                </Link>
                                            </div>
                                            <div className="content">
                                                <Link to="product-detail.html">Cotton jersey top</Link>
                                                <div className="tf-product-info-price">
                                                    <div className="compare-at-price">$10.00</div>
                                                    <div className="price-on-sale fw-6">$8.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tf-loop-item">
                                            <div className="image">
                                                <Link to="/products/2">
                                                    <img src={grocery2} alt=""/>
                                                </Link>
                                            </div>
                                            <div className="content">
                                                <Link to="product-detail.html">Mini crossbody bag</Link>
                                                <div className="tf-product-info-price">
                                                    <div className="price fw-6">$18.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tf-loop-item">
                                            <div className="image">
                                                <Link to="/products/3">
                                                    <img src={grocery2} alt=""/>
                                                </Link>
                                            </div>
                                            <div className="content">
                                                <Link to="/products">Oversized Printed T-shirt</Link>
                                                <div className="tf-product-info-price">
                                                    <div className="price fw-6">$18.00</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- canvasSearch --> */}

            {/* <!-- toolbarShopmb --> */}
            <div className="offcanvas offcanvas-start canvas-mb toolbar-shop-mobile" id="toolbarShopmb">
                <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
                <div className="mb-canvas-content">
                    <div className="mb-body">
                        <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                            {categories.map((category, index) => (
                                <li key={index} className="nav-mb-item">
                                    <Link 
                                        to={category.items ? `#cate-menu-${category.name}` : "/products"} 
                                        className={`tf-category-link ${category.items ? 'has-children' : ''} collapsed mb-menu-link`} 
                                        data-bs-toggle={category.items ? "collapse" : undefined} 
                                        aria-expanded="false" 
                                        aria-controls={category.items ? `cate-menu-${category.name}` : undefined}
                                    >
                                        <div className="image">
                                        <img src={category.image} alt={category.name} />
                                        </div>
                                        <span className="link">{category.name}</span>
                                        {category.items && <span className="btn-open-sub"></span>}
                                    </Link>

                                    {category.items && (
                                        <div id={`cate-menu-${category.name}`} className="collapse list-cate">
                                            <ul className="sub-nav-menu">
                                                {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <Link to="/products/2" 
                                                    className="tf-category-link sub-nav-link"
                                                    >
                                                    <div className="image">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-bottom">
                        <Link to="shop-default.html" className="tf-btn fw-5 btn-line">View all collection<i
                                className="icon icon-arrow1-top-left"></i></Link>
                    </div>
                </div>
            </div>
            {/* <!-- toolbarShopmb --> */}
            <Modal 
                id="camera" 
                title='Camera'
                className='form-sign-in modal-part-content'
                body={<Camera />} 
            />
            {/* <!-- modal login --> */}
            
            <Modal 
                id="login" 
                title='Log in'
                className='form-sign-in modal-part-content'
                body={<Login />} 
            />
            <Modal 
                id="forgotPassword" 
                title='Reset your password'
                className='form-sign-in modal-part-content'
                body={<ForgotPassword />} 
            />
            <Modal 
                id="register" 
                title='Register'
                className='form-sign-in modal-part-content'
                body={<Register />} 
            />

        {/* <!-- /modal login --> */}

        {/* <!-- shoppingCart --> */}
        <Modal 
            id="shoppingCart"
            title='Shopping cart'
            centered={false}
            className='modal-shopping-cart'
            body={<div className="wrap">
                <div className="tf-mini-cart-threshold">
                    <div className="tf-progress-bar">
                        <span style={{width: "50%"}}>
                            <div className="progress-car">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14"
                                    fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M0 0.875C0 0.391751 0.391751 0 0.875 0H13.5625C14.0457 0 14.4375 0.391751 14.4375 0.875V3.0625H17.3125C17.5867 3.0625 17.845 3.19101 18.0104 3.40969L20.8229 7.12844C20.9378 7.2804 21 7.46572 21 7.65625V11.375C21 11.8582 20.6082 12.25 20.125 12.25H17.7881C17.4278 13.2695 16.4554 14 15.3125 14C14.1696 14 13.1972 13.2695 12.8369 12.25H7.72563C7.36527 13.2695 6.39293 14 5.25 14C4.10706 14 3.13473 13.2695 2.77437 12.25H0.875C0.391751 12.25 0 11.8582 0 11.375V0.875ZM2.77437 10.5C3.13473 9.48047 4.10706 8.75 5.25 8.75C6.39293 8.75 7.36527 9.48046 7.72563 10.5H12.6875V1.75H1.75V10.5H2.77437ZM14.4375 8.89937V4.8125H16.8772L19.25 7.94987V10.5H17.7881C17.4278 9.48046 16.4554 8.75 15.3125 8.75C15.0057 8.75 14.7112 8.80264 14.4375 8.89937ZM5.25 10.5C4.76676 10.5 4.375 10.8918 4.375 11.375C4.375 11.8582 4.76676 12.25 5.25 12.25C5.73323 12.25 6.125 11.8582 6.125 11.375C6.125 10.8918 5.73323 10.5 5.25 10.5ZM15.3125 10.5C14.8293 10.5 14.4375 10.8918 14.4375 11.375C14.4375 11.8582 14.8293 12.25 15.3125 12.25C15.7957 12.25 16.1875 11.8582 16.1875 11.375C16.1875 10.8918 15.7957 10.5 15.3125 10.5Z">
                                    </path>
                                </svg>
                            </div>
                        </span>
                    </div>
                    <div className="tf-progress-msg">
                        Buy <span className="price fw-6">$75.00</span> more to enjoy <span className="fw-6">Free
                            Shipping</span>
                    </div>
                </div>
                <div className="tf-mini-cart-wrap">
                    <div className="tf-mini-cart-main">
                        <div className="tf-mini-cart-sroll">
                            <div className="tf-mini-cart-items">
                                <div className="tf-mini-cart-item">
                                    <div className="tf-mini-cart-image">
                                        <Link to='/products/1'>
                                            <img src={grocery1} alt=""/>
                                        </Link>
                                    </div>
                                    <div className="tf-mini-cart-info">
                                        <Link className="title link" to='/products/1'>T-shirt</Link>
                                        <div className="meta-variant">Light gray</div>
                                        <div className="price fw-6">$25.00</div>
                                        <div className="tf-mini-cart-btns">
                                            <div className="wg-quantity small">
                                                <QuantitySelector />
                                            </div>
                                            <div className="tf-mini-cart-remove">Remove</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tf-mini-cart-item">
                                    <div className="tf-mini-cart-image">
                                        <Link to='/products/2'>
                                            <img src={grocery2} alt=""/>
                                        </Link>
                                    </div>
                                    <div className="tf-mini-cart-info">
                                        <Link className="title link" to='/products/2'>Oversized Motif T-shirt</Link>
                                        <div className="price fw-6">$25.00</div>
                                        <div className="tf-mini-cart-btns">
                                            <div className="wg-quantity small">
                                                <QuantitySelector />
                                            </div>
                                            <div className="tf-mini-cart-remove">Remove</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tf-minicart-recommendations">
                                <div className="tf-minicart-recommendations-heading">
                                    <div className="tf-minicart-recommendations-title">You may also like</div>
                                    <div className="sw-dots small style-2 cart-slide-pagination"></div>
                                </div>
                                <div dir="ltr" className="swiper tf-cart-slide">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="tf-minicart-recommendations-item">
                                                <div className="tf-minicart-recommendations-item-image">
                                                    <Link to='/products/1'>
                                                        <img src={grocery1} alt=""/>
                                                    </Link>
                                                </div>
                                                <div className="tf-minicart-recommendations-item-infos flex-grow-1">
                                                    <Link className="title" to='/products/2'>Loose Fit
                                                        Sweatshirt</Link>
                                                    <div className="price">$25.00</div>
                                                </div>
                                                <div className="tf-minicart-recommendations-item-quickview">
                                                    <div className="btn-show-quickview quickview hover-tooltip">
                                                        <span className="icon icon-view"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="tf-minicart-recommendations-item">
                                                <div className="tf-minicart-recommendations-item-image">
                                                    <Link to='/products/2'>
                                                        <img src={grocery2} alt=""/>
                                                    </Link>
                                                </div>
                                                <div className="tf-minicart-recommendations-item-infos flex-grow-1">
                                                    <Link className="title" to={'/products/2'}>Loose Fit Hoodie</Link>
                                                    <div className="price">$25.00</div>
                                                </div>
                                                <div className="tf-minicart-recommendations-item-quickview">
                                                    <div className="btn-show-quickview quickview hover-tooltip">
                                                        <span className="icon icon-view"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-mini-cart-bottom">
                        <div className="tf-mini-cart-tool">
                            <div className="tf-mini-cart-tool-btn btn-add-note">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18"
                                    fill="currentColor">
                                    <path
                                        d="M5.12187 16.4582H2.78952C2.02045 16.4582 1.39476 15.8325 1.39476 15.0634V2.78952C1.39476 2.02045 2.02045 1.39476 2.78952 1.39476H11.3634C12.1325 1.39476 12.7582 2.02045 12.7582 2.78952V7.07841C12.7582 7.46357 13.0704 7.77579 13.4556 7.77579C13.8407 7.77579 14.1529 7.46357 14.1529 7.07841V2.78952C14.1529 1.25138 12.9016 0 11.3634 0H2.78952C1.25138 0 0 1.25138 0 2.78952V15.0634C0 16.6015 1.25138 17.8529 2.78952 17.8529H5.12187C5.50703 17.8529 5.81925 17.5407 5.81925 17.1555C5.81925 16.7704 5.50703 16.4582 5.12187 16.4582Z">
                                    </path>
                                    <path
                                        d="M15.3882 10.0971C14.5724 9.28136 13.2452 9.28132 12.43 10.0965L8.60127 13.9168C8.51997 13.9979 8.45997 14.0979 8.42658 14.2078L7.59276 16.9528C7.55646 17.0723 7.55292 17.1993 7.58249 17.3207C7.61206 17.442 7.67367 17.5531 7.76087 17.6425C7.84807 17.7319 7.95768 17.7962 8.07823 17.8288C8.19879 17.8613 8.32587 17.8609 8.44621 17.8276L11.261 17.0479C11.3769 17.0158 11.4824 16.9543 11.5675 16.8694L15.3882 13.0559C16.2039 12.2401 16.2039 10.9129 15.3882 10.0971ZM10.712 15.7527L9.29586 16.145L9.71028 14.7806L12.2937 12.2029L13.2801 13.1893L10.712 15.7527ZM14.4025 12.0692L14.2673 12.204L13.2811 11.2178L13.4157 11.0834C13.6876 10.8115 14.1301 10.8115 14.402 11.0834C14.6739 11.3553 14.6739 11.7977 14.4025 12.0692Z">
                                    </path>
                                </svg>
                            </div>
                            <div className="tf-mini-cart-tool-btn btn-add-gift">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18"
                                    fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M2.99566 2.73409C2.99566 0.55401 5.42538 -0.746668 7.23916 0.463462L8.50073 1.30516L9.7623 0.463462C11.5761 -0.746668 14.0058 0.55401 14.0058 2.73409V3.24744H14.8225C15.9633 3.24744 16.8881 4.17233 16.8881 5.31312V6.82566C16.8881 7.21396 16.5734 7.52873 16.1851 7.52873H15.8905V15.1877C15.8905 15.1905 15.8905 15.1933 15.8905 15.196C15.886 16.7454 14.6286 18 13.0782 18H3.92323C2.37003 18 1.11091 16.7409 1.11091 15.1877V7.52877H0.81636C0.42806 7.52877 0.113281 7.21399 0.113281 6.82569V5.31316C0.113281 4.17228 1.03812 3.24744 2.179 3.24744H2.99566V2.73409ZM4.40181 3.24744H7.79765V2.52647L6.45874 1.63317C5.57987 1.0468 4.40181 1.67677 4.40181 2.73409V3.24744ZM9.20381 2.52647V3.24744H12.5996V2.73409C12.5996 1.67677 11.4216 1.0468 10.5427 1.63317L9.20381 2.52647ZM2.179 4.6536C1.81472 4.6536 1.51944 4.94888 1.51944 5.31316V6.12261H5.73398L5.734 4.6536H2.179ZM5.73401 7.52877V13.9306C5.73401 14.1806 5.86682 14.4119 6.08281 14.5379C6.29879 14.6639 6.56545 14.6657 6.78312 14.5426L8.50073 13.5715L10.2183 14.5426C10.436 14.6657 10.7027 14.6639 10.9187 14.5379C11.1346 14.4119 11.2674 14.1806 11.2674 13.9306V7.52873H14.4844V15.1603C14.4844 15.1627 14.4843 15.1651 14.4843 15.1675V15.1877C14.4843 15.9643 13.8548 16.5938 13.0782 16.5938H3.92323C3.14663 16.5938 2.51707 15.9643 2.51707 15.1877V7.52877H5.73401ZM15.482 6.12258V5.31312C15.482 4.94891 15.1867 4.6536 14.8225 4.6536H11.2674V6.12258H15.482ZM9.86129 4.6536H7.14017V12.7254L8.15469 12.1518C8.36941 12.0304 8.63204 12.0304 8.84676 12.1518L9.86129 12.7254V4.6536Z">
                                    </path>
                                </svg>
                            </div>
                            <div className="tf-mini-cart-tool-btn btn-estimate-shipping">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" viewBox="0 0 26 18"
                                    fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M0 0.811989C0 0.36354 0.36354 0 0.811989 0H15.4278C15.8763 0 16.2398 0.36354 16.2398 0.811989V3.10596H21.0144C23.6241 3.10596 25.8643 5.05894 25.8643 7.61523V14.6414C25.8643 15.0899 25.5007 15.4534 25.0523 15.4534H23.545C23.2139 16.9115 21.9098 18 20.3514 18C18.7931 18 17.4889 16.9115 17.1578 15.4534H8.69534C8.36423 16.9115 7.0601 18 5.50175 18C3.9434 18 2.63927 16.9115 2.30815 15.4534H0.811989C0.36354 15.4534 0 15.0899 0 14.6414V0.811989ZM2.35089 13.8294C2.74052 12.4562 4.00366 11.4503 5.50175 11.4503C6.99983 11.4503 8.26298 12.4562 8.6526 13.8294H14.6158V1.62398H1.62398V13.8294H2.35089ZM16.2398 4.72994V7.95749H24.2403V7.61523C24.2403 6.08759 22.8649 4.72994 21.0144 4.72994H16.2398ZM24.2403 9.58147H16.2398V13.8294H17.2006C17.5902 12.4562 18.8533 11.4503 20.3514 11.4503C21.8495 11.4503 23.1126 12.4562 23.5023 13.8294H24.2403V9.58147ZM5.50175 13.0743C4.58999 13.0743 3.85087 13.8134 3.85087 14.7251C3.85087 15.6369 4.58999 16.376 5.50175 16.376C6.41351 16.376 7.15263 15.6369 7.15263 14.7251C7.15263 13.8134 6.41351 13.0743 5.50175 13.0743ZM20.3514 13.0743C19.4397 13.0743 18.7005 13.8134 18.7005 14.7251C18.7005 15.6369 19.4397 16.376 20.3514 16.376C21.2632 16.376 22.0023 15.6369 22.0023 14.7251C22.0023 13.8134 21.2632 13.0743 20.3514 13.0743Z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div className="tf-mini-cart-bottom-wrap">
                            <div className="tf-cart-totals-discounts">
                                <div className="tf-cart-total">Subtotal</div>
                                <div className="tf-totals-total-value fw-6">$49.99 USD</div>
                            </div>
                            <div className="tf-cart-tax" data-bs-dismiss="modal">Taxes and <Link to="/shipping">shipping</Link> calculated at checkout</div>
                            <div className="tf-mini-cart-line"></div>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="" type="checkbox" id="CartDrawer-Form_agree"
                                        name="agree_checkbox"/>
                                    <div>
                                        <i className="icon-check"></i>
                                    </div>
                                </div>
                                <label for="CartDrawer-Form_agree" data-bs-dismiss="modal">
                                    I agree with the
                                    <Link to="/terms" className='ms-2' title="Terms of Service">terms and conditions</Link>
                                </label>
                            </div>
                            <div className="tf-mini-cart-view-checkout" data-bs-dismiss="modal">
                                <Link to="/Linkccount/cart"
                                    className="tf-btn btn-outline radius-3 link w-100 justify-content-center">View
                                    cart</Link>
                                <Link to="/Linkccount/orders/checkout"
                                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"><span>Check
                                        out</span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="tf-mini-cart-tool-openable add-note">
                        <div className="overplay tf-mini-cart-tool-close"></div>
                        <div className="tf-mini-cart-tool-content">
                            <label for="Cart-note" className="tf-mini-cart-tool-text">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18"
                                        viewBox="0 0 16 18" fill="currentColor">
                                        <path
                                            d="M5.12187 16.4582H2.78952C2.02045 16.4582 1.39476 15.8325 1.39476 15.0634V2.78952C1.39476 2.02045 2.02045 1.39476 2.78952 1.39476H11.3634C12.1325 1.39476 12.7582 2.02045 12.7582 2.78952V7.07841C12.7582 7.46357 13.0704 7.77579 13.4556 7.77579C13.8407 7.77579 14.1529 7.46357 14.1529 7.07841V2.78952C14.1529 1.25138 12.9016 0 11.3634 0H2.78952C1.25138 0 0 1.25138 0 2.78952V15.0634C0 16.6015 1.25138 17.8529 2.78952 17.8529H5.12187C5.50703 17.8529 5.81925 17.5407 5.81925 17.1555C5.81925 16.7704 5.50703 16.4582 5.12187 16.4582Z">
                                        </path>
                                        <path
                                            d="M15.3882 10.0971C14.5724 9.28136 13.2452 9.28132 12.43 10.0965L8.60127 13.9168C8.51997 13.9979 8.45997 14.0979 8.42658 14.2078L7.59276 16.9528C7.55646 17.0723 7.55292 17.1993 7.58249 17.3207C7.61206 17.442 7.67367 17.5531 7.76087 17.6425C7.84807 17.7319 7.95768 17.7962 8.07823 17.8288C8.19879 17.8613 8.32587 17.8609 8.44621 17.8276L11.261 17.0479C11.3769 17.0158 11.4824 16.9543 11.5675 16.8694L15.3882 13.0559C16.2039 12.2401 16.2039 10.9129 15.3882 10.0971ZM10.712 15.7527L9.29586 16.145L9.71028 14.7806L12.2937 12.2029L13.2801 13.1893L10.712 15.7527ZM14.4025 12.0692L14.2673 12.204L13.2811 11.2178L13.4157 11.0834C13.6876 10.8115 14.1301 10.8115 14.402 11.0834C14.6739 11.3553 14.6739 11.7977 14.4025 12.0692Z">
                                        </path>
                                    </svg>
                                </div>
                                <span>Add Order Note</span>
                            </label>
                            <textarea name="note" id="Cart-note" placeholder="How can we help you?"></textarea>
                            <div className="tf-cart-tool-btns justify-content-center">
                                <div
                                    className="tf-mini-cart-tool-primary text-center w-100 fw-6 tf-mini-cart-tool-close">
                                    Close</div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-mini-cart-tool-openable add-gift">
                        <div className="overplay tf-mini-cart-tool-close"></div>
                        <form className="tf-product-form-addgift">
                            <div className="tf-mini-cart-tool-content">
                                <div className="tf-mini-cart-tool-text">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M4.65957 3.64545C4.65957 0.73868 7.89921 -0.995558 10.3176 0.617949L11.9997 1.74021L13.6818 0.617949C16.1001 -0.995558 19.3398 0.73868 19.3398 3.64545V4.32992H20.4286C21.9498 4.32992 23.1829 5.56311 23.1829 7.08416V9.10087C23.1829 9.61861 22.7632 10.0383 22.2454 10.0383H21.8528V20.2502C21.8528 20.254 21.8527 20.2577 21.8527 20.2614C21.8467 22.3272 20.1702 24 18.103 24H5.89634C3.82541 24 2.14658 22.3212 2.14658 20.2502V10.0384H1.75384C1.23611 10.0384 0.816406 9.61865 0.816406 9.10092V7.08421C0.816406 5.56304 2.04953 4.32992 3.57069 4.32992H4.65957V3.64545ZM6.53445 4.32992H11.0622V3.36863L9.27702 2.17757C8.10519 1.39573 6.53445 2.2357 6.53445 3.64545V4.32992ZM12.9371 3.36863V4.32992H17.4649V3.64545C17.4649 2.2357 15.8942 1.39573 14.7223 2.17756L12.9371 3.36863ZM3.57069 6.2048C3.08499 6.2048 2.69128 6.59851 2.69128 7.08421V8.16348H8.31067L8.3107 6.2048H3.57069ZM8.31071 10.0384V18.5741C8.31071 18.9075 8.48779 19.2158 8.77577 19.3838C9.06376 19.5518 9.4193 19.5542 9.70953 19.3901L11.9997 18.0953L14.2898 19.3901C14.58 19.5542 14.9356 19.5518 15.2236 19.3838C15.5115 19.2158 15.6886 18.9075 15.6886 18.5741V10.0383H19.9779V20.2137C19.9778 20.2169 19.9778 20.2201 19.9778 20.2233V20.2502C19.9778 21.2857 19.1384 22.1251 18.103 22.1251H5.89634C4.86088 22.1251 4.02146 21.2857 4.02146 20.2502V10.0384H8.31071ZM21.308 8.16344V7.08416C21.308 6.59854 20.9143 6.2048 20.4286 6.2048H15.6886V8.16344H21.308ZM13.8138 6.2048H10.1856V16.9672L11.5383 16.2024C11.8246 16.0405 12.1748 16.0405 12.461 16.2024L13.8138 16.9672V6.2048Z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div className="tf-gift-wrap-infos">
                                        <p>Do you want a gift wrap?</p>
                                        Only
                                        <span className="price fw-6">$5.00</span>
                                    </div>
                                </div>
                                <div className="tf-cart-tool-btns">
                                    <button type="submit"
                                        className="tf-btn fw-6 w-100 justify-content-center btn-fill animate-hover-btn radius-3"><span>Add
                                            a gift wrap</span></button>
                                    <div
                                        className="tf-mini-cart-tool-primary text-center w-100 fw-6 tf-mini-cart-tool-close">
                                        Cancel</div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="tf-mini-cart-tool-openable estimate-shipping">
                        <div className="overplay tf-mini-cart-tool-close"></div>
                        <div className="tf-mini-cart-tool-content">
                            <div className="tf-mini-cart-tool-text">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15"
                                        viewBox="0 0 21 15" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M0.441406 1.13155C0.441406 0.782753 0.724159 0.5 1.07295 0.5H12.4408C12.7896 0.5 13.0724 0.782753 13.0724 1.13155V2.91575H16.7859C18.8157 2.91575 20.5581 4.43473 20.5581 6.42296V11.8878C20.5581 12.2366 20.2753 12.5193 19.9265 12.5193H18.7542C18.4967 13.6534 17.4823 14.5 16.2703 14.5C15.0582 14.5 14.0439 13.6534 13.7864 12.5193H7.20445C6.94692 13.6534 5.93259 14.5 4.72054 14.5C3.50849 14.5 2.49417 13.6534 2.23664 12.5193H1.07295C0.724159 12.5193 0.441406 12.2366 0.441406 11.8878V1.13155ZM2.26988 11.2562C2.57292 10.1881 3.55537 9.40578 4.72054 9.40578C5.88572 9.40578 6.86817 10.1881 7.17121 11.2562H11.8093V1.76309H1.7045V11.2562H2.26988ZM13.0724 4.17884V6.68916H19.295V6.42296C19.295 5.2348 18.2252 4.17884 16.7859 4.17884H13.0724ZM19.295 7.95226H13.0724V11.2562H13.8196C14.1227 10.1881 15.1051 9.40578 16.2703 9.40578C17.4355 9.40578 18.4179 10.1881 18.7209 11.2562H19.295V7.95226ZM4.72054 10.6689C4.0114 10.6689 3.43652 11.2437 3.43652 11.9529C3.43652 12.662 4.0114 13.2369 4.72054 13.2369C5.42969 13.2369 6.00456 12.662 6.00456 11.9529C6.00456 11.2437 5.42969 10.6689 4.72054 10.6689ZM16.2703 10.6689C15.5611 10.6689 14.9863 11.2437 14.9863 11.9529C14.9863 12.662 15.5611 13.2369 16.2703 13.2369C16.9794 13.2369 17.5543 12.662 17.5543 11.9529C17.5543 11.2437 16.9794 10.6689 16.2703 10.6689Z">
                                        </path>
                                    </svg>
                                </div>
                                <span className="fw-6">Estimate Shipping</span>
                            </div>
                            <div className="field">
                                <p>Country</p>
                                <select className="tf-select w-100" id="ShippingCountry_CartDrawer-Form"
                                    name="address[country]" data-default="">
                                    <option value="---" data-provinces="[]">---</option>
                                    <option value="Australia"
                                        data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]">
                                        Australia</option>
                                    <option value="Austria" data-provinces="[]">Austria</option>
                                    <option value="Belgium" data-provinces="[]">Belgium</option>
                                    <option value="Canada"
                                        data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]">
                                        Canada</option>
                                    <option value="Czech Republic" data-provinces="[]">Czechia</option>
                                    <option value="Denmark" data-provinces="[]">Denmark</option>
                                    <option value="Finland" data-provinces="[]">Finland</option>
                                    <option value="France" data-provinces="[]">France</option>
                                    <option value="Germany" data-provinces="[]">Germany</option>
                                    <option value="Hong Kong"
                                        data-provinces="[['Hong Kong Island','Hong Kong Island'],['Kowloon','Kowloon'],['New Territories','New Territories']]">
                                        Hong Kong SAR</option>
                                    <option value="Ireland"
                                        data-provinces="[['Carlow','Carlow'],['Cavan','Cavan'],['Clare','Clare'],['Cork','Cork'],['Donegal','Donegal'],['Dublin','Dublin'],['Galway','Galway'],['Kerry','Kerry'],['Kildare','Kildare'],['Kilkenny','Kilkenny'],['Laois','Laois'],['Leitrim','Leitrim'],['Limerick','Limerick'],['Longford','Longford'],['Louth','Louth'],['Mayo','Mayo'],['Meath','Meath'],['Monaghan','Monaghan'],['Offaly','Offaly'],['Roscommon','Roscommon'],['Sligo','Sligo'],['Tipperary','Tipperary'],['Waterford','Waterford'],['Westmeath','Westmeath'],['Wexford','Wexford'],['Wicklow','Wicklow']]">
                                        Ireland</option>
                                    <option value="Israel" data-provinces="[]">Israel</option>
                                    <option value="Italy"
                                        data-provinces="[['Agrigento','Agrigento'],['Alessandria','Alessandria'],['Ancona','Ancona'],['Aosta','Aosta Valley'],['Arezzo','Arezzo'],['Ascoli Piceno','Ascoli Piceno'],['Asti','Asti'],['Avellino','Avellino'],['Bari','Bari'],['Barletta-Andria-Trani','Barletta-Andria-Trani'],['Belluno','Belluno'],['Benevento','Benevento'],['Bergamo','Bergamo'],['Biella','Biella'],['Bologna','Bologna'],['Bolzano','South Tyrol'],['Brescia','Brescia'],['Brindisi','Brindisi'],['Cagliari','Cagliari'],['Caltanissetta','Caltanissetta'],['Campobasso','Campobasso'],['Carbonia-Iglesias','Carbonia-Iglesias'],['Caserta','Caserta'],['Catania','Catania'],['Catanzaro','Catanzaro'],['Chieti','Chieti'],['Como','Como'],['Cosenza','Cosenza'],['Cremona','Cremona'],['Crotone','Crotone'],['Cuneo','Cuneo'],['Enna','Enna'],['Fermo','Fermo'],['Ferrara','Ferrara'],['Firenze','Florence'],['Foggia','Foggia'],['Forlì-Cesena','Forlì-Cesena'],['Frosinone','Frosinone'],['Genova','Genoa'],['Gorizia','Gorizia'],['Grosseto','Grosseto'],['Imperia','Imperia'],['Isernia','Isernia'],['L'Aquila','L’Aquila'],['La Spezia','La Spezia'],['Latina','Latina'],['Lecce','Lecce'],['Lecco','Lecco'],['Livorno','Livorno'],['Lodi','Lodi'],['Lucca','Lucca'],['Macerata','Macerata'],['Mantova','Mantua'],['Massa-Carrara','Massa and Carrara'],['Matera','Matera'],['Medio Campidano','Medio Campidano'],['Messina','Messina'],['Milano','Milan'],['Modena','Modena'],['Monza e Brianza','Monza and Brianza'],['Napoli','Naples'],['Novara','Novara'],['Nuoro','Nuoro'],['Ogliastra','Ogliastra'],['Olbia-Tempio','Olbia-Tempio'],['Oristano','Oristano'],['Padova','Padua'],['Palermo','Palermo'],['Parma','Parma'],['Pavia','Pavia'],['Perugia','Perugia'],['Pesaro e Urbino','Pesaro and Urbino'],['Pescara','Pescara'],['Piacenza','Piacenza'],['Pisa','Pisa'],['Pistoia','Pistoia'],['Pordenone','Pordenone'],['Potenza','Potenza'],['Prato','Prato'],['Ragusa','Ragusa'],['Ravenna','Ravenna'],['Reggio Calabria','Reggio Calabria'],['Reggio Emilia','Reggio Emilia'],['Rieti','Rieti'],['Rimini','Rimini'],['Roma','Rome'],['Rovigo','Rovigo'],['Salerno','Salerno'],['Sassari','Sassari'],['Savona','Savona'],['Siena','Siena'],['Siracusa','Syracuse'],['Sondrio','Sondrio'],['Taranto','Taranto'],['Teramo','Teramo'],['Terni','Terni'],['Torino','Turin'],['Trapani','Trapani'],['Trento','Trentino'],['Treviso','Treviso'],['Trieste','Trieste'],['Udine','Udine'],['Varese','Varese'],['Venezia','Venice'],['Verbano-Cusio-Ossola','Verbano-Cusio-Ossola'],['Vercelli','Vercelli'],['Verona','Verona'],['Vibo Valentia','Vibo Valentia'],['Vicenza','Vicenza'],['Viterbo','Viterbo']]">
                                        Italy</option>
                                    <option value="Japan"
                                        data-provinces="[['Aichi','Aichi'],['Akita','Akita'],['Aomori','Aomori'],['Chiba','Chiba'],['Ehime','Ehime'],['Fukui','Fukui'],['Fukuoka','Fukuoka'],['Fukushima','Fukushima'],['Gifu','Gifu'],['Gunma','Gunma'],['Hiroshima','Hiroshima'],['Hokkaidō','Hokkaido'],['Hyōgo','Hyogo'],['Ibaraki','Ibaraki'],['Ishikawa','Ishikawa'],['Iwate','Iwate'],['Kagawa','Kagawa'],['Kagoshima','Kagoshima'],['Kanagawa','Kanagawa'],['Kumamoto','Kumamoto'],['Kyōto','Kyoto'],['Kōchi','Kochi'],['Mie','Mie'],['Miyagi','Miyagi'],['Miyazaki','Miyazaki'],['Nagano','Nagano'],['Nagasaki','Nagasaki'],['Nara','Nara'],['Niigata','Niigata'],['Okayama','Okayama'],['Okinawa','Okinawa'],['Saga','Saga'],['Saitama','Saitama'],['Shiga','Shiga'],['Shimane','Shimane'],['Shizuoka','Shizuoka'],['Tochigi','Tochigi'],['Tokushima','Tokushima'],['Tottori','Tottori'],['Toyama','Toyama'],['Tōkyō','Tokyo'],['Wakayama','Wakayama'],['Yamagata','Yamagata'],['Yamaguchi','Yamaguchi'],['Yamanashi','Yamanashi'],['Ōita','Oita'],['Ōsaka','Osaka']]">
                                        Japan</option>
                                    <option value="Malaysia"
                                        data-provinces="[['Johor','Johor'],['Kedah','Kedah'],['Kelantan','Kelantan'],['Kuala Lumpur','Kuala Lumpur'],['Labuan','Labuan'],['Melaka','Malacca'],['Negeri Sembilan','Negeri Sembilan'],['Pahang','Pahang'],['Penang','Penang'],['Perak','Perak'],['Perlis','Perlis'],['Putrajaya','Putrajaya'],['Sabah','Sabah'],['Sarawak','Sarawak'],['Selangor','Selangor'],['Terengganu','Terengganu']]">
                                        Malaysia</option>
                                    <option value="Netherlands" data-provinces="[]">Netherlands</option>
                                    <option value="New Zealand"
                                        data-provinces="[['Auckland','Auckland'],['Bay of Plenty','Bay of Plenty'],['Canterbury','Canterbury'],['Chatham Islands','Chatham Islands'],['Gisborne','Gisborne'],['Hawke's Bay','Hawke’s Bay'],['Manawatu-Wanganui','Manawatū-Whanganui'],['Marlborough','Marlborough'],['Nelson','Nelson'],['Northland','Northland'],['Otago','Otago'],['Southland','Southland'],['Taranaki','Taranaki'],['Tasman','Tasman'],['Waikato','Waikato'],['Wellington','Wellington'],['West Coast','West Coast']]">
                                        New Zealand</option>
                                    <option value="Norway" data-provinces="[]">Norway</option>
                                    <option value="Poland" data-provinces="[]">Poland</option>
                                    <option value="Portugal"
                                        data-provinces="[['Aveiro','Aveiro'],['Açores','Azores'],['Beja','Beja'],['Braga','Braga'],['Bragança','Bragança'],['Castelo Branco','Castelo Branco'],['Coimbra','Coimbra'],['Faro','Faro'],['Guarda','Guarda'],['Leiria','Leiria'],['Lisboa','Lisbon'],['Madeira','Madeira'],['Portalegre','Portalegre'],['Porto','Porto'],['Santarém','Santarém'],['Setúbal','Setúbal'],['Viana do Castelo','Viana do Castelo'],['Vila Real','Vila Real'],['Viseu','Viseu'],['Évora','Évora']]">
                                        Portugal</option>
                                    <option value="Singapore" data-provinces="[]">Singapore</option>
                                    <option value="South Korea"
                                        data-provinces="[['Busan','Busan'],['Chungbuk','North Chungcheong'],['Chungnam','South Chungcheong'],['Daegu','Daegu'],['Daejeon','Daejeon'],['Gangwon','Gangwon'],['Gwangju','Gwangju City'],['Gyeongbuk','North Gyeongsang'],['Gyeonggi','Gyeonggi'],['Gyeongnam','South Gyeongsang'],['Incheon','Incheon'],['Jeju','Jeju'],['Jeonbuk','North Jeolla'],['Jeonnam','South Jeolla'],['Sejong','Sejong'],['Seoul','Seoul'],['Ulsan','Ulsan']]">
                                        South Korea</option>
                                    <option value="Spain"
                                        data-provinces="[['A Coruña','A Coruña'],['Albacete','Albacete'],['Alicante','Alicante'],['Almería','Almería'],['Asturias','Asturias Province'],['Badajoz','Badajoz'],['Balears','Balears Province'],['Barcelona','Barcelona'],['Burgos','Burgos'],['Cantabria','Cantabria Province'],['Castellón','Castellón'],['Ceuta','Ceuta'],['Ciudad Real','Ciudad Real'],['Cuenca','Cuenca'],['Cáceres','Cáceres'],['Cádiz','Cádiz'],['Córdoba','Córdoba'],['Girona','Girona'],['Granada','Granada'],['Guadalajara','Guadalajara'],['Guipúzcoa','Gipuzkoa'],['Huelva','Huelva'],['Huesca','Huesca'],['Jaén','Jaén'],['La Rioja','La Rioja Province'],['Las Palmas','Las Palmas'],['León','León'],['Lleida','Lleida'],['Lugo','Lugo'],['Madrid','Madrid Province'],['Melilla','Melilla'],['Murcia','Murcia'],['Málaga','Málaga'],['Navarra','Navarra'],['Ourense','Ourense'],['Palencia','Palencia'],['Pontevedra','Pontevedra'],['Salamanca','Salamanca'],['Santa Cruz de Tenerife','Santa Cruz de Tenerife'],['Segovia','Segovia'],['Sevilla','Seville'],['Soria','Soria'],['Tarragona','Tarragona'],['Teruel','Teruel'],['Toledo','Toledo'],['Valencia','Valencia'],['Valladolid','Valladolid'],['Vizcaya','Biscay'],['Zamora','Zamora'],['Zaragoza','Zaragoza'],['Álava','Álava'],['Ávila','Ávila']]">
                                        Spain</option>
                                    <option value="Sweden" data-provinces="[]">Sweden</option>
                                    <option value="Switzerland" data-provinces="[]">Switzerland</option>
                                    <option value="United Arab Emirates"
                                        data-provinces="[['Abu Dhabi','Abu Dhabi'],['Ajman','Ajman'],['Dubai','Dubai'],['Fujairah','Fujairah'],['Ras al-Khaimah','Ras al-Khaimah'],['Sharjah','Sharjah'],['Umm al-Quwain','Umm al-Quwain']]">
                                        United Arab Emirates</option>
                                    <option value="United Kingdom"
                                        data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]">
                                        United Kingdom</option>
                                    <option value="United States"
                                        data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]">
                                        United States</option>
                                    <option value="Vietnam" data-provinces="[]">Vietnam</option>
                                </select>
                            </div>
                            <div className="field">
                                <p>Zip code</p>
                                <input type="text" name="text" placeholder=""/>
                            </div>
                            <div className="tf-cart-tool-btns">
                                <Link to="#"
                                    className="tf-btn fw-6 justify-content-center btn-fill w-100 animate-hover-btn radius-3"><span>Estimate</span></Link>
                                <div
                                    className="tf-mini-cart-tool-primary text-center fw-6 w-100 tf-mini-cart-tool-close">
                                    Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>} />

        
        {/* <!-- /shoppingCart --> */}

        {/* <!-- modal compare --> */}
        <div className="offcanvas offcanvas-bottom canvas-compare" id="compare">
            <div className="canvas-wrapper">
                <header className="canvas-header">
                    <div className="close-popup">
                        <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
                    </div>
                </header>
                <div className="canvas-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="tf-compare-list">
                                    <div className="tf-compare-head">
                                        <div className="title">Compare Products</div>
                                    </div>
                                    <div className="tf-compare-offcanvas">
                                        <div className="tf-compare-item">
                                            <div className="position-relative">
                                                <div className="icon">
                                                    <i className="icon-close"></i>
                                                </div>
                                                <Link to="product-detail.html">
                                                    <img className="radius-3" src="images/products/orange-1.jpg" alt=""/>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="tf-compare-item">
                                            <div className="position-relative">
                                                <div className="icon">
                                                    <i className="icon-close"></i>
                                                </div>
                                                <Link to="product-detail.html">
                                                    <img className="radius-3" src="images/products/pink-1.jpg" alt=""/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tf-compare-buttons">
                                        <div className="tf-compare-buttons-wrap">
                                            <Link to="compare.html"
                                                className="tf-btn radius-3 btn-fill justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn ">Compare</Link>
                                            <div className="tf-compapre-button-clear-all link">
                                                Clear All
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /modal compare --> */}

        {/* <!-- payment options --> */}
        <div className="offcanvas offcanvas-bottom canvas-compare" id="payment_options">
            <div className="canvas-wrapper">
                <header className="canvas-header">
                    <div className="close-popup">
                        <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
                    </div>
                </header>
                <div className="canvas-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="tf-compare-list">
                                    <div className="tf-compare-head">
                                        <div className="title">Payment Options</div>
                                    </div>
                                    <div className="tf-compare-offcanvas">
                                        
                                        <PaymentOptions method={paymentmethod} onChange={setpaymentMethod}/>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /payment options --> */}

        {/* <!-- modal quick_add --> */}
        <Modal 
            id="quick_add"
            // title='Shopping cart'
            // centered={false}
            className='modalDemo'
            body={<div className="wrap">
                <div className="tf-product-info-item">
                    <div className="image">
                        <img src={product?.images && product?.images[0] || product?.image} 
                            alt="image-product" 
                            style={{minWidth:'100px'}}  
                            className={`lazyload img-product`} 
                            data-src={product?.images && product?.images[0] || product?.image} 
                            />
                    </div>
                    <div className="content" data-bs-dismiss="modal">
                        <Link to={`/products/${product?.id}`} state={{ product }}  >{product?.name}</Link>
                        {(product?.discountStartDate && product?.salePrice) ?
                            <div className="tf-product-info-price">
                                <div className="price-on-sale">{product?.currency}{product?.salePrice}</div>
                                <div className="compare-at-price">{product?.currency}{product?.price}</div>
                                <div className="badges-on-sale"><span>{getDiscount(product?.price, product?.salePrice)}</span>% OFF</div>
                            </div>
                            :
                            <div className="tf-product-info-price">
                                <div className="price-on-sale">{product?.currency}{product?.price}</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="tf-product-info-variant-picker mb_15">
                    <div className="variant-picker-item">
                        <VariantPicker sizes={product?.sizes}/>
                    </div>
                </div>
                <div className="tf-product-info-quantity mb_15">
                    <div className="quantity-title fw-6">Quantity</div>
                    <QuantitySelector onChange={setQuantity}/>
                </div>
                <div className="tf-product-info-buy-button">
                    <form className="">
                        <Link to="javascript:void(0);"
                            onClick={()=>handleAddToCart(product, user, {quantity, price:((product?.salePrice || product?.price) * quantity).toFixed(2)})}
                            className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn-add-to-cart"><span>Add
                                to cart -&nbsp;</span><span className="tf-qty-price">{product?.currency}{((product?.salePrice || product?.price) * quantity).toFixed(2)}</span></Link>
                        <div className="tf-product-btn-wishlist btn-icon-action">
                            <i className="icon-heart" onClick={()=>handleAddToWishlist(product, user)}></i>
                            <i className="icon-delete"></i>
                        </div>
                        <div className="w-100">
                            <div data-bs-dismiss="modal">
                                <Link 
                                    to="/account/orders/checkout" 
                                    state={{
                                        product,
                                        user,
                                        quantity,
                                        paymentMethod:paymentmethod?.id,
                                        price: ((product?.salePrice || product?.price) * quantity).toFixed(2)
                                    }}
                                    className="btns-full">
                                    Buy with 
                                    <img src={paymentmethod?.image} alt={paymentmethod?.name} style={{maxHeight:'18px', marginLeft:'2rem'}} className='ms-2'/></Link>
                            </div>
                            <a
                                href="#payment_options"  
                                data-bs-toggle="offcanvas" 
                                aria-controls="offcanvasLeft" 
                                className="payment-more-option">
                                    More payment options
                            </a>
                        </div>
                    </form>
                </div>
            </div>} />
        
        {/* <!-- /modal quick_add -->

        <!-- modal quick_view --> */}
        <Modal 
            id="quick_view"
            // title='Shopping cart'
            // centered={false}
            className='modalDemo'
            body={<div className="wrap">
                <div className="tf-product-media-wrap">
                    <Scroller3 className='tf-single-slide' items={product?.images || []} itemsPerView={1}/>
                </div>
                <div className="tf-product-info-wrap position-relative" style={{minHeight:'480px'}}>
                    <div className="tf-product-info-list">
                        <div className="tf-product-info-title">
                            <h5><Link className="link" to={`/products/${product?.id}`} state={{ product }} >{product?.name}</Link></h5>
                        </div>
                        <div className="tf-product-info-badges">
                            <div className="badges text-uppercase">Best seller</div>
                            <div className="product-status-content">
                                <i className="icon-lightning"></i>
                                <p className="fw-6">Selling fast! 48 people have this in their carts.</p>
                            </div>
                        </div>
                        {(product?.discountStartDate && product?.salePrice) ?
                            <div className="tf-product-info-price">
                                <div className="price-on-sale">{product?.currency}{product?.salePrice}</div>
                                <div className="compare-at-price">{product?.currency}{product?.price}</div>
                                <div className="badges-on-sale"><span>{getDiscount(product?.price, product?.discount)}</span>% OFF</div>
                            </div>
                            :
                            <div className="tf-product-info-price">
                                <div className="price-on-sale">{product?.currency}{product?.price}</div>
                            </div>
                        }
                        <div className="tf-product-description">
                            <p>{product?.description?.desc || product?.description || ''}</p>
                        </div>
                        <div className="tf-product-info-variant-picker">
                            <div className="variant-picker-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <VariantPicker sizes={product?.sizes}/>
                                    {/* <div className="find-size btn-choose-size fw-6">Find your size</div> */}
                                </div>
                                
                            </div>
                        </div>
                        <div className="tf-product-info-quantity">
                            <div className="quantity-title fw-6">Quantity</div>
                            <QuantitySelector onChange={setQuantity}/>
                        </div>
                        <div className="tf-product-info-buy-button">
                            <form className="">
                                <Link to="javascript:void(0);" 
                                    onClick={()=>handleAddToCart(product, user, {quantity, price:((product?.salePrice || product?.price) * quantity).toFixed(2)})}
                                    className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn-add-to-cart"><span>Add
                                        to cart -&nbsp;</span><span className="tf-qty-price">{product?.currency}{((product?.salePrice || product?.price) * quantity).toFixed(2)}</span></Link>
                                <Link to="javascript:void(0);"
                                    onClick={()=>handleAddToWishlist(product, user)}
                                    className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action">
                                    <span className="icon icon-heart"></span>
                                    <span className="tooltip">Add to Wishlist</span>
                                    <span className="icon icon-delete"></span>
                                </Link>
                                
                                <div className="w-100">
                                    <div data-bs-dismiss="modal">
                                        <Link 
                                            to="/account/orders/checkout" 
                                            state={{
                                                product,
                                                user,
                                                quantity,
                                                paymentMethod:paymentmethod?.id,
                                                price: ((product?.salePrice || product?.price) * quantity).toFixed(2)
                                            }}
                                            className="btns-full">
                                            Buy with 
                                            <img src={paymentmethod?.image} alt={paymentmethod?.name} style={{maxHeight:'18px', marginLeft:'2rem'}} className='ms-2'/></Link>
                                    </div>
                                    <a
                                        href="#payment_options"  
                                        data-bs-toggle="offcanvas" 
                                        aria-controls="offcanvasLeft" 
                                        className="payment-more-option">
                                            More payment options
                                    </a>
                                    
                                    
                                </div>
                            </form>
                        </div>
                        <div data-bs-dismiss="modal">
                            <Link to={`products/${product?.id}`} state={{ product }} className="tf-btn fw-6 btn-line">
                                View full details
                                <i className="icon icon-arrow1-top-left"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>} />
        {/* <!-- /modal quick_view --> */}

        {/* <!-- modal find_size --> */}
        <Modal 
            id="find_size"
            title='Size chart'
            // centered={false}
            className='modalDemo tf-product-modal'
            body={<div className="tf-rte">
                <div className="tf-table-res-df">
                    <h6>Size guide</h6>
                    <table className="tf-sizeguide-table">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>US</th>
                                <th>Bust</th>
                                <th>Waist</th>
                                <th>Low Hip</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XS</td>
                                <td>2</td>
                                <td>32</td>
                                <td>24 - 25</td>
                                <td>33 - 34</td>
                            </tr>
                            <tr>
                                <td>S</td>
                                <td>4</td>
                                <td>34 - 35</td>
                                <td>26 - 27</td>
                                <td>35 - 26</td>
                            </tr>
                            <tr>
                                <td>M</td>
                                <td>6</td>
                                <td>36 - 37</td>
                                <td>28 - 29</td>
                                <td>38 - 40</td>
                            </tr>
                            <tr>
                                <td>L</td>
                                <td>8</td>
                                <td>38 - 29</td>
                                <td>30 - 31</td>
                                <td>42 - 44</td>
                            </tr>
                            <tr>
                                <td>XL</td>
                                <td>10</td>
                                <td>40 - 41</td>
                                <td>32 - 33</td>
                                <td>45 - 47</td>
                            </tr>
                            <tr>
                                <td>XXL</td>
                                <td>12</td>
                                <td>42 - 43</td>
                                <td>34 - 35</td>
                                <td>48 - 50</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tf-page-size-chart-content">
                    <div>
                        <h6>Measuring Tips</h6>
                        <div className="title">Bust</div>
                        <p>Measure around the fullest part of your bust.</p>
                        <div className="title">Waist</div>
                        <p>Measure around the narrowest part of your torso.</p>
                        <div className="title">Low Hip</div>
                        <p className="mb-0">With your feet together measure around the fullest part of your hips/rear.
                        </p>
                    </div>
                    <div>
                        <img className="sizechart lazyload" data-src="images/shop/products/size_chart2.jpg"
                            src="images/shop/products/size_chart2.jpg" alt=""/>
                    </div>
                </div>
            </div>} />
        
        {/* <!-- /modal find_size --> */}
        <ToastContainer />
        </>
    )
}
export default Extras;