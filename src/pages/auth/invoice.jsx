
const Invoice = ({categories=[]})=>{
    const invoiceColumns = [
        { key: "description", label: "Description" },
        { key: "price", label: "Price" },
        { key: "vat", label: "VAT (20%)" },
        { key: "total", label: "Total" },
    ];
    const invoiceData = [
        {
            description: "Standard Plan",
            price: "$443.00",
            vat: "$921.80",
            total: "$9243",
        },
        {
            description: "Extra Plan",
            price: "$413.00",
            vat: "$912.80",
            total: "$5943",
        },
        {
            description: "Total Due",
            price: "",
            vat: "",
            total: "$9,750",
            isTotal: true, // optional flag if you want to style the total row differently
        },
    ];
    
    
    return(
        <div className="wrapper-invoice">
            <section className="invoice-section">
                <div className="cus-container2">
                    <div className="top">
                        <a href="#" className="tf-btn btn-fill animate-hover-btn">
                            Print this invoice 
                        </a>
                    </div>
                    <div className="box-invoice">
                        <div className="header">
                            <div className="wrap-top">
                                <div className="box-left">
                                    <a href="index-2.html">
                                        <img src="images/logo/logo.svg" alt="logo" className="logo"/>
                                    </a>
                                </div>
                                <div className="box-right">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="title">Invoice #</div>
                                        <span className="code-num">0043128641</span>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-date">
                                <div className="box-left">
                                    <label for="">Invoice date:</label>
                                    <span className="date">03/10/2024</span>
                                </div>
                                <div className="box-right">
                                    <label for="">Due date:</label>
                                    <span className="date">03/10/2024</span>
                                </div>
                            </div>
                            <div className="wrap-info">
                                <div className="box-left">
                                    <div className="title">Supplier</div>
                                    <div className="sub">Jobio LLC</div>
                                    <p className="desc">2301 Ravenswood Rd Madison,
                                    <br/>  WI 53711</p>
                                </div>
                                <div className="box-right">
                                    <div className="title">Customer</div>
                                    <div className="sub">John Doe</div>
                                    <p className="desc">329 Queensberry Street, North Melbourne <br/> VIC 3051, Australia.</p>
                                </div>
                            </div>
                            <div className="wrap-table-invoice">
                                <Table className="invoice-table" columns={invoiceColumns} data={invoiceData} />
                            </div>
                            
                        </div>
                        <div className="footer">
                            <ul className="box-contact">
                                <li>www.ecomus.com</li>
                                <li>invoice@ecomus.com</li>
                                <li>(123) 123-456</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>          
        </div>
    )
}
export default Invoice;