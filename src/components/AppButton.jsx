
export default function AppButton({ className = '', children, ...props }) {


    return (
        <button {...props} className={`inline-flex justify-center bg-indigo-600 px-6 py-4 text-md/6 font-zalando font-semibold text-white hover:bg-indigo-500 cursor-pointer ${className}`}>
            {children}
        </button>
    )

} 