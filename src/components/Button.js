import React from 'react';
import { Button as Btn} from 'antd';

const Button = ({ type, htmlType, text, isloading, className}) => {
    return (
    <Btn type={type} htmlType={htmlType} loading={isloading} className={className} block>
        {text}
      </Btn>
      )
};

export default Button;