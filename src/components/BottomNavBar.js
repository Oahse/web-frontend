import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const BottomNavbar = ({ renderLinks }) => {
    return (
        <Navbar fixed="bottom" bg="light" className="bottomnavbar">
            <Nav className="d-flex justify-content-between w-100 py-0">
                {renderLinks().map((link, index) => (
                    <div className="text-center mx-4 " key={index}>
                        {link}
                    </div>
                ))}
            </Nav>
        </Navbar>
    );
};

export default BottomNavbar;
