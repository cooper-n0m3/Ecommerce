import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <>
            <div className="form-container bg-gradient-to-r from-gray-950 to-slate-800 flex justify-center items-center h-[100vh] w-full bg-gray-900">
                    <Outlet/>
            </div>  
        </>
    );
}

export default AuthLayout;
