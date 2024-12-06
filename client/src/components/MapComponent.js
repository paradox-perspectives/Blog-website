import React, { useState } from 'react';
import { Spin } from 'antd';

const MapComponent = () => {
    const [loading, setLoading] = useState(true); // Track loading state

    const googleMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.593501913679!2d5.493521555017086!3d50.35548680718067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c04f3dcfd7c73b%3A0xc2a744eb720127d2!2sOxyvitale%20Fitness!5e0!3m2!1snl!2sbe!4v1721588366495!5m2!1snl!2sbe";
    const googleMapsRedirectUrl = "https://www.google.com/maps/place/Oxyvitale+Fitness/@50.3554252,5.4947661,17z/data=!3m1!4b1!4m6!3m5!1s0x47c04f3dcfd7c73b:0xc2a744eb720127d2!8m2!3d50.3554252!4d5.4947661!16s%2Fg%2F11f76_04p4?entry=ttu";


    return (
        <div className="relative mx-auto pl-1 pr-1 md:pr-32 py-2 max-w-4xl pb-6" style={{ height: '450px' }}>
            <h1 className="text-2xl font-bold mb-4">Trouvez-nous</h1>

            {/* Show loading spinner until the map is loaded */}
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <Spin size="large" />
                </div>
            )}

            {/* Google Map iframe */}
            <iframe
                src={googleMapUrl}
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
                onLoad={() => setLoading(false)} // Set loading to false when iframe loads
            ></iframe>

            {/* Overlay link */}
            <a
                href={googleMapsRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 left-0 w-full h-full"
                style={{ textDecoration: 'none' }}
            >
                <span className="sr-only">Open in Google Maps</span>
            </a>
        </div>
    );
};

export default MapComponent;
