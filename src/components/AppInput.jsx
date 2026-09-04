
export default function AppInput({ className = '', name, label, ...props }) {

    return (
        <div>
            {label &&
                <label htmlFor={name} className="block mb-1 uppercase text-xs text-mauve-400 mb-1">{label}</label>
            }
            <input name={name} {...props} className={`block w-full bg-white px-4 py-2 text-sm text-mauve-600 outline-1 -outline-offset-1 outline-mauve-300 placeholder:uppercase placeholder:text-xs placeholder:text-mauve-400 focus:outline-indigo-400 ${className}`} />
        </div>
    )

} 