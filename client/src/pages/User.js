import React, {useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import logo from "../images/waving-287_256.gif";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const User = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [viewData, setViewData] = useState('table');
    
    const handleclick = () => {
        setViewData("chart");
    }
    useEffect(() => {
        handleclick();
    }, [viewData])
    return (
      <>
        <Layout>
        
            <div className="userdiv text-center mt-3">
              <h4>Hi {user.name}, thankyou for choosing us.</h4>
              <div className="text-center">
                <img src={logo} alt="loading..."></img>
                    </div>
                    
                    <div className='mt-5'> 
                        <h5>
                            <Link onClick={handleclick} to={'/'}>View Your Expenses</Link>
                        </h5>
                    </div>
            </div>
     
        </Layout>
      </>
    );
}

export default User