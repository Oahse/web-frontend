import React from "react";
import AdminContent from "./AdminContent";

const AdminCustomers = ({ API_URL, Companyname, isMobile }) => {
    let breadCrumbItems = [
        {title:'Customers'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Customers Section</h3>
                <p>Here you can manage and view customer details.</p>
        </AdminContent>
    );
};

export default AdminCustomers;
