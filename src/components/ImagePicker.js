import {useState} from 'react';
import AWS from 'aws-sdk';
import fileUploader from '@/services/aws';

AWS.config.update({
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY,
});

const s3 = new AWS.S3();

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setFile] = useState(null);

  const handleImageChange = (event) => {
    const [file] = event.target.files;
    setFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (imageFile) {
      debugger;
      try {
        const file = imageFile;
        const fileName = file?.name;

        let path = `group/${fileName}`;
        const uploadedFile = fileUploader(imageFile, path);
        await uploadedFile.done();

        // await s3.upload(params).promise();
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Failed to upload image:', error.message);
        alert('Failed to upload image.');
      }
    }
  };

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Image Picker</h1>
      <div className='flex flex-col items-center'>
        <label
          htmlFor='imageInput'
          className='mb-2 font-semibold text-gray-700'
        >
          Select an Image:
        </label>
        <input
          type='file'
          id='imageInput'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
        <label
          htmlFor='imageInput'
          className='px-4 py-2 text-white bg-blue-500 rounded cursor-pointer'
        >
          Choose File
        </label>
        {selectedImage && (
          <div className='mt-4'>
            <h2 className='text-lg font-semibold'>Selected Image:</h2>
            <img
              src={selectedImage}
              alt='Selected'
              className='max-w-md mt-2 rounded'
            />
            <button
              className='mt-4 px-4 py-2 text-white bg-green-500 rounded'
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
