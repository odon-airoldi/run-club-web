
export default function AppUserPicture({ user, className = '' }) {

    return (

        (user?.picture) ?
            <img className={`rounded-full object-cover ${className}`} src={user?.picture} alt={`${user?.first_name} ${user?.last_name}`} title={`${user?.first_name} ${user?.last_name}`} />
            :
            <div className={`rounded-full bg-mauve-200 flex justify-center items-center text-white ${className}`}>
                {user?.first_name.slice(0, 1)}
                {user?.last_name.slice(0, 1)}
            </div>

    )

} 