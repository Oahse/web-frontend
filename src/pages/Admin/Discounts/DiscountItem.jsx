import { Col, Row, Skeleton, Radio, Tag} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import SearchInput from "../../../components/ui/Input/SearchInput";
import Text from "../../../components/ui/Typography/Text";
import './Discount.css';
import { getUser } from "../../../services/api";
import FormCheckBox from "../../../components/ui/Input/FormInput/FormCheckBox";
import FormInput from "../../../components/ui/Input/FormInput/FormInput";
import Form from "antd/es/form/Form";
import Button from "../../../components/ui/Button/Button";
import FormSelect from "../../../components/ui/Input/FormInput/FormSelect";
import { useRegister } from "../../../services/auth";
import { useCountries } from "../../../hooks/useCountry";
import DatePicker from "../../../components/ui/Input/Date/DatePicker";

const AdminDiscountItem = ({ API_URL, Companyname, isMobile, isTablet, item, add=false,handleGoBack }) => {
    const { register, loading:lOADING, error:eRROR, user } = useRegister(); // Use the register hook
    const [discount, setDiscount] = useState(item||user||null)
    const [userType, setUserType] = useState(""); // Store selected user type
    const countries = useCountries();
    // console.log('----sdsd', countries)
    const [loading, setLoading] = useState(lOADING);
    const [error, setError] = useState(eRROR||null);

    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Start loading
          setLoading(true);
          setError(null);  // Clear previous errors if any
          
          // Assuming getUser is a function that returns a promise
          const user = await getUser(API_URL, discount.id);
          setDiscount(user); // Set the discount data
        } catch (err) {
          console.error('Error fetching user:', err); // Log the error
          setError('Failed to fetch user data. Please try again later.');
        } finally {
          setLoading(false); // End loading
        }
      };

      

      if (discount && discount.discount) {
        // Introduce a 2-second delay before starting the fetchUser function
        const timer = setTimeout(() => {
          fetchUser();
          
        }, 2000); // 2000 ms = 2 seconds delay

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      }
      // Check if we should redirect after login
    setUserType('')
    
    }, [API_URL, discount]); // Add discount and API_URL as dependencies

    const onFinish = (values) => {
        const { name, email, password, confirmPassword, newsletter, ...otherValues } = values;
        
        // Create an object to pass to the register function
        const params = {
          name,
          email,
          password,
          confirmPassword,
          newsletter,
          ...otherValues,
        };
    
        // Call the register function with API_URL, form data, and user type
        register(API_URL, params, userType)
          .then(() => {
            // Show success notification
            // notification.success({
            //   message: 'Re Successful',
            //   description: 'You have successfully logged in.',
            //   placement: 'topRight',
            //   duration: 3, // Duration in seconds before it disappears
            // });
            
            // Update state to trigger redirect
            // setRedirectToHome(true);
          })
          .catch((err) => {
            console.error('Login error:', err);
            // notification.error({
            //   message: 'Login Failed',
            //   description: err,
            //   placement: 'topRight',
            //   duration: 3, // Duration in seconds before it disappears
            // });
          });
    
        // Redirect on successful registration (this could be handled inside the register hook as well)
    
      };
    const handleSearch = (e) => {
        console.log(e);
    };
    const statuses = [{value:'active', text:'Active'},
      {value:'expired', text:'Expired'},
      {value:'not_started', text:'Not Started'}]

    const methods =[
      {value:'Online', text:'Online'},
      {value:'In-Store', text:'In Store'}
    ]
    const types=[
      {value:'percentage', text:'Percentage'},
      {value:'fixed_amount', text:'Fixed Amount'}
    ]
    const useds=[
      {value:'true', text:'True'},
      {value:'false', text:'false'}
    ]
    
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
        <Row gutter={[16, 16]}  style={{padding:'8px'}}>
            <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24} >
              <Form 
                  name="discount-details"
                  // layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                  newsletter: true, // Default checkbox to checked
                  }}
                  style={{style:'100%'}}
                >
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
                                <Icon icon="ion:return-down-back-outline" width="25" height="25" onClick={handleGoBack} />
                                {add?
                                    <Text tag="p" fontWeight="fw-400">
                                        New Discount
                                    </Text>
                                :
                                <>
                                    <Text tag="p" fontWeight="fw-400">
                                        {discount.id}
                                    </Text>
                                </>}
                                
                            </div>
                            
                        </div>
                    </Col>
                    <Col span={24}>
                        <Row className="col-item" gutter={[16, 16]}>
                            <Col span={24} >
                                <Text tag="p" fontWeight="fw-600">
                                    Discount Details
                                </Text>
                            </Col>
                            <Col span={24} >
                                <div>
                                  <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                    Title
                                  </Text>

                                  <FormInput name='title' placeholder='Title' 
                                        rules={[{ required: true, message: 'Please enter your Title' }]}
                                    />
                                </div>
                                <div>
                                  <span className="d-flex justify-content-between align-items-center">
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Discount Code
                                    </Text>
                                    <Text tag="small" fontWeight="fw-400" fontColor="text-link" style={{cursor:'pointer'}}>
                                      Generate Discount Code
                                    </Text>
                                  </span>

                                  <FormInput name='name' placeholder='' 
                                        rules={[{ required: true, message: 'Please enter your Discount Code' }]}
                                    />
                                </div>
                                <div>
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Discount Value (%)
                                    </Text>

                                  <FormInput name='name' placeholder='' 
                                        rules={[{ required: true, message: 'Please enter your Discount Value' }]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Type
                                    </Text>
                                    
                                  {add?
                                  <FormSelect
                                      // label='Method'
                                      name='Type'
                                      placeholder='Please select a Type'
                                      options={types.map(type => ({
                                      label: type.text,  
                                      code: type.value
                                      }))}
                                      />
                                      :
                                        item.type === 'Percentage' ? <Tag color="#50555C">Percentage</Tag>
                                          : item.type === 'Fixed Amount' ? <Tag color="#5d92b3">Fixed Amount</Tag>
                                            : ''
                                  }
                                </div>
                                <div className="mb-3">
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Method
                                    </Text>
                                    
                                  {add?
                                  <FormSelect
                                      // label='Method'
                                      name='Method'
                                      placeholder='Please select a Method'
                                      options={methods.map(method => ({
                                      label: method.text,  
                                      code: method.value
                                      }))}
                                      />
                                      :
                                        item.method === 'Online' ? <Tag color="#198754">Online</Tag>
                                          : item.method === 'In-Store' ? <Tag color="#5d92b3">In Store</Tag>
                                            : ''
                                  }
                                </div>
                                <div className="mb-3">
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Status
                                    </Text>

                                  {add?
                                  <FormSelect
                                      // label='Status'
                                      name='Status'
                                      placeholder='Please select a Status'
                                      options={statuses.map(status => ({
                                      label: status.text,  
                                      code:status.value
                                      }))}
                                      />
                                      :
                                        item.status === 'active' ? <Tag color="#198754">Active</Tag>
                                          : item.status === 'expired' ? <Tag color="#DC3545">Expired</Tag>
                                            : <Tag color="#FBA70D">Not Started</Tag>
                                  }
                                </div>
                                <div className="mb-3">
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Is Used
                                    </Text>
                                    
                                  {add?
                                  <FormSelect
                                      // label='Method'
                                      name='Used'
                                      placeholder='Please select Used'
                                      options={useds.map(used => ({
                                      label: used.text,  
                                      code: used.value
                                      }))}
                                      />
                                      :
                                        item.used ? <Tag color="#DC3545">Used</Tag>
                                          : <Tag color="#198754">Not Used</Tag>
                                  }
                                </div>

                                <div className="mb-3">
                                    <Text tag="p" fontWeight="fw-600" fontColor="text-muted">
                                      Date Created
                                    </Text>

                                  <DatePicker value={item?.date} placeholder={item?.date} disabled/>
                                </div>
                                <FormSelect
                                    label='Applies to'
                                    name='Discount Application'
                                    placeholder='Please select an Application'
                                    options={countries.map(country => ({
                                    label: country.name,   // rename 'name' to 'label'
                                    icon: country.flag,    // rename 'flag' to 'icon'
                                    code:country.code
                                    }))}
                                />
                                    
                                    
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className="col-item">
                        <Text tag="p" fontWeight="fw-600">
                            Minimun purchase requirements
                        </Text>
                        <FormCheckBox>  
                            No minimum requirements
                        </FormCheckBox>
                        <FormCheckBox>  
                            Minimum purchase amount
                        </FormCheckBox>
                        <FormCheckBox>  
                            Minimum quality of items
                        </FormCheckBox>
                    </Col>
                    <Col span={24} className="col-item">
                        <Text tag="p" fontWeight="fw-600">
                            Eligibility
                        </Text>
                        <FormCheckBox>  
                            All Customers
                        </FormCheckBox>
                        <FormCheckBox>  
                            Specific Customers Segments
                        </FormCheckBox>
                        <FormCheckBox>  
                            Specific Customer
                        </FormCheckBox>
                    </Col>
                </Row>
                <Form.Item className="p-2 d-flex flex-column justify-content-start align-items-end">
                    <Button type="primary" htmlType="submit" text="Save" />
                </Form.Item>
                </Form>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} >
                <Row gutter={[16, 16]}>
                    <Col span={24} >
                        <div className="col-item d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                            Notes
                            </Text>
                            <Text
                                fontColor="text-info"
                                fontSize="fs-sm"
                                fontWeight="fw-300"
                                className="mt-1 mb-1 text-break fst-italic"
                            >
                                {'Notes are private and will not be shared with Customers'}
                            </Text>
                            <Text
                                fontColor="text-link"
                                fontSize="fs-md"
                                fontWeight="fw-400"
                                className="mt-1 mb-1 text-break"
                            >
                                {discount?.notes?discount?.notes:'No note given'}
                            </Text>
                        </div>
                    </Col>
                    <Col span={24} >
                        <div className="col-item d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                                Sales Channels Access
                            </Text>
                            <FormCheckBox>  
                                Allow discount to be featured on channel
                            </FormCheckBox>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AdminDiscountItem;
