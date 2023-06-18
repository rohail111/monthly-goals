import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIAQEXASG7F6QIACB4I',
  secretAccessKey: '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',
});

const ses = new AWS.SES({region: 'us-east-2'});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {sender, recipient, subject, message} = req.body;

    const params = {
      Destination: {
        ToAddresses: [recipient],
      },
      Message: {
        Body: {
          Text: {Data: message},
        },
        Subject: {Data: subject},
      },
      Source: sender,
    };

    try {
      await ses.sendEmail(params).promise();
      res.status(200).json({message: 'Email sent successfully!'});
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({message: 'Failed to send email.'});
    }
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}
