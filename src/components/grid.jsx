import React from 'react';

const Grid =({children , className=''})=>{
    return(
        <div className={`tf-grid-layout ${className}`}>
            {children}
        </div>
    )
}
export default Grid;