import React from 'react';
import { Button as Btn} from 'antd';

const Button = ({ type, htmlType, text, isloading, className,onClick, style}) => {
    return (
    <Btn type={type} htmlType={htmlType} loading={isloading} className={className} onClick={onClick} style block>
        {text}
      </Btn>
      )
};

export default Button;