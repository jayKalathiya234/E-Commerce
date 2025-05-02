// tracking.controller.js
const axios = require('axios');
const Order = require('../model/orderModel'); // Adjust path based on your project structure

// FedEx API credentials - store these in environment variables in production
const FEDEX_API_KEY = process.env.FEDEX_API_KEY;
const FEDEX_SECRET = process.env.FEDEX_SECRET_KEY;

// Get authentication token from FedEx
const getFedExToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', FEDEX_API_KEY);
        params.append('client_secret', FEDEX_SECRET);

        const response = await axios.post(
            `${process.env.FEDEX_BASE_URL}/oauth/token`,
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        // console.log("response",response.data);
        
        return response.data.access_token;
    } catch (error) {
        console.error('FedEx Authentication Error:', error.response?.data || error.message);
        throw error;
    }
};

// Track a shipment using FedEx API
exports.trackShipment = async (req, res) => {
    try {
        const { trackingNumber } = req.params;

        if (!trackingNumber) {
            return res.status(400).json({
                status: 400,
                message: 'Tracking number is required'
            });
        }

        // Get FedEx authentication token
        const token = await getFedExToken();

        // Make tracking request to FedEx API
        const trackingResponse = await axios.post('https://apis-sandbox.fedex.com/track/v1/trackingnumbers', {
            includeDetailedScans: true,
            trackingInfo: [{
                trackingNumberInfo: {
                    trackingNumber: trackingNumber
                }
            }]
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        const fedExData = trackingResponse.data;
        const trackingData = processTrackingData(fedExData);

        return res.status(200).json({
            status: 200,
            trackingData
        });

    } catch (error) {
        console.error('Tracking Error:', error);
        return res.status(500).json({
            status: 500,
            message: 'Failed to retrieve tracking information',
            error: error.message
        });
    }
};

// Process tracking data from FedEx response
const processTrackingData = (fedExData) => {
    
    try {
        const shipment = fedExData.output.completeTrackResults[0].trackResults[0];
        const scanEvents = shipment.scanEvents || [];

        // Current shipment status
        let status = 'unknown';
        if (shipment.latestStatusDetail.code === 'DL') {
            status = 'delivered';
        } else if (shipment.latestStatusDetail.code === 'OD') {
            status = 'out_for_delivery';
        } else if (shipment.latestStatusDetail.code === 'IT') {
            status = 'shipped';
        } else if (shipment.latestStatusDetail.code === 'PU') {
            status = 'ordered';
        }

        // Process scan events into tracking steps
        const steps = scanEvents.map(event => ({
            date: event.date,
            description: event.eventDescription,
            location: `${event.scanLocation.city}, ${event.scanLocation.stateOrProvinceCode}, ${event.scanLocation.countryCode}`,
            status: event.statusCode
        }));

        return {
            status,
            steps: steps.sort((a, b) => new Date(a.date) - new Date(b.date)),
            estimatedDelivery: shipment.estDeliveryDt || null,
            service: shipment.serviceDesc || '',
            packageDetails: {
                weight: shipment.packageDetails?.weightAndDimensions?.weight?.value || '',
                weightUnit: shipment.packageDetails?.weightAndDimensions?.weight?.unit || '',
                dimensions: shipment.packageDetails?.weightAndDimensions?.dimensions || {}
            }
        };
    } catch (error) {
        console.error('Error processing FedEx tracking data:', error);
        // Return a minimal object if processing fails
        return {
            status: 'unknown',
            steps: [],
            error: 'Failed to process tracking data'
        };
    }
};

