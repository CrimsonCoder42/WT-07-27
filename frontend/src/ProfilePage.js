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
        'eyJraWQiOiJKUGpQNFBzOFZ5ajlNXC84dXhCVmNkcEVcLzMrTm1jNVNxbVNJTVlHY2g0NEE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNjQyNDBlMy00NDkxLTQyNTItOWEyNS0yOTI0MTIyMzU2ZmEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9KQUZLMWxoWlUiLCJjbGllbnRfaWQiOiI0ZnExNTh1ZGhyam05NGVrOTh1NGE5ZmhpMiIsIm9yaWdpbl9qdGkiOiJhYTg5YWFhMC0wN2I0LTQ5NWUtOTJlMy1iNjYyNjdiMjM0MDAiLCJldmVudF9pZCI6IjJhZjA0OWNjLTA3ZGYtNGM0NS04ZDVjLTk4NGFiZWRhZmY0YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODA3MjIyNDksImV4cCI6MTY4MDcyNTg0OSwiaWF0IjoxNjgwNzIyMjQ5LCJqdGkiOiJmZGM0MzVlZC0zOWI4LTRiZTQtYTU0Yi1lYjZhOWU5OWM0NjUiLCJ1c2VybmFtZSI6ImQ2NDI0MGUzLTQ0OTEtNDI1Mi05YTI1LTI5MjQxMjIzNTZmYSJ9.nW79KEqEtHkdgiDinR6LMg3fzLLQ89pFgA4oueWhc-J_BfCLok5LGs5_tTSDJ35ZIqE6v_OjnYaCgDlNI7VnEVYxG1AmFbdEOqHbe5yOVxgNy5ZzuqoHrRSCPCYoOwmIj56DOf1hDW9fiNTDqQ7gvS6l7AV8F7T_irQtyXsx6NP0t42K6CYUGuYx3TU9fZ3B9bEuPJYyxsCJ5sAQDhT3UC5rBaGJr3umpbvRjx3h-fdI9NRrKrb31wZcfV4BNyQnIX810mzEEDvDyM5THlDMVoDvHRMS2JI4QCzCvn2z_pIZevZSyynwIsEmDjZQbEx4rNQ-X30BHhi7zwjAjl_KoQ';

    console.log(ACCESS_TOKEN)

    // Declare state variables
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [profile, setProfile] = useState(null);

    // Fetch user data
    const { data, loading, error } = useFetch(
        'https://rtvb5hreoe.execute-api.us-east-1.amazonaws.com/dev/_api/v1/get_user'
    );

    // Update user profile data with fetched data
    useEffect(() => {
        if (data) {
            const userProfile = data.length && data[0] ? data[0] : null;
            setProfile(userProfile);
        }
    }, [data]);

    // Declare state variables for update profile form submission
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Function to set editing mode to false
    const undo = function () {
        setIsEditingMode(false);
    };

    // Function to handle form submission
    const handleSubmit = async (values) => {
        setSubmitLoading(true);
        setSubmitError(null);

        try {
            const response = await fetch(
                'https://rtvb5hreoe.execute-api.us-east-1.amazonaws.com/dev/_api/v1/update_user',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    },
                    body: JSON.stringify(values)
                }
            );

            if (!response.ok) {
                throw new Error('Error updating profile');
            }

            const data = await response.json();

            const userProfile = data.length && data[0] ? data[0] : null;

            setProfile(userProfile);
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    // Render loading spinner while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if there is an error fetching data
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Define function for rendering countries in a dropdown
    const renderCountries = () =>
        countries.countries.map((country) => {
            return <option value={country.name}>{country.name}</option>;
        });


    // Render profile page content
    return (
        // Define the markup for profile page
        <div class='wrapper'>
            <Form onFinish={handleSubmit}>
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
                                userProfile.length ? userProfile[0].position : 'email'
                            }
                            label={
                                <h2 style={{ 'font-size': '14px' }}>
                                    {userProfile.length ? userProfile[0].position : 'Position'}
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
                            initialValue={userProfile.length ? userProfile[0].name : 'email'}
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
                                userProfile.length ? userProfile[0].position : 'email'
                            }
                            label={
                                <h4 style={{ 'font-size': '14px' }}>
                                    {userProfile.length ? userProfile[0].position : 'Role'}
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
                                userProfile.length ? userProfile[0].position : 'email'
                            }
                            label={
                                <h2 style={{}}>
                                    {userProfile.length ? userProfile[0].created : 'Created Time'}
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
                                userProfile.length ? userProfile[0].position : 'email'
                            }
                            label={
                                <h4 style={{ 'font-size': '14px' }}>
                                    {userProfile.length ? userProfile[0].position : 'Role'}
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
                                userProfile.length ? userProfile[0].position : 'email'
                            }
                            label={
                                <h2 style={{}}>
                                    {userProfile.length ? userProfile[0].created : 'Created Time'}
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
                                userProfile.length ? userProfile[0].position : 'email'
                            }
                            label={
                                <h4 style={{ 'font-size': '14px' }}>
                                    {userProfile.length ? userProfile[0].position : 'Role'}
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
                            name='firstName'
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
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='lastName'
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
                            />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='Organization'
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
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='Position'
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
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='Interests'
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
                            name='LinkedIn'
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
                            />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='Facebook'
                            id='Facebook'
                            initialValue={profile?.Facebook}
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
                            />
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            className='Form-label'
                            name='Twitter'
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
                                        'Edit Profile'
                                    </Button>
                                )}

                                {isEditingMode && (
                                    <Button
                                        type='primary'
                                        htmlType='button'
                                        onClick={undo}
                                        loading={submitLoading}
                                    >
                                        'Undo'
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
