/* eslint-disable import/no-anonymous-default-export */
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react'
import logos from './backgrounding.jpg'
import PrivacyPolicy from './Privacy.pdf'
import watermarks from './watermark.png'


export default function () {

    // Define the state for the signup button
  const [signup, setSignup] = useState( <button  onClick={signPrivacyPolicy}  className="link-primary"  style={{'background-color': 'white', 'color': '#348e47', 'padding-top': '5px','padding-bottom': '5px', 'padding-left': '35px', 'padding-right': '35px', 'border':'2px solid white'}}>
  <a id="links" roled="link"   style={{'color': '#348e47'}}href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/signup?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fd3crdvaffca4ns.cloudfront.net%2Fconfirmlogin"><b>Sign Up</b></a>
</button>)

    // Function to display an alert if the privacy policy is not agreed to
  function signPrivacyPolicy () {
    alert('Please agree to the privacy policy to create an account')
  }

    // Function to handle the checkbox for agreeing to the terms and conditions
 function checkboxHandler (event)  {
    if(event.target.checked === false){
      setSignup(( <button  onClick={signPrivacyPolicy}  className="link-primary"  style={{'background-color': 'white', 'color': '#348e47', 'padding-top': '5px','padding-bottom': '5px', 'padding-left': '35px', 'padding-right': '35px', 'border':'2px solid white'}}>
      <a id="links" roled="link"   style={{'color': '#348e47'}}href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/signup?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fd3crdvaffca4ns.cloudfront.net%2Fconfirmlogin"><b>Sign Up</b></a>
    </button>))

    } else {
     setSignup(  <button  className="link-primary"  style={{'background-color': 'white', 'color': '#348e47', 'padding-top': '5px','padding-bottom': '5px', 'padding-left': '35px', 'padding-right': '35px', 'border':'2px solid white'}}>
     <a id="links" roled="link"  aria-disabled="true" style={{'color': '#348e47'}}href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/signup?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fd3crdvaffca4ns.cloudfront.net%2Fconfirmlogin"><b>Sign Up</b></a>
   </button>)
    }
  }

    return (
        <div>
              <div className="Auth-form-container" style={{backgroundImage: `url(${logos})`, 'background-repeat':'no-repeat', 'background-size': 'cover', 'display': 'flex', 'justify-content':'center','align-items':'stretch','width': '100vw','height':'100vh','flex-direction':'row','flex-wrap':'wrap', 'align-content':'flex-start' }}>
                <div class="picture" style={{'display' :'block', 'textAlign':'center', 'margin-top':'30px', 'margin-bottom':'20px','horizontal-align':'center'}}>
              <img src={watermarks} alt= "Wildtrack logo"  />
              </div>

        <form className="Auth-form"  >
          <div className="Auth-form-content" >
            <h1 className="Auth-form-title" style={{color: '#348e47', }}>Log In to WildTrack!</h1>
            
            
            <p className="forgotpassword" style={{'color':'#4E342E' }}>
          
            <a href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/forgotPassword?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fd3crdvaffca4ns.cloudfront.net" style={{'color':'#4E342E'}}><b> Forgot your password?</b></a>
            </p>

 
            <div className="d-grid gap-2 mt-3" style={{'text-align': 'center', 'margin-bottom': '20px'}}>
              <button style={{ 'background-color':'#348e47','border':'2px solid white', 'padding-top':'5px','padding-bottom':'5px', 'padding-left': '30px',  'padding-right': '30px', 'border-radius': '0px'}} type="button" className="btn btn-primary">
                <a style={{'text-decoration-line': 'none', 'color': 'white'}}href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/login?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fd3crdvaffca4ns.cloudfront.net%2Fconfirmlogin"><b>Log In</b></a>
              </button>
            </div>


          </div>
        </form>
        <div className="signup-container" >
        <h1 class="noaccount" ><b>No account yet?</b></h1>
        <h4 class="signupbelow">Sign up for an account below.</h4>
        <div className="form-group mt-3" style={{ 'display':'flex', 'padding-left': '10px'}}>
          <input onChange={checkboxHandler} style={{'width': '5%', 'text-align': 'center', 'height':'5%'}}
              type="checkbox"
              className="form-control mt-1"
              id="agree"
              required
              on
            />
            
            <label required style={{'color':'white'}}><a style={{'text-decoration':'underline','color':'white'}}href={PrivacyPolicy} target= "_blank" rel="noreferrer">Privacy Notice</a> - I agree to the terms and conditions</label>
            
          </div>
          <div className="form-group mt-3" style={{'margin': '0px', 'display':'flex'  ,'padding-left': '10px'}}>
             <input style={{'width': '5%', 'text-align': 'center', 'height':'5%','margin-right': '10px' }}
             onchange={checkboxHandler}
              type="checkbox"
              name="newsletter"
              className="form-control mt-1"
            />
             <label style={{'color':'white'}}>Send me the WildTrack newsletter</label>
          </div>
          <br/><br/>
          {signup}
              </div>
      </div>

      </div>
    )
  }

