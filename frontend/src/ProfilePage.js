/* eslint-disable no-console */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars, no-shadow */
import { Form, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbarloggedin';
import countries from './countries.json';
import DisabledPage from './ReactMultiSelect';
import useFetch from './hooks/useFetch';

// don't put jsx inside of a state
export default function () {
    const ACCESS_TOKEN =
        sessionStorage.getItem('token') ||
        'eyJraWQiOiJKUGpQNFBzOFZ5ajlNXC84dXhCVmNkcEVcLzMrTm1jNVNxbVNJTVlHY2g0NEE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3NjFjZGNhOC03YWNiLTQ1MjEtYjYzYi1hN2Y5NjM3OThkN2EiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9KQUZLMWxoWlUiLCJjbGllbnRfaWQiOiI0ZnExNTh1ZGhyam05NGVrOTh1NGE5ZmhpMiIsIm9yaWdpbl9qdGkiOiJmOTYwMjZhNS1iMTEwLTQzYmUtODFmYS1iNDBlNTFlYjU2YzIiLCJldmVudF9pZCI6ImU2YTM1YjhkLWMyZjUtNGMwZC1hMTJkLTI4ODFhN2IwZDFkMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODA3MzMyNDIsImV4cCI6MTY4MDczNjg0MiwiaWF0IjoxNjgwNzMzMjQyLCJqdGkiOiIyMTA0NzBmOC0yYzIzLTRjYjQtOTc0Mi1lZGZjN2E3MjdhNGQiLCJ1c2VybmFtZSI6Ijc2MWNkY2E4LTdhY2ItNDUyMS1iNjNiLWE3Zjk2Mzc5OGQ3YSJ9.aRG7yspdc08p5nJJJZfbC0gW1WpPUNNM6W6BSqMORzj1lYz49fF7D2yPL0HcqmArcnnbhbD1SNIuHwkgER9BXY1YNnp_CRJRv791zCEWnIi-m55bPFCopOEZqtSr6Fi9zRPj4HoAj4SNYN7L_ur7y9AZnPuZDkBXY2mgblwbiybcWOKzrkD3a3z013eoazfeXZCyF1HEUoMrRnZQm5wWmYmPIFL0kqQWQ_Ak2ZGC8R5PVYma7MFVWwd6p9K84edCD8oKCm35idoygNWbDQCDCZM6AT1gl3KvuZf4ap1EToKE_0n0iNj4zMCiIky91SWFZVaxqBZA_Ka0q3Wv6WmypQ';

    // Define a function called "deletes" that prompts the user to confirm whether they want to delete their profile
    const deletes = () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            console.log('Profile has been deleted');
            console.log(userProfile[0].id); // Log the ID of the user profile to be deleted
        } else {
            console.log('Your profile has not been deleted');
        }
    };

// Define state variables for the editing mode and the user profile
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [profile, setProfile] = useState(null);

// Fetch the user profile data using the useFetch hook
    const { data, loading, error } = useFetch(
        'https://rtvb5hreoe.execute-api.us-east-1.amazonaws.com/dev/_api/v1/get_user'
    );

// Update the profile state variable when the data changes
    useEffect(() => {
        if (data) {
            const fetchedProfile = data.length && data[0] ? data[0] : null;
            setProfile(fetchedProfile);
        }
        console.log(data);
    }, [data]);

// Define state variables for the submit loading status and any submit errors
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

// Define a function to set the editing mode to false
    const undo = function () {
        setIsEditingMode(false);
    };

// Define a function to handle the form submission
    const handleSubmit = async (values) => {
        setSubmitLoading(true); // Set the submit loading status to true
        setSubmitError(null); // Reset any previous submit errors
        console.log(values);

        try {
            // Send a POST request to update the user profile with the new values
            const response = await fetch(
                'https://rtvb5hreoe.execute-api.us-east-1.amazonaws.com/dev/_api/v1/update_user',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify(values), // Send the form values as a JSON string in the request body
                }
            );

            if (!response.ok) {
                // If the response is not OK, throw an error
                throw new Error('Error updating profile');
            }

            const data = await response.json(); // Parse the response JSON data

            const userProfile = data.length && data[0] ? data[0] : null;

            // Update the profile state with the new values entered in the form
            setProfile({ ...profile, ...values });
        } catch (error) {
            setSubmitError(error.message); // Set the submit error state variable to the error message
        } finally {
            setSubmitLoading(false); // Set the submit loading status to false
            setIsEditingMode(false); // Set the editing mode to false
        }
    };

// If the data is loading, display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

// If there is an error, display an error message
    if (error) {
        return <div>Error: {error}</div>;
    }

// Define a function to render the list of countries as <option> elements
    const renderCountries = () =>
        countries.countries.map((country) => {
            return <option value={country.name}>{country.name}</option>;
        });


    // Render profile page content
    return (
        // Define the markup for profile page
        <div class='wrapper'>
            <Form onFinish={(values) => handleSubmit(values)}>
                <Navbar />

                <div
                    class='container'
                    style={{
                        display: 'flex',
                        'margin-top': 30,
                        height: '100vh',
                        'margin-bottom': 100,
                    }}
                >
                    <div
                        style={{
                            width: '35vw',
                            'border-right': '3px solid black',
                            'text-align': 'center',
                            height: '764.16px',
                        }}
                    >

                        {/* Display user profile picture */}
                        <h3 style={{ color: '#348e47', 'text-align': 'center' }}>
                            <b>My WildTrack Account</b>
                        </h3>

                            <span
                                style={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    'font-size': '10px',
                                }}
                            >
                <i

                    className='fa fa-user fa-5x icon'
                    style={{'background-color': 'white', color: '#348e47'}}
                ></i>
              </span>

                        {/* Display user's first and last name */}
                        <h4
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                            }}
                            name='firstnamelastname'
                            id='firstnamelastname'
                            initialValue={profile?.first_name}

                            label={
                                <h4 style={{ 'text-align': 'center' }}>
                                    <b>
                                        {profile?.firstnamelastname}
                                    </b>
                                </h4>
                            }
                        >
                            <b>First and Last Name</b>
                        </h4>

                        {/* Display user's database role */}
                        <h2
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                                'font-size': '14px',
                            }}
                            name='position'
                            id='position'
                            initialValue={
                                profile?.position || 'email'
                            }
                            label={
                                <h2 style={{ 'font-size': '14px' }}>
                                    {profile?.position || 'Position'}
                                </h2>
                            }
                        >
                            Database Role
                        </h2>

                        {/* Display user's name */}
                        <h4
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                            }}
                            name='firstnamelastname'
                            id='firstnamelastname'
                            initialValue={profile?.name || 'email'}
                            label={<h4 style={{ 'text-align': 'center' }}>Name</h4>}
                        >
                            <b>Role</b>
                        </h4>

                        {/* Display user's created time */}
                        <h2
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                                'font-size': '14px',
                            }}
                            className='Form-label'
                            name='position'
                            id='position'
                            initialValue={
                                profile?.position || 'email'
                            }
                            label={
                                <h4 style={{ 'font-size': '14px' }}>
                                    {profile?.length ? profile[0].position : 'Role'}
                                </h4>
                            }
                        >
                            Role
                        </h2>

                        <h4
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                            }}
                            className='Form-label'
                            name='created'
                            id='created'
                            initialValue={
                                profile?.position || 'email'
                            }
                            label={
                                <h2 style={{}}>
                                    {profile && profile.length ? profile[0].created : 'Created Time'}
                                </h2>
                            }
                        >
                            <b>Created</b>
                        </h4>
                        <h2
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                                'font-size': '14px',
                            }}
                            className='Form-label'
                            name='position'
                            id='position'
                            initialValue={
                                profile?.position || 'email'
                            }
                            label={
                                <h4 style={{ 'font-size': '14px' }}>
                                    {profile && profile.length ? profile[0].position : 'Role'}
                                </h4>
                            }
                        >
                            Created Time
                        </h2>

                        <h4
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                            }}
                            className='Form-label'
                            name='created'
                            id='created'
                            initialValue={
                                profile && profile.length ? profile[0].position : 'email'
                            }
                            label={
                                <h2 style={{}}>
                                    {profile && profile.length ? profile[0].created : 'Created Time'}
                                </h2>
                            }
                        >
                            <b>Updated</b>
                        </h4>
                        <h2
                            colon={false}
                            style={{
                                display: 'block',
                                margin: '50px auto',
                                width: '200px',
                                'text-align': 'center',
                                'font-size': '14px',
                            }}
                            className='Form-label'
                            name='position'
                            id='position'
                            initialValue={
                                profile && profile.length ? profile[0].position : 'email'
                            }
                            label={
                                <h4 style={{ 'font-size': '14px' }}>
                                    {profile && profile.length ? profile[0].position : 'Role'}
                                </h4>
                            }
                        >
                            Updated Time
                        </h2>
                        <button
                            style={{
                                'background-color': 'red',
                                color: 'white',
                                border: 'none',
                                'padding-top': '5px',
                                'padding-bottom': '5px',
                                'padding-right': '15px',
                                'padding-left': '15px',
                            }}
                            type='button'
                            onClick={deletes}
                        >
                            Delete Account
                        </button>
                    </div>

                    <br />
                    <br />

                    <div
                        style={{ width: '65vw', height: '100%', 'padding-left': '80px' }}
                    >
                        <h3 style={{ color: '#348e47', 'margin-left': '150px' }}>
                            <b>Edit WildTrack Profile</b>
                        </h3>
                        <div
                            style={{
                                display: 'flex',
                                'margin-left': '150px',
                                'margin-top': '50px',
                            }}
                        ></div>
                        <br />

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='first_name'
                            id='firstName'
                            initialValue={profile?.firstName}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>First Name</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='First Name'
                                value={profile?.first_name}
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='last_name'
                            id='lastName'
                            initialValue={profile?.lastName}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Last Name</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='Last Name'
                                value={profile?.last_name}
                            />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='organization'
                            id='Organization'
                            initialValue={profile?.Organization}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Organization</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='Organization'
                                value={profile?.organization}
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='position'
                            id='Position'
                            initialValue={profile?.Position}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Position</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='Position'
                                value={profile?.position}
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='interests'
                            id='Interests'
                            initialValue={profile?.Interests}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Interests</b>
                                </h4>
                            }
                        >
          <textarea
              disabled={!isEditingMode}
              class='ant-input css-dev-only-do-not-override-1km3mtt'
              maxLength={10}
              style={{
                  'margin-left': '70px',
                  width: '75%',
                  height: '78px',
                  'border-color': '#d9d9d9'
              }}
              placeholder='Interests'
              type='textarea'
          />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='CountryofPrimaryResidence'
                            id='CountryOfPrimaryResidence'
                            initialValue={profile?.CountryOfPrimaryResidence}
                            label={
                                <h4
                                    style={{
                                        width: '180px',
                                        height: '90px',
                                        'margin-bottom': '0'
                                    }}
                                >
                                    <b>
                                        Country Of Primary
                                        <br /> Residence
                                    </b>
                                </h4>
                            }
                        >
                            <div
                                class='ant-form-item-control-input-content'
                                style={{
                                    'margin-bottom': '0px',
                                    'justify-content': 'space-around'
                                }}
                            >
                                <select
                                    disabled={!isEditingMode}
                                    class='ant-input css-dev-only-do-not-override-1km3mtt'
                                    name='countrieselect'
                                    id='countryselect'
                                    style={{
                                        'margin-left': '70px',
                                        width: '75%',
                                        'border-color': '#d9d9d9'
                                    }}
                                >
                                    {renderCountries()}
                                </select>
                            </div>
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='FieldworkLocations'
                            id='FieldworkLocations'
                            initialValue={profile?.FieldworkLocations}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Fieldwork Locations</b>
                                </h4>
                            }
                        >
                            <DisabledPage disabled={!isEditingMode} />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='linkedin'
                            id='LinkedIn'
                            initialValue={profile?.LinkedIn}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>LinkedIn</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='LinkedIn'
                                value={profile?.linkedin}
                            />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='facebook'
                            id='Facebook'
                            initialValue={profile?.facebook}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Facebook</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='Facebook'
                                value={profile?.twitter}
                            />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='twitter'
                            id='Twitter'
                            initialValue={profile?.Twitter}
                            label={
                                <h4 style={{ width: '180px' }}>
                                    <b>Twitter</b>
                                </h4>
                            }
                        >
                            <Input
                                readOnly={!isEditingMode}
                                maxLength={10}
                                style={{ 'margin-left': '70px', width: '75%' }}
                                placeholder='Twitter'
                                value={profile?.twitter}
                            />
                        </Form.Item>

                        <br />

                        <div class='containing' style={{ display: 'flex' }}>
                            <div style={{ width: '50%', margin: 'auto' }}>
                                {!isEditingMode && (
                                    <Button
                                        type='primary'
                                        htmlType='button'
                                        onClick={() => setIsEditingMode(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                )}

                                {isEditingMode && (
                                    <Button
                                        type='primary'
                                        htmlType='button'
                                        onClick={undo}
                                        loading={submitLoading}
                                    >
                                        Undo
                                    </Button>
                                )}

                                {isEditingMode && (
                                    <Button type='primary' htmlType='submit' loading={submitLoading}>
                                        {submitLoading ? 'Updating...' : 'Update Profile'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
