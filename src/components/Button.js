import React from 'react';
import { Button as Btn} from 'antd';

const Button = ({ type, htmlType, text, isloading, className,onClick}) => {
    return (
    <Btn type={type} htmlType={htmlType} loading={isloading} className={className} onClick={onClick} block>
        {text}
      </Btn>
      )
};

export default Button;