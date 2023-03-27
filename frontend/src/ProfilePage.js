/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
import { Form, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import Navbar from './Navbarloggedin';
import countries from './countries.json'
import DisabledPage from './ReactMultiSelect'
import Page from './EnabledDropDown';

const profileJson = JSON.parse(`
  {
    "first_name": "Melinda",
    "last_name": "Marcus",
    "organization": "San Diego Zoo",
    "position": "Director",
    "role": "Contributor",
    "interests": "Big Cats",
    "country": "United States of America",
    "fieldwork_locations": "San Diego, California, USA",
    "linkedin": "https://linkedin.com/mmarcus",
    "facebook": "https://facebook.com/mmarcus",
    "twitter": "https://facebook.com/mmarcus",
    "created": "February 21, 2023",
    "updated": "February 22, 2023"
  }`
)

// const profileJson = '{"first_name": Melinda}'
// const obj = JSON.parse(profileJson)

export default function (props) {
  const [profilepic, setprofilepic] = useState(<i class="fa fa-user fa-5x icon" style={{'background-color':'white', 'color':'#348e47'}}></i>)
  const [isReadOnly,setisReadOnly] = useState(true)
  const [userProfile, setuserProfile] = useState([])
  const [loading, setloading] = useState(true)
  const [form] = Form.useForm();
  const [counter, setcounter] =useState(0)
  const [user, setuser] = useState([])
  const [dropdown, setdropdown] = useState(<DisabledPage/>)

  const deletes = () =>{
    if (window.confirm('Are you sure you want to delete your profile?')) {
      // Save it!
      console.log('Profile has been deleted')
      console.log(userProfile[0].id);
    } else {
      // Do nothing!
      console.log('Your profile has not been deleted');
    }
  }
 function readOnlyFx (){
  if(counter === 0){
  setisReadOnly(prevState => !prevState)
 setdropdown(<Page/>)

  console.log(document.getElementsByClassName('dropdown-container')[0].ariaReadOnly = false);
  console.log(document.getElementsByClassName('dropdown-container')[0])
  document.getElementById('countryselect').removeAttribute('disabled');
  setcounter(counter+1)
  } else{
  updating()
  alert('Your profile has been updated!')
  console.log(userProfile)
}

 }
  const updating = async(e) =>{
    const userToken =sessionStorage.getItem('token')
    const myHeaders = {'Authorization': 'Bearer' + ` ${  {userToken}}`,'Content-Type': 'application/json'}
    fetch('https://rtvb5hreoe.execute-api.us-east-1.amazonaws.com/dev/_api/v1/update_user', {
      method: 'POST',
      headers: myHeaders,
    }
      .then(response => response.json())
      .then(response => response.text())
      .then(result => console.log(result))
      .then(response => this.setuserProfile(
      {'first_name': 'emily',
      'last_name': 'Marcus',
      'organization': 'San Diego Zoo',
      'position': '1',
      'role': 'Contributor',
      'interests': 'Big Cats',
      'country_of_residence': 'United States of America',
      'fieldwork_locations': 'San Diego, California, USA',
      'linkedin': 'https://linkedin.com/mmarcus',
      'facebook': 'https://facebook.com/mmarcus',
      'twitter': 'https://facebook.com/mmarcus',
      'created': 'February 21, 2023',
      'updated': 'February 22, 2023' }))
      .catch(error => console.log('error', error))
  )};

  useEffect(() => {
    fetchData()
  }, [])
const fetchData = async () => {  
  const userToken =sessionStorage.getItem('token')
  console.log(userToken)
  const headers = {'Authorization': 'Bearer'+ ` ${ userToken}`};
  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };
  const resulting = await fetch('https://rtvb5hreoe.execute-api.us-east-1.amazonaws.com/dev/_api/v1/get_user', requestOptions)

  const data = await resulting.json();
  return data
}

async function renderUser(){
  const users = await fetchData();
  console.log(users)
}
  
renderUser()
const dictionary = countries
function rendercountries(){
  const countrylist = []
  for(let i=0; i<dictionary.countries.length; i++){
    const item = <option value={dictionary.countries[i].name}>{dictionary.countries[i].name}</option>
    countrylist.push(item)
  }
return countrylist
} 
  return (
    
    <div class="wrapper">
      <Form form={form}>
     
        
      
 <Navbar />  
        
      <div class="container" style={{'display':'flex', 'margin-top': 30, height: '100vh','margin-bottom':100 }}>
        <div style={{ width:'35vw','border-right':'3px solid black', 'text-align':'center',height: '764.16px', }}>
          <h3 style={{color:'#348e47', 'text-align':'center'}}><b>My WildTrack Account</b></h3>
          {profilepic === '' ? null : <span style={{
          fontWeight: 'bold',
          color: 'black', 'font-size': '10px'
        }}>{profilepic}</span>}
       
 
         <h4 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center'}}

            name="firstnamelastname"
            id="firstnamelastname"
            initialValue={userProfile.length ? userProfile.first_name : 'email'}
            label= {<h4 style={{'text-align':'center'}}><b>{userProfile.length ? userProfile[0].firstnamelastname : 'First and Last Name'}</b></h4>}
          ><b>First and Last Name</b>
   </h4>
   
   <h2 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center', 'font-size':'14px'}}
            
            name="position"
            id="position"
            initialValue={userProfile.length ? userProfile[0].position : 'email'}
            label= {<h2 style={{'font-size':'14px'}}>{userProfile.length ? userProfile[0].position : 'Position'}</h2>}
          >Database Role
   </h2>
   <h4 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center'}}
           
            name="firstnamelastname"
            id="firstnamelastname"
            initialValue={userProfile.length ? userProfile[0].name : 'email'}
            label= {<h4 style={{'text-align':'center'}}>Name</h4>}
          ><b>Role</b>
   </h4>
   <h2 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center', 'font-size':'14px'}}
            className="Form-label"
            name="position"
            id="position"
            initialValue={userProfile.length ? userProfile[0].position : 'email'}
            label= {<h4 style={{'font-size':'14px'}}>{userProfile.length ? userProfile[0].position : 'Role'}</h4>}
          >Role
   </h2>

   <h4 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center'}}
            className="Form-label"
            name="created"
            id="created"
            initialValue={userProfile.length ? userProfile[0].position : 'email'}
            label= {<h2 style={{}}>{userProfile.length ? userProfile[0].created : 'Created Time'}</h2>}
          ><b>Created</b>
   </h4>
   <h2 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center', 'font-size':'14px'}}
            className="Form-label"
            name="position"
            id="position"
            initialValue={userProfile.length ? userProfile[0].position : 'email'}
            label= {<h4 style={{'font-size':'14px'}}>{userProfile.length ? userProfile[0].position : 'Role'}</h4>}
          >Created Time
   </h2>

   <h4 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center'}}
            className="Form-label"
            name="created"
            id="created"
            initialValue={userProfile.length ? userProfile[0].position : 'email'}
            label= {<h2 style={{}}>{userProfile.length ? userProfile[0].created : 'Created Time'}</h2>}
          ><b>Updated</b>
   </h4>
   <h2 colon={false} style={{'display': 'block', 'margin':'50px auto', 'width':'200px', 'text-align':'center', 'font-size':'14px'}}
            className="Form-label"
            name="position"
            id="position"
            initialValue={userProfile.length ? userProfile[0].position : 'email'}
            label= {<h4 style={{'font-size':'14px'}}>{userProfile.length ? userProfile[0].position : 'Role'}</h4>}
          >Updated Time
   </h2>
         <button style={{'background-color':'red', 'color': 'white', 'border':'none', 'padding-top':'5px','padding-bottom':'5px', 'padding-right':'15px',
        'padding-left':'15px'}} type="button" onClick={deletes}>Delete Account</button>
        </div>
        
        

        <br/>
        <br/>

        <div style={{width:'65vw', height: '100%', 'padding-left':'80px'}}>
        <h3 style={{color:'#348e47','margin-left':'150px'}}><b>Edit WildTrack Profile</b>
        </h3>
        <div style={{'display': 'flex','margin-left':'150px', 'margin-top':'50px'}}>
      
       
    </div>
    <br/>
   
    <Form.Item colon={false}
            className="Form-label"
            name="firstName"
            id="firstName"
            initialValue={userProfile.length ? userProfile[0].firstName : 'First Name'}
            label= {<h4 style={{'width':'180px'}}><b>First Name</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="First Name"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="lastName"
            id="lastName"
            initialValue={userProfile.length ? userProfile[0].lastName : 'Last Name'}
            label= {<h4 style={{'width':'180px'}}><b>Last Name</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="Last Name"
            />
   </Form.Item>

      <Form.Item colon={false}
            className="Form-label"
            name="Organization"
            id="Organization"
            initialValue={userProfile.length ? userProfile[0].Organization : 'Organization'}
            label= {<h4 style={{'width':'180px'}}><b>Organization</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="Organization"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Position"
            id="Position"
            initialValue={userProfile.length ? userProfile[0].Position: 'Position'}
            label= {<h4 style={{'width':'180px'}}><b>Position</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="Position"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Interests"
            id="Interests"
            initialValue={userProfile.length ? userProfile[0].Interests: 'Interests'}
            label= {<h4 style={{'width':'180px'}}><b>Interests</b></h4>}
          >
            <textarea class="ant-input css-dev-only-do-not-override-1km3mtt"
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%', 'height': '78px', 'border-color':'#d9d9d9' }}
              placeholder="Interests"
              type="textarea"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="CountryofPrimaryResidence"
            id="CountryOfPrimaryResidence"
            initialValue={userProfile.length ? userProfile[0].CountryOfPrimaryResidence : 'Country of Primary Residence'}
            label= {<h4 style={{'width':'180px','height':'90px', 'margin-bottom':'0'}}><b>Country Of Primary<br/> Residence</b></h4>}
            
          >
      <div class="ant-form-item-control-input-content" style={{'margin-bottom': '0px', 'justify-content':'space-around'}}>
      <select disabled class="ant-input css-dev-only-do-not-override-1km3mtt" name="countrieselect" id="countryselect" style={{ 'margin-left':'70px' , 'width':'75%',  'border-color':'#d9d9d9' }}>

        {rendercountries()}
        
      </select>
      </div>
   </Form.Item>

  
   <Form.Item colon={false}
            className="Form-label"
            name="FieldworkLocations"
            id="FieldworkLocations"
            initialValue={userProfile.length ? userProfile[0].FieldworkLocations : 'Fieldwork Locations'}
            label= {<h4 style={{'width':'180px'}}><b>Fieldwork Locations</b></h4>}
          >
             {dropdown}
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="LinkedIn"
            id="LinkedIn"
            initialValue={userProfile.length ? userProfile[0].LinkedIn : 'LinkedIn'}
            label= {<h4 style={{'width':'180px'}}><b>LinkedIn</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="LinkedIn"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Facebook"
            id="Facebook"
            initialValue={userProfile.length ? userProfile[0].Facebook : 'Facebook'}
            label= {<h4 style={{'width':'180px'}}><b>Facebook</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="Facebook"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Twitter"
            id="Twitter"
            initialValue={userProfile.length ? userProfile[0].Twitter: 'Twitter'}
            label= {<h4 style={{'width':'180px'}}><b>Twitter</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ 'margin-left':'70px' , 'width':'75%' }}
              placeholder="Twitter"
            />
   </Form.Item>

    <br/>
    
    <div class="containing" style={{'display':'flex',}}>
      <div style={{'width':'50%','margin':'auto'}}>
      <button  data-toggle="modal" data-target="#exampleModal" type="button"  onClick={readOnlyFx} style={{'border-radius':'0px','border':'none','background-color':'green', 'padding-top':'5px','padding-bottom':'5px', 'padding-left':'15px','padding-right':'15px', 'color':'white'}}>Update Profile</button>
      </div>
      </div>


       </div> 
    </div>
    </Form>
    </div>
    
  )

}



/* let [profilepic, setprofilepic] = useState(<i class="fa fa-user fa-5x icon" style={{"background-color":"white", "color":"#348e47"}}></i>)

 


    return ( <div>
     
    </div>
);*/