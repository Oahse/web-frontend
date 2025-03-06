import { Col, Row, Skeleton, Radio} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import SearchInput from "../../../components/ui/Input/SearchInput";
import Text from "../../../components/ui/Typography/Text";
// import './Customers.css';
import { getUser } from "../../../services/api";
import FormCheckBox from "../../../components/ui/Input/FormInput/FormCheckBox";
import FormInput from "../../../components/ui/Input/FormInput/FormInput";
import Form from "antd/es/form/Form";
import Button from "../../../components/ui/Button/Button";
import FormSelect from "../../../components/ui/Input/FormInput/FormSelect";
import { useRegister } from "../../../services/auth";
import { useCountries } from "../../../hooks/useCountry";

const AdminFinanceItem = ({ API_URL, Companyname, isMobile, isTablet, item, handleGoBack }) => {
    const { register, loading:lOADING, error:eRROR, user } = useRegister(); // Use the register hook
    const [finance, setFinance] = useState(item||user||null)
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
          const user = await getUser(API_URL, finance.id);
          setFinance(user); // Set the Finance data
        } catch (err) {
          console.error('Error fetching user:', err); // Log the error
          setError('Failed to fetch user data. Please try again later.');
        } finally {
          setLoading(false); // End loading
        }
      };

      

      if (finance && finance.finance) {
        // Introduce a 2-second delay before starting the fetchUser function
        const timer = setTimeout(() => {
          fetchUser();
          
        }, 2000); // 2000 ms = 2 seconds delay

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      }
      // Check if we should redirect after login
    setUserType('')
    
    }, [API_URL, finance]); // Add Finance and API_URL as dependencies

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
            <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24}>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
                                <Icon icon="ion:return-down-back-outline" width="25" height="25" onClick={handleGoBack} />
                                {<Text tag="p" fontWeight="fw-400">
                                    {finance.id}
                                </Text>}
                                
                            </div>
                            
                        </div>
                    </Col>
                    <Col span={24} className="col-item" >
                        <Row gutter={[16, 16]} style={{padding:'8px'}}>
                            <Col span={24} >
                                <Text tag="p" fontWeight="fw-600">
                                    Finance Details
                                </Text>
                            </Col>
                            <Col span={24}>
                                <Form
                                    name="finance-details"
                                    style={{ width: '100%' }}
                                    >
                                    {/* Transaction Type */}
                                    <FormInput
                                        name="Transaction Type"
                                        label="Transaction Type"
                                        placeholder="Deposit" // Same as value
                                        value="Deposit" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Account Type */}
                                    <FormInput
                                        name="Account Type"
                                        label="Account Type"
                                        placeholder="Checking" // Same as value
                                        value="Checking" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Transaction Description */}
                                    <FormInput
                                        name="Transaction Description"
                                        label="Transaction Description"
                                        placeholder="Payment for services rendered" // Same as value
                                        value="Payment for services rendered" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Transaction Date */}
                                    <FormInput
                                        name="Transaction Date"
                                        label="Transaction Date"
                                        placeholder="March 1, 2025" // Same as value
                                        value="March 1, 2025" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Payment Method */}
                                    <FormInput
                                        name="Payment Method"
                                        label="Payment Method"
                                        placeholder="Credit Card" // Same as value
                                        value="Credit Card" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Billing Street */}
                                    <FormInput
                                        name="Billing Street"
                                        label="Billing Street"
                                        placeholder="123 Main Street" // Same as value
                                        value="123 Main Street" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Billing City */}
                                    <FormInput
                                        name="Billing City"
                                        label="Billing City"
                                        placeholder="New York" // Same as value
                                        value="New York" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Postal Code */}
                                    <FormInput
                                        name="Postal Code"
                                        label="Postal Code"
                                        placeholder="10001" // Same as value
                                        value="10001" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Country */}
                                    <FormInput
                                        name="Country"
                                        label="Country"
                                        placeholder="USA" // Same as value
                                        value="USA" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Additional Financial Details */}

                                    {/* Bank Account Number */}
                                    <FormInput
                                        name="Bank Account Number"
                                        label="Bank Account Number"
                                        placeholder="987654321" // Same as value
                                        value="987654321" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Routing Number */}
                                    <FormInput
                                        name="Routing Number"
                                        label="Routing Number"
                                        placeholder="123456789" // Same as value
                                        value="123456789" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* SWIFT Code */}
                                    <FormInput
                                        name="SWIFT Code"
                                        label="SWIFT Code"
                                        placeholder="SWIFT123" // Same as value
                                        value="SWIFT123" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Account Holder Name */}
                                    <FormInput
                                        name="Account Holder Name"
                                        label="Account Holder Name"
                                        placeholder="John Doe" // Same as value
                                        value="John Doe" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Bank Name */}
                                    <FormInput
                                        name="Bank Name"
                                        label="Bank Name"
                                        placeholder="XYZ Bank" // Same as value
                                        value="XYZ Bank" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* IBAN (International Bank Account Number) */}
                                    <FormInput
                                        name="IBAN"
                                        label="IBAN"
                                        placeholder="GB29XABC10161234567801" // Same as value
                                        value="GB29XABC10161234567801" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Account Balance */}
                                    <FormInput
                                        name="Account Balance"
                                        label="Account Balance"
                                        placeholder="$1,250.75" // Same as value
                                        value="$1,250.75" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Credit Limit */}
                                    <FormInput
                                        name="Credit Limit"
                                        label="Credit Limit"
                                        placeholder="$5,000.00" // Same as value
                                        value="$5,000.00" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Transaction ID */}
                                    <FormInput
                                        name="Transaction ID"
                                        label="Transaction ID"
                                        placeholder="TXN1234567890" // Same as value
                                        value="TXN1234567890" // Replace with dynamic value
                                        disabled
                                    />

                                    {/* Last Transaction Date */}
                                    <FormInput
                                        name="Last Transaction Date"
                                        label="Last Transaction Date"
                                        placeholder="February 28, 2025" // Same as value
                                        value="February 28, 2025" // Replace with dynamic value
                                        disabled
                                    />
                                </Form>

                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} >
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
                                {'Notes are private and will not be shared with finances'}
                            </Text>
                            <Text
                                fontColor="text-link"
                                fontSize="fs-md"
                                fontWeight="fw-400"
                                className="mt-1 mb-1 text-break"
                            >
                                {finance?.notes?finance?.notes:'No note given'}
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
                                {finance?.tags?finance?.tags:'No tag given'}
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AdminFinanceItem;
