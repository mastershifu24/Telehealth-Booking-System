const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('Full Event:', JSON.stringify(event, null, 2)); // Log the entire event
  
  let body;
  if (typeof event.body === 'string') {
    // Event body is a string, parse it
    body = JSON.parse(event.body); 
  } else if (typeof event.body === 'object') {
    // Event body is already an object
    body = event.body;
  } else {
    // Event body is undefined or invalid
    console.error('Invalid event body:', event.body);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid event body format" }),
    };
  }

  const { patientName, appointmentTime } = body;

  const params = {
    TableName: 'Appointments',
    Item: {
      AppointmentID: `${patientName}-${appointmentTime}`, 
      PatientName: patientName,
      AppointmentTime: appointmentTime,
    },
  };

  try {
    await dynamo.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Appointment created successfully" }),
    };
  } catch (error) {
    console.error('Error saving to DynamoDB:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create appointment" }),
    };
  }
};
