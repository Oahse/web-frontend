import { Col, Row, Skeleton, Tag, Carousel, Avatar} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactComponent as PaidBasket }  from '../../../assets/paid_basket.svg';
import { ReactComponent as FailedBasket }  from '../../../assets/failed_basket.svg';
import { useEffect, useState } from "react";
import { ReactComponent as Chip } from "../../../assets/chip.svg";
import Text from "../../../components/ui/Typography/Text";
import './Discount.css';
import { getProduct, getUser } from "../../../services/api";

const AdminDiscountItem = ({ API_URL, Companyname, isMobile, isTablet, item,add=false,handleGoBack }) => {
    
    const [customer, setCustomer] = useState(null);
    const [discount, setDiscount] = useState(item||null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
          try {
            
            // setError(null);  // Clear previous errors if any
            
            // Assuming getUser is a function that returns a promise
            const user = await getUser(API_URL, discount?.customer);
            setCustomer(user); // Set the customer data
          } catch (err) {
            console.error('Error fetching user:', err); // Log the error
            // setError('Failed to fetch user data. Please try again later.');
          } finally {
            setLoading(false); // End loading
          }
      };

      const fetchProducts = async () => {
        try {
            // setError(null);    // Clear previous errors if any
            // Assuming item.products is an array of product ids
            const productPromises = discount.products.map((productId) => getProduct(API_URL, productId));
            const products = await Promise.all(productPromises); // Fetch all products concurrently
            setProducts(products); // Set the products data

        } catch (err) {
            console.error('Error fetching products:', err); // Log the error
            // setError('Failed to fetch products. Please try again later.');
        } finally {
          setLoading(false); // End loading
        }
      };
      setLoading(true);  // Start loading products
      if (discount && discount?.customer) {
          fetchUser();
          if (discount?.products) {
            fetchProducts();
          }
      }
      setLoading(false); // End loading
    }, [API_URL, discount]); // Add Discount and API_URL as dependencies
    

    if (loading) {
      return (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Skeleton active avatar paragraph={{ rows: 2 }} />
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Skeleton.Image style={{ width: '100%' }} />
              </Col>
              <Col span={12}>
                <Skeleton paragraph={{ rows: 4 }} active />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Skeleton active paragraph={{ rows: 2 }} />
              </Col>
              <Col span={12}>
                <Skeleton active paragraph={{ rows: 2 }} />
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
    
    return (
      <Row gutter={[16, 16]} >
          <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
            <Row gutter={[16, 16]} >
              <Col  xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                  <div className="d-flex flex-column justify-content-start align-items-start">
                                
                      <div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
                        <Icon icon="ion:return-down-back-outline" width="25" height="25" onClick={handleGoBack}  />
                        {add?
                            <Text tag="p" fontWeight="fw-400">
                                New Discount
                            </Text>
                        :
                        <>
                            <Text tag="p" fontWeight="fw-400">
                                {discount?.id}
                            </Text>
                        </>}
                        <Tag color="#979797">
                            {discount?.payment_status}{" "}
                            {discount?.payment_status === false || discount?.payment_status === "Failed" ? (
                              <FailedBasket />
                            ) : (
                              <PaidBasket />
                            )}
                        </Tag>
                        <Tag color="#979797">
                            {discount?.fulfillment_status}
                        </Tag>
                      </div>
                      <Text tag="small" fontWeight="fw-300" className={'mt-1'}>
                          {discount?.date.toLocaleDateString()}
                      </Text>
                      
                  </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
              <Row gutter={[16, 16]} style={{padding:'8px'}}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} >
                  <Row gutter={[8, 8]}>
                    <Col span={24}  className="col-item-img">
                      
                      <Carousel effect="fade" autoplay arrows infinite={true}  style={{height:'364px',width:'364px'}}>
                        <div>
                        <Chip />
                        </div>
                        <div>
                        <Chip />
                        </div>
                        <div>
                        <Chip />
                        </div>
                        <div>
                        <Chip />
                        </div>
                        {products.map((product, index)=>(
                          <div>
                            {product.media? <Avatar  key={index} src={product.media} size={364} />:<Chip key={index} />}
                          </div>
                        ))}
                      </Carousel>
                    </Col>
                  </Row>
                    
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Tag color="#198754">
                                {discount?.fulfillment_status}
                            </Tag>
                            <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" className={'mt-1'}>
                                {discount?.date.toLocaleDateString()}
                            </Text>
                            <Text tag="p" fontWeight="fw-600">
                                {discount?.id}
                            </Text>
                            <Text fontColor='text-light' fontSize="fs-md" fontWeight="fw-400" className={'mt-1 mb-1 text-break'}>
                                {discount?.description || 'sdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsdds'}
                                {'sdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsddssdsdsdsdds'}
                            </Text>
                            
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                            <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                {discount?.currency}{discount?.price} x {discount?.quantity} 
                            </Text>
                            <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                {discount?.currency}{discount?.price * discount?.quantity}
                            </Text>
                        </div>
                    </Col>
                    <Col span={24} className="col-item">
                        <Row gutter={[8, 8]}>
                            {products.map((product, index)=>(
                                  <Col key={index} span={24} className="d-flex justify-content-between align-items-center mt-1">
                                      <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                          SubTotal
                                      </Text>
                                      <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                          {product.name} 
                                      </Text>
                                      <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                          {product.currency}{product.price}
                                      </Text>
                                  </Col>
                                ))} 
                            
                            <Col span={24} className="d-flex justify-content-between align-items-center mt-1">
                                <Text fontSize="fs-md" fontColor='text-black' fontWeight="fw-600" >
                                    Total
                                </Text>
                                <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                    {discount?.quantity}{' '} Discounts
                                </Text>
                                <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                {discount?.currency}{discount?.price * discount?.quantity}
                                </Text>
                            </Col>
                            <Col span={24} className="d-flex justify-content-between align-items-center mt-1 border-1 border rounded-sm p-1">
                                <Tag color="#198754">
                                    {discount?.payment_status}
                                </Tag>
                                <Text fontSize="fs-md" fontColor='text-light' fontWeight="fw-400" >
                                    {discount?.currency}{discount?.price * discount?.quantity}
                                </Text>
                            </Col>
                            
                        </Row>
                        
                    </Col>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Shipping Address
                            </Text>
                            <Text
                                  fontColor="text-link"
                                  fontSize="fs-md"
                                  fontWeight="fw-400"
                                  className="mt-1 mb-1 text-break"
                              >
                                  {discount?.shipping_address?discount?.shipping_address:'No address given'}
                              </Text>
                        </div>
                        
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
          <Col span={24} style={{padding:'8px'}}>
          <Row gutter={[16, 16]} style={{padding:'8px'}}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} >
                  <Row gutter={[8, 8]}>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Contact Information
                            </Text>
                            <Text
                                  fontColor="text-link"
                                  fontSize="fs-md"
                                  fontWeight="fw-400"
                                  className="mt-1 mb-1 text-break"
                              >
                                  {customer?.firstname}{' '}{customer?.lastname}
                                  {customer?.email}
                                  {customer?.phone_numberpre}-{customer?.phone_number}
                              </Text>
                              <Text
                                  fontColor="text-link"
                                  fontSize="fs-md"
                                  fontWeight="fw-400"
                                  className="mt-1 mb-1 text-break"
                              >
                                  {customer?.totaldiscounts || 0} Discounts
                              </Text>
                        </div>
                    </Col>
                  </Row>
                    
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Row gutter={[8, 8]}>
                    
                  <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            
                              <Text tag="p" fontWeight="fw-600">
                                Billing Address
                              </Text>
                              <Text
                                    fontColor="text-link"
                                    fontSize="fs-md"
                                    fontWeight="fw-400"
                                    className="mt-1 mb-1 text-break"
                                >
                                    {discount?.billing_address?discount?.billing_address:'No address given'}
                              </Text>
                        </div>
                        
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
      </Row>
          
    );
};

export default AdminDiscountItem;
