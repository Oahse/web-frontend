import { Breadcrumb, Layout} from "antd"

const { Content } = Layout;
const AdminDashBoard = ({API_URL,Companyname,isMobile }) => {
    
    
    return (
        <>
        {!isMobile ? 
            <Content style={{
                margin: '6px',
            }}>
            
            <Breadcrumb
            
                items={[
                    {
                        title: <a href="/">Home</a>,
                    },
                    {
                        title: 'DashBoard',
                    },
                // {
                //     title: <a href="/">Application Center</a>,
                // },
                // {
                //     title: <a href="/">Application List</a>,
                // },
                // {
                //     title: 'An Application',
                // },
                ]}
            />
            <div
                style={{
                padding: '6px 18px',
                margin: '8px',
                minHeight: '100vh',
                backgroundColor:'white'
                }}
            >
                Bill is a cat.
            </div>
        </Content>
            :
            <Content style={{
                margin: '6px',
                
            }}>
            
            <Breadcrumb
            
                items={[
                {
                    title: <a href="/">Home</a>,
                },
                {
                    title: 'DashBoard',
                },
                // {
                //     title: <a href="/">Application Center</a>,
                // },
                // {
                //     title: <a href="/">Application List</a>,
                // },
                // {
                //     title: 'An Application',
                // },
                ]}
            />
            <div
                style={{
                padding: '6px 18px',
                margin: '8px',
                minHeight: '100vh',
                backgroundColor:'white'
                }}
            >
                Bill is a cat.
            </div>
        </Content>}
        </>
        
    )

}

export default AdminDashBoard;
