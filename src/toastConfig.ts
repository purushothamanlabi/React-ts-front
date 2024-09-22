type ToastPosition = 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';
// Assuming ToastPosition is imported from a library like react-toastify

// Correct type declaration
type HelloConfig = { 
    position: ToastPosition;
    autoClose: number;
    hideProgressBar: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    draggable: boolean;
    progress: number | undefined;
    theme: string;
}




// Correct variable declaration and initialization
const helloConfig: HelloConfig = {
    position: "top-center",  // Make sure this value matches ToastPosition type
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
};

export default helloConfig;

