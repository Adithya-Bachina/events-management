import React, { useState } from 'react';

const Location = ({ onFetchLocation }) => {
  const [area, setArea] = useState('');
  const [error, setError] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude);
          setError('');
        },
        (err) => {
          setError('Unable to retrieve your location.');
          onFetchLocation('', 'Unable to retrieve your location.'); // Pass error to App
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      onFetchLocation('', 'Geolocation is not supported by this browser.'); // Pass error to App
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    if (response.ok) {
      const data = await response.json();
      const areaName = data.locality || data.city || 'Location not found';
      setArea(areaName);
      onFetchLocation(areaName, ''); // Pass area to App
    } else {
      setError('Error fetching location data.');
      onFetchLocation('', 'Error fetching location data.'); // Pass error to App
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Find My Location</h1>
      <button onClick={getLocation} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Get Location
      </button>
      <div style={{ marginTop: '20px' }}>
        {area && <p>Area: {area}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Location;
