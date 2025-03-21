import { Col, Row, Skeleton, Tag, Carousel, Avatar, Modal} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { ReactComponent as Chip } from "../../../assets/chip.svg";
import Text from "../../../components/ui/Typography/Text";
import './Product.css';
import FormInput from "../../../components/ui/Input/FormInput/FormInput";
import FormTextArea from "../../../components/ui/Input/FormInput/FormTextArea";
import FormSelect from "../../../components/ui/Input/FormInput/FormSelect";
import { useCountries } from "../../../hooks/useCountry";
import Table from "../../../components/ui/Table/Table";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import { getUser } from "../../../services/api";

const AdminProductItem = ({ API_URL, Companyname, isMobile, isTablet, item,add=false,handleGoBack }) => {
    
    const [customer, setCustomer] = useState(null);
    const [product, setProduct] = useState(item||null)
    const [products, setProducts] = useState([]);
    const countries = useCountries();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   const statuses = [{name:'Live', value:'Live'}, {name:'Dead',value:'Dead'}]
    const [selectedVariants, setSelectedVariants] = useState([])
   const [productVariants, setProductVariants] = useState([
    // Sample product variants data
    {
      id: 1,
      features: 'Variant 1',
      price: '$20.00',
      quantity: 100,
      picture: '', // Placeholder image if no picture
    },
    {
      id: 2,
      features: 'Variant 2',
      price: '$25.00',
      quantity: 50,
      picture: '', // Placeholder image if no picture
    },
  ]);
  const [currentVariants, setCurrentVariants] = useState(productVariants)
   const productVariantsColumns = [
      {
        title: "Variant",
        dataIndex: "features",
        key: "features",
          render:(_,record) =>(<div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
            <Avatar src={record?.picture || `https://picsum.photos/200/300?random=${record.id}`} shape='square' size={'small'} />
            <Text tag="p" fontWeight="fw-300">
                {record.features}
            </Text>
        </div>)
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render:(_,record) =>(<Input disabled={add} placeholder={record?.price} value={record?.price} />)
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        key: "quantity",
        render:(_,record) =>(<Input disabled={add} placeholder={record?.quantity} value={record?.quantity} />)
      },
   ]
   const handleAddVariant = (e) =>{
      e.preventDefault()
   }
   const handleSelectedVariants =(Variants)=>{
        // console.log(items,'|||')
        setSelectedVariants(Variants)
    }
    const handleDeleteVariants = (items) => {
      Modal.confirm({
        title: 'Are you sure you want to delete these orders?',
        onOk: () => {
          const updatedItems = currentVariants.filter((currentItem) => 
            !items.some(item => item.id === currentItem.id)
          );
          setCurrentVariants(updatedItems);
        },
      });
    };
    useEffect(() => {
      const fetchUser = async () => {
          try {
            
            setError(null);  // Clear previous errors if any
            
            // Assuming getUser is a function that returns a promise
            const user = await getUser(API_URL, product?.name);
            setCustomer(user); // Set the customer data
          } catch (err) {
            console.error('Error fetching user:', err); // Log the error
            setError('Failed to fetch user data. Please try again later.');
          } finally {
            setLoading(false); // End loading
          }
      };

      
      setLoading(true);  // Start loading products
      if (product && product?.name) {
          fetchUser();
      }
      setLoading(false); // End loading
    }, [API_URL, product]); // Add product and API_URL as dependencies
    

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
                                New Product
                            </Text>
                        :
                        <>
                            <Text tag="p" fontWeight="fw-400">
                                {product?.id}
                            </Text>
                            <Tag color="#979797">
                                {product?.stock_quantity}-{product?.stock_status}
                            </Tag>
                            <Tag color="#979797">
                                {product?.subcategory}
                            </Tag>
                        </>}
                        
                      </div>
                      <Text tag="small" fontWeight="fw-300" className={'mt-1'}>
                          {product?.vendor}
                      </Text>
                      <Tag color="#979797">
                          {product?.condition}
                      </Tag>
                      
                  </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
              <Row gutter={[16, 16]} style={{padding:'8px'}}>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} >
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
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Price <Tag color="#979797">
                                          {product?.discount}
                                      </Tag>
                            </Text>
                            <Text tag="p" fontWeight="fw-600">
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                  {`${product?.currency} ${product?.price}`} 
                                      <Tag color="#979797">
                                          {product?.discount}
                                      </Tag>
                                </div>
                                {product?.final_price}
                            </Text>
                        </div>
                    </Col>
                  </Row>
                    
                </Col>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Title
                            </Text>
                            <FormInput disabled={add}  placeholder={product?.name} value={product?.name} className={'mt-1'} style={{width:'100%'}}/>
                        </div>
                    </Col>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Description
                            </Text>
                            <FormTextArea disabled={add} placeholder={product?.name} value={product?.name} className={'mt-1'} style={{width:'100%'}}/>
                        </div>
                    </Col>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Category
                            </Text>
                            <FormSelect
                                  name='Category'
                                  disabled={add} 
                                  defaultValue={countries[0]}
                                  placeholder='Please select a Category'
                                  className={'mt-1'} 
                                  options={countries.map(country => ({
                                    label: country.name,   // rename 'name' to 'label'
                                    icon: country.flag,    // rename 'flag' to 'icon'
                                    code:country.code
                                  }))}
                                  style={{width:'100%'}}
                              />
                        </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
          <Col span={24} style={{padding:'8px'}}>
              <Row gutter={[16, 16]} style={{padding:'8px'}}>
                <Col xxl={15} xl={15} lg={15} md={15} sm={24} xs={24} >
                  <Row gutter={[8, 8]}>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Weight-{product?.weight}
                            </Text>
                            <Text tag="p" fontWeight="fw-600">
                                Dimensions-{product?.dimensions}
                            </Text>
                            <Text tag="p" fontWeight="fw-600">
                                Shipping Method-{product?.shipping_method}
                            </Text>
                            <Text tag="p" fontWeight="fw-600">
                                Free Shipping-{product?.free_shipping?
                                              <Tag color='#198754'>
                                                  True
                                              </Tag>:
                                              <Tag color='#DC3545'>
                                                  {product?.shipping_price}
                                              </Tag>}
                            </Text>
                            <Text tag="p" fontWeight="fw-600">
                                Vendor Price-{product?.vendor_price}
                            </Text>
                        </div>
                    </Col>
                    <Col span={24} className="col-item" >
                        <div className="d-flex justify-content-between align-items-center">
                            <Text tag="p" fontWeight="fw-600">
                                Variant
                            </Text>
                            <div className="d-flex justify-content-between align-items-center">
                                
                                {
                                            selectedVariants?.length>0?
                                            <Button 
                                              color={"danger"} 
                                              className="mx-2"
                                              text={isMobile?
                                                <Icon icon="material-symbols-light:delete-outline-rounded" width="25" height="25" />
                                                :
                                                'Delete Variant'}
                                              onClick={(e)=>(handleDeleteVariants(selectedVariants))}
                                            />:null
                                          }
                                <Button text='Add Variant' onClick={handleAddVariant}/>
                            </div>
                        </div>
                        
                        <Table className='mt-2' columns={productVariantsColumns} items={currentVariants} onSelectedItems={handleSelectedVariants} />
                        
                    </Col>
                  </Row>
                    
                </Col>
                <Col xxl={9} xl={9} lg={9} md={9} sm={24} xs={24}>
                  <Row gutter={[8, 8]}>
                    
                    <Col span={24} className="col-item" >
                          <div className="d-flex flex-column justify-content-start align-items-start">
                              
                                <Text tag="p" fontWeight="fw-600">
                                  Reviews/Ratings
                                </Text>
                                <FormSelect
                                  name='Status'
                                  disabled={add} 
                                  placeholder='Please select a Status'
                                  className={'mt-3'} 
                                  options={statuses.map(status => ({
                                    label: status.name,   // rename 'name' to 'label'
                                    code:status.value
                                  }))}
                                  style={{width:'100%'}}
                              />
                          </div>
                          
                      </Col>
                      <Col span={24} className="col-item" >
                          <div className="d-flex flex-column justify-content-start align-items-start">
                                <Text tag="p" fontWeight="fw-600">
                                    Product Organisation
                                </Text>
                                <Text tag="small" fontWeight="fw-300" className={'mt-1'}>
                                    Type/SubCategory
                                </Text>
                                <FormInput disabled={add} placeholder={product?.name} value={product?.name} className={'mt-1'} style={{width:'100%'}}/>
                                <Text tag="small" fontWeight="fw-300" className={'mt-1'}>
                                    Brand
                                </Text>
                                <FormInput disabled={add} placeholder={product?.name} value={product?.name} className={'mt-1'} style={{width:'100%'}}/>
                                <Text tag="small" fontWeight="fw-300" className={'mt-1'}>
                                    Date Added
                                </Text>
                                <FormInput disabled={add} placeholder={product?.name} value={product?.name} className={'mt-1'} style={{width:'100%'}}/>
                          </div>
                          
                      </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
      </Row>
          
    );
};

export default AdminProductItem;
