import React from 'react';
import { Layout} from 'antd';
const { Content, Footer } = Layout;

const ImageLoader = ({ src, alt, src2, alt2 }) => (
  
  <Layout className='bg-transparent'>
    <Content>
        <div className="image-loader">
            <img className="image-one" src={src} alt={alt} width={'120px'} />
            
        </div>
    </Content>
    <Footer className='loader-footer'
      >
        <img className="image-two" src={src2} alt={alt2} width={'60px'} />
      </Footer>
  </Layout>
);

export default ImageLoader;
