
export default function AppButton({ onClick, type, children }) {


    return (
        <button onClick={onClick} type={type ?? 'button'} className="inline-flex justify-center bg-indigo-600 px-6 py-4 text-md/6 font-zalando font-semibold text-white hover:bg-indigo-500">
            {children}
        </button>
    )

} 