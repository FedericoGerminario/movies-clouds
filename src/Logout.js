import React from 'react';
import { GoogleLogout } from 'react-google-login';

export const LogoutApp = () => {
    const handleLogin = async googleData => {
        alert('Logout successful'); 
      }
    return(
        <div>
            <GoogleLogout
            clientId={'252786611631-qudp2lodedpb152jn3b29fulmrouc913.apps.googleusercontent.com'}
            buttonText="Logout"
            onLogoutSuccess={handleLogin}
            />
        </div>
    );
};