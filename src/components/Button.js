import React from 'react';
import { Button as Btn} from 'antd';

const Button = ({ type, htmlType, text, isloading, className,onClick, style, icon}) => {
    return (
    <Btn type={type} htmlType={htmlType} loading={isloading} className={className} onClick={onClick} style block>
        {text} {icon}
      </Btn>
      )
};

export default Button;