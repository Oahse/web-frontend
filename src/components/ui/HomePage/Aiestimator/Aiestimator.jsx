import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Typography/Text';
import './Aiestimator.css'
function HomeAiestimator({isMobile}){
    return(
        <>{isMobile?
            <div className='homepage-aiestimator row m-0 mb-3 bg-blue'  style={{height:'198px',fontSize: '20px', lineHeight: '24.2px'}}>
              <div className='col-5 text-center d-flex flex-column align-items-center justify-content-center bg-transparent' >
                
                <svg className='fs-sm' width="46" height="58" viewBox="0 0 106 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.5 2.75V27.75C59.5 29.4076 60.1585 30.9973 61.3306 32.1694C62.5027 33.3415 64.0924 34 65.75 34H90.75" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M34.5 115.25H15.75C12.4348 115.25 9.25537 113.933 6.91116 111.589C4.56696 109.245 3.25 106.065 3.25 102.75V15.25C3.25 11.9348 4.56696 8.75537 6.91116 6.41116C9.25537 4.06696 12.4348 2.75 15.75 2.75H59.5L90.75 34V59" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M59.5 115.25V90.25C59.5 86.9348 60.817 83.7554 63.1612 81.4112C65.5054 79.067 68.6848 77.75 72 77.75C75.3152 77.75 78.4946 79.067 80.8388 81.4112C83.183 83.7554 84.5 86.9348 84.5 90.25V115.25M59.5 102.75H84.5M103.25 77.75V115.25" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <Text fontColor='text-white' fontWeight='fw-400'>  RQF Generator</Text>


                </div>
                <div className='col-7 p-3 d-flex align-items-center justify-content-center  bg-transparent text-black' >
                  <Text fontColor='text-black' fontWeight='fw-400' > Simply Generate RFQs with Artificial Intelligence and <br />save a lot of time and work! </Text> 
                </div>
                
                
            </div>
            :
            <div className='homepage-aiestimator row m-0 mb-3 pt-5' style={{height:'198px',fontSize: '20px', lineHeight: '24.2px'}} >
                  <div className='col-8 p-3 d-flex align-items-center justify-content-center  bg-blue text-black'>
                    <Text fontColor='text-black' fontWeight='fw-500'> Simply Generate RFQs with Artificial Intelligence and <br />save a lot of time and work! </Text> 
                  </div>
                  <div className='col-4 d-flex flex-column align-items-center justify-content-center bg-transparent'>
                  <svg className='fs-sm' width="76" height="118" viewBox="0 0 106 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.5 2.75V27.75C59.5 29.4076 60.1585 30.9973 61.3306 32.1694C62.5027 33.3415 64.0924 34 65.75 34H90.75" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M34.5 115.25H15.75C12.4348 115.25 9.25537 113.933 6.91116 111.589C4.56696 109.245 3.25 106.065 3.25 102.75V15.25C3.25 11.9348 4.56696 8.75537 6.91116 6.41116C9.25537 4.06696 12.4348 2.75 15.75 2.75H59.5L90.75 34V59" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M59.5 115.25V90.25C59.5 86.9348 60.817 83.7554 63.1612 81.4112C65.5054 79.067 68.6848 77.75 72 77.75C75.3152 77.75 78.4946 79.067 80.8388 81.4112C83.183 83.7554 84.5 86.9348 84.5 90.25V115.25M59.5 102.75H84.5M103.25 77.75V115.25" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <Text fontColor='text-white' fontWeight='fw-500' > RQF Generator</Text>

                  </div>
                  
            </div>}
          {isMobile?
            <div className='homepage-aiestimator row m-0 bg-green'  style={{height:'198px',fontSize: '20px', lineHeight: '24.2px' }}>
                <div className='col-7 p-3 d-flex align-items-center justify-content-center  bg-transparent text-black'>
                  <Text fontColor='text-black' fontWeight='fw-400'> Simple make estimation with certain parameters <br />or designs with the help of Artificial Intelligence </Text> 
                </div>
                <div className='col-5 d-flex align-items-center justify-content-center bg-transparent' >
                  <svg className='align-self-center' width="131" height="150" viewBox="0 0 251 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M112.5 54.725V42.5C112.5 28.3563 112.5 21.2875 107.656 16.8938C102.806 12.5 95.0125 12.5 79.4062 12.5H51.8438C36.2375 12.5 28.4438 12.5 23.5938 16.8938C18.7438 21.2875 18.75 28.3563 18.75 42.5V82.5C18.75 96.6437 18.75 103.713 23.5938 108.106C28.4438 112.5 36.2375 112.5 51.8438 112.5H79.4062M37.5 37.5H93.75M37.5 62.5H43.75M62.5 62.5H68.75M87.5 62.5H93.75M37.5 87.5H43.75M62.5 87.5H68.75M129.412 93.775C127.7 89.4312 123.288 84.3375 113.25 84.3375C101.588 84.3375 96.675 89.6812 95.6813 92.5375C94.125 96.3562 93.9813 104.6 108.113 105.069C124.988 105.631 132.05 107.925 131.175 117.175C130.306 126.425 120.581 127.712 113.25 128.212C105.719 127.994 96.4063 126.419 93.75 118.431M112.462 75V83.975M112.519 128.181V137.5" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M151 109.666V79.4163C151 76.7421 152.317 74.1773 154.661 72.2863C157.005 70.3954 160.185 69.333 163.5 69.333C166.815 69.333 169.995 70.3954 172.339 72.2863C174.683 74.1773 176 76.7421 176 79.4163V109.666M151 94.5413H176M201 69.333V109.666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>
                
            </div>
            :
            <div className='homepage-aiestimator row m-0 pt-5'  style={{height:'198px',fontSize: '20px', lineHeight: '24.2px' }}>
                  <div className='col-4 d-flex align-items-center justify-content-center bg-transparent'>
                    <svg className='align-self-center' width="251" height="100" viewBox="0 0 251 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M112.5 54.725V42.5C112.5 28.3563 112.5 21.2875 107.656 16.8938C102.806 12.5 95.0125 12.5 79.4062 12.5H51.8438C36.2375 12.5 28.4438 12.5 23.5938 16.8938C18.7438 21.2875 18.75 28.3563 18.75 42.5V82.5C18.75 96.6437 18.75 103.713 23.5938 108.106C28.4438 112.5 36.2375 112.5 51.8438 112.5H79.4062M37.5 37.5H93.75M37.5 62.5H43.75M62.5 62.5H68.75M87.5 62.5H93.75M37.5 87.5H43.75M62.5 87.5H68.75M129.412 93.775C127.7 89.4312 123.288 84.3375 113.25 84.3375C101.588 84.3375 96.675 89.6812 95.6813 92.5375C94.125 96.3562 93.9813 104.6 108.113 105.069C124.988 105.631 132.05 107.925 131.175 117.175C130.306 126.425 120.581 127.712 113.25 128.212C105.719 127.994 96.4063 126.419 93.75 118.431M112.462 75V83.975M112.519 128.181V137.5" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M151 109.666V79.4163C151 76.7421 152.317 74.1773 154.661 72.2863C157.005 70.3954 160.185 69.333 163.5 69.333C166.815 69.333 169.995 70.3954 172.339 72.2863C174.683 74.1773 176 76.7421 176 79.4163V109.666M151 94.5413H176M201 69.333V109.666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                  </div>
                  <div className='col-8 p-3 d-flex align-items-center justify-content-center  bg-green text-black' >
                    <Text fontColor='text-black' fontWeight='fw-500'> Simple make estimation with certain parameters <br />or designs with the help of Artificial Intelligence </Text> 
                  </div>
            </div>}</>
    )
}


// Prop Validation
HomeAiestimator.propTypes = {
    isMobile: PropTypes.bool.isRequired,   // isScrolled must be a boolean and is required
  };
  
export default HomeAiestimator;