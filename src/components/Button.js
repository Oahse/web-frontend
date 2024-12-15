import React from 'react';
import { Button as Btn} from 'antd';


const Button = ({ type, htmlType, text, isloading, className,onClick, style, icon, children}) => {
    return (
    <Btn type={type} htmlType={htmlType} loading={isloading} className={className} onClick={onClick} style block >
        {text} {icon} {children}
      </Btn>
      )
};

export default Button;