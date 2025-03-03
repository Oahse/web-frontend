import { Col, Row, Skeleton, Radio} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import SearchInput from "../../../components/ui/Input/SearchInput";
import Text from "../../../components/ui/Typography/Text";
import './Customers.css';
import { getUser } from "../../../services/api";
import FormCheckBox from "../../../components/ui/Input/FormInput/FormCheckBox";
import FormInput from "../../../components/ui/Input/FormInput/FormInput";
import Form from "antd/es/form/Form";
import Button from "../../../components/ui/Button/Button";
import FormSelect from "../../../components/ui/Input/FormInput/FormSelect";
import { useRegister } from "../../../services/auth";
import { useCountries } from "../../../hooks/useCountry";

const AdminCustomerItem = ({ API_URL, Companyname, isMobile, isTablet, item, add=false,handleGoBack }) => {
    const { register, loading:lOADING, error:eRROR, user } = useRegister(); // Use the register hook
    const [customer, setCustomer] = useState(item||user||null)
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
          const user = await getUser(API_URL, customer.id);
          setCustomer(user); // Set the customer data
        } catch (err) {
          console.error('Error fetching user:', err); // Log the error
          setError('Failed to fetch user data. Please try again later.');
        } finally {
          setLoading(false); // End loading
        }
      };

      

      if (customer && customer.customer) {
        // Introduce a 2-second delay before starting the fetchUser function
        const timer = setTimeout(() => {
          fetchUser();
          
        }, 2000); // 2000 ms = 2 seconds delay

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      }
      // Check if we should redirect after login
    setUserType('')
    
    }, [API_URL, customer]); // Add customer and API_URL as dependencies

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
            <Col span={16}>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
                                <Icon icon="ion:return-down-back-outline" width="25" height="25" onClick={handleGoBack} />
                                {add?
                                    <Text tag="p" fontWeight="fw-400">
                                        New Customer
                                    </Text>
                                :
                                <>
                                    <Text tag="p" fontWeight="fw-400">
                                        {customer.id}
                                    </Text>
                                </>}
                                
                            </div>
                            
                        </div>
                    </Col>
                    <Col span={24} className="col-item" >
                        <Row gutter={[16, 16]} style={{padding:'8px'}}>
                            <Col span={24} >
                                <Text tag="p" fontWeight="fw-600">
                                    Customer Details
                                </Text>
                            </Col>
                            <Col span={24} >
                                <Form 
                                    name="customer-details"
                                    // layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                    newsletter: true, // Default checkbox to checked
                                    }}
                                    style={{style:'100%'}}
                                >
                                    <FormSelect
                                        label='Select a Country'
                                        name='Country'
                                        placeholder='Please select a country'
                                        options={countries.map(country => ({
                                        label: country.name,   // rename 'name' to 'label'
                                        icon: country.flag,    // rename 'flag' to 'icon'
                                        code:country.code
                                        }))}
                                    />
                                
                                    <Form.Item label='Trade Role'>
                                        <Radio.Group >
                                                <Radio value={1}>Buyer</Radio>
                                                <Radio value={2}>Seller</Radio>
                                                <Radio value={3}>Both</Radio>
                                            </Radio.Group>
                                    </Form.Item>
                                    <Row gutter={16} >
                                        <Col span={12} >
                                            {/* <Form.Item> */}
                                                <FormInput name='name' placeholder='First name' 
                                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                                />
                                            {/* </Form.Item> */}
                                        </Col>

                                        <Col span={12}>
                                            {/* <Form.Item> */}
                                                <FormInput name='name' placeholder='Last name' 
                                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                                />
                                            {/* </Form.Item> */}
                                        </Col>
                                    </Row>
            
                                    <FormInput
                                        name="email"
                                        placeholder="Email"
                                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                                    />
                                    <Row gutter={16} >
                                        <Col span={5} >
                                            <FormSelect
                                                name='Phone'
                                                placeholder='Please select a Code'
                                                options={countries.map(country => ({
                                                            label: country.idd,   // rename 'name' to 'label'
                                                            icon: country.flag,    // rename 'flag' to 'icon'
                                                            code:country.code,
                                                            idd:country.name
                                                        }))}
                                            />
                                        </Col>

                                        <Col span={19}>
                                            <FormInput name='phone_number' placeholder='Phone Number' 
                                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                                            />
                                        </Col>
                                    </Row>
                                    <FormCheckBox>  
                                        Customers agree to receiving marketing emails
                                    </FormCheckBox>
                                    <FormCheckBox>  
                                        Customers agree to receiving marketing SMS messages
                                    </FormCheckBox>

                                    <Row gutter={16} >
                                        <Col span={5} >
                                            <FormSelect
                                                name='country'
                                                placeholder='Country/Region'
                                                options={countries.map(country => ({
                                                            label: country.name,   // rename 'name' to 'label'
                                                            icon: country.flag,    // rename 'flag' to 'icon'
                                                            code:country.code,
                                                            // idd:country.name
                                                        }))}
                                            />
                                        </Col>

                                        <Col span={19}>
                                            <SearchInput
                                                placeholder="Search Address"
                                                onSearch={handleSearch}
                                                style={{ width: "100%" }}
                                            />
                                        </Col>
                                    </Row>
                                                        
                                    <FormInput
                                        name="Apartment/ suite, unit"
                                        placeholder="Apartment/ suite, unit"
                                        rules={[{ required: true, message: 'Please enter your Apartment/ suite, unit' }]}
                                    />

                                    <Row gutter={16} >
                                        <Col span={12} >
                                            {/* <Form.Item> */}
                                                <FormInput name='City' placeholder='First City' 
                                                    rules={[{ required: true, message: 'Please enter your City' }]}
                                                />
                                            {/* </Form.Item> */}
                                        </Col>

                                        <Col span={12}>
                                            {/* <Form.Item> */}
                                                <FormInput name='State/Province' placeholder='State/Province' 
                                                    rules={[{ required: true, message: 'Please enter your State/Province' }]}
                                                />
                                            {/* </Form.Item> */}
                                        </Col>
                                    </Row>

                                    <FormInput name='Postal Code' placeholder='Postal Code' 
                                        rules={[{ required: true, message: 'Please enter your Postal Code' }]}
                                    />
                                    
                                    <Form.Item className="d-flex flex-column justify-content-start align-items-end">
                                        <Button type="primary" htmlType="submit" text="Save" />
                                        {/* <Button type="primary" onClick={showModal} text='OTP'/>  */}
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Col>
            <Col span={8} >
                <Row gutter={[16, 16]} style={{padding:'8px'}}>
                    <Col span={24}  className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                            Notes
                            </Text>
                            <Text
                                fontColor="text-info"
                                fontSize="fs-sm"
                                fontWeight="fw-300"
                                className="mt-1 mb-1 text-break fst-italic"
                            >
                                {'Notes are private and will not be shared with customers'}
                            </Text>
                            <Text
                                fontColor="text-link"
                                fontSize="fs-md"
                                fontWeight="fw-400"
                                className="mt-1 mb-1 text-break"
                            >
                                {customer?.notes?customer?.notes:'No note given'}
                            </Text>
                        </div>
                    </Col>
                    <Col span={24} className="col-item" >
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <Text tag="p" fontWeight="fw-600">
                            Tags
                            </Text>
                            <Text
                                fontColor="text-link"
                                fontSize="fs-md"
                                fontWeight="fw-400"
                                className="mt-1 mb-1 text-break border-1 border rounded-sm p-1 w-100"
                            >
                                {customer?.tags?customer?.tags:'No tag given'}
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AdminCustomerItem;
