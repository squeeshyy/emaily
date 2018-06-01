// surveyField contains logic to render a single label and text input
import React from 'react';
// because we're rendering the surveyfield using the field tag from reduxform, we have the ability to dump in a ton of props
// use the spread operator to spread all the props (event handlers) from the props into the input element
export default ({ input, label, meta: { error, touched } }) => {
  // console.log(input);
  // console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error ? error : ''}
      </div>
    </div>
  );
};
