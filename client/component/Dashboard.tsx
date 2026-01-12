// we will implement a dashboard component here 
import React, { useState } from 'react';


const Dashboard = () => {
    const [intakeNaturalLanguageQuery, setIntakeNaturalLanguageQuery] = useState('');
    const [convertToSQL, setConvertToSQL] = useState('');
    const [dataBaseQuery, setDataBaseQuery] = useState('');
}

function handleSubmit(e) {
    e.preventDefault();
};

return (
    <>
   <table>
    <thead>
    <div className="dashboard-container">
        <form className="dashboard-form">
            <input id="dashboard-inputfield" type="text" placeholder="Type in a question about Twitch Streamers"><br>
            <input id="dashboard-button" type="submit" value="Ask away! :)">
        </form>
    </div>
    </thead>
   </table>
    </>

)



export default Dashboard;