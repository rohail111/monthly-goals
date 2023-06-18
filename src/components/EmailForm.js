import {useState} from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: 'AKIAQEXASG7F6QIACB4I',
  secretAccessKey: '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',
});

const ses = new AWS.SES({region: 'eu-north-1'});

const EmailForm = () => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
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
        setStatusMessage('Email sent successfully!');
        // Clear form fields
        setSender('');
        setRecipient('');
        setSubject('');
        setMessage('');
      } catch (error) {
        console.error('Failed to send email:', error);
        setStatusMessage(`Failed to send email`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>SES Email Sender</h1>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='sender' className='block font-bold mb-1'>
            Sender:
          </label>
          <input
            type='text'
            id='sender'
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='recipient' className='block font-bold mb-1'>
            Recipient:
          </label>
          <input
            type='text'
            id='recipient'
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='subject' className='block font-bold mb-1'>
            Subject:
          </label>
          <input
            type='text'
            id='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='message' className='block font-bold mb-1'>
            Message:
          </label>
          <textarea
            id='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows='5'
            className='w-full px-3 py-2 border rounded'
            required
          ></textarea>
        </div>

        <div className='mb-4'>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            Send Email
          </button>
        </div>
      </form>

      {statusMessage && (
        <div className='text-center text-green-600'>{statusMessage}</div>
      )}
    </div>
  );
};

export default EmailForm;
