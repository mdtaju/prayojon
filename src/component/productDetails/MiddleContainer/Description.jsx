import React from 'react';

const Description = ({ description }) => {

      return (
            <div >
                  <p dangerouslySetInnerHTML={{ __html: description }}>

                  </p>
            </div>
      );
};

export default Description;