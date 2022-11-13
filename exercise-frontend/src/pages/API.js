import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';


function API() {
    const [number, setNumber] = useState([])

    async function getResponse() {
        const response = await fetch(
            'https://random.dog/doggos',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNumber(data)
        console.log(data)
    }

    useEffect(() => {

    }, [number]);
    return (
        <>
            <h2>API Call</h2>
            <label>
                <button
                    onClick={getResponse}
                >Call API</button></label>
            <p>Your number is: {number}</p>
        </>
    )
}

export default API