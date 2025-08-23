import { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,
        style: {
          background: '#fff',
          color: 'black',
        },
      }}
    />
  );
};

export default CustomToaster;
