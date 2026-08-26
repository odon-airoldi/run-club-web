
export default function AppInput({ name, label, ...props }) {

    return (
        <div>
            {label &&
                <label htmlFor={name} className="block text-xs mb-1 uppercase text-mauve-400 mb-1">{label}</label>
            }
            <input name={name} {...props} className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
    )

} 