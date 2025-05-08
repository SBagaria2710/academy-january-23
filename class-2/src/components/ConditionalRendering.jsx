import React from 'react'

function ConditionalRendering(props) {
  const { isLoggedIn, userName } = props;
  if (isLoggedIn) {
    return <h1>Hello, {userName}</h1>;
  } else {
    return <h1>Please, log in to continue</h1>;
  }
  // return (
  //   <div>
  //     {isLoggedIn ? <h1>Hello, {userName}</h1> : <h1>Please, log in to continue</h1>}
  //   </div>
  // )
}

export default ConditionalRendering