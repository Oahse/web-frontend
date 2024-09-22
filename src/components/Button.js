import React from 'react';
import { Button as Btn} from 'antd';

const Button = ({ type, htmlType, text, isloading}) => {
    return (
    <Btn type={type} htmlType={htmlType} loading={isloading} block>
        {text}
      </Btn>
      )
};

export default Button;