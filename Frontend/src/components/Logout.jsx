import useLogout from '../Hooks/useLogout.js';
import out from '../assets/Logout.svg'

function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button 
      onClick={() => logout()} 
      disabled={isPending}
      className=" text-white  rounded"
    >
      {isPending ? ("Logging Out...") : (
        <>
        <img  className='w-[35px]' src={out} alt="" />
        </>
      )}
    </button>
  );
}

export default LogoutButton;
