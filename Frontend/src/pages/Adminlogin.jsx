import { useState } from 'react'
import useAdminLogin from '../Hooks/useAdminLogin.js'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'



function AdminLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const { login, isPending } = useAdminLogin();

  const handlesubmit = (e) => {
    e.preventDefault();
    login(loginData);
  }

  return (
   <div className='h-[100vh] w-full flex justify-center items-center bg-gray-100 text-black border'>
    <Toaster />
    <div className="w-full md:w-[70%] lg:w-[40%] xl:w-[30%] bg-white p-6 rounded-[10px] shadow-lg">
      <div className="w-full flex justify-center mb-4">
        <img className='w-[180px] md:w-[200px]' src="" alt="logo" />
      </div>
      <h2 className='text-xl font-semibold text-center'>Welcome Back</h2>
      {/* <p className='text-sm text-gray-500 text-center mb-6'>Login to continue shopping</p> */}

      <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
        <div>
          <p className='text-sm'>Email</p>
          <input 
            type="email" 
            className='w-full h-[45px] px-3 rounded-[8px] border border-gray-300 mt-2 text-[15px]'
            placeholder='example@gmail.com'
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required 
          />
        </div>
        <div>
          <p className='text-sm'>Password</p>
          <input 
            type="password" 
            className='w-full h-[45px] px-3 rounded-[8px] border border-gray-300 mt-2 text-[15px]'
            placeholder='******'
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required 
          />
        </div>

        <button 
          className='bg-[#008080] w-full py-2 rounded-[8px] text-white font-bold text-lg mt-4' 
          type='submit'
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center text-sm mt-4">
        <p>Don’t have an account? <Link to="/signup" className='text-[#008080] font-semibold'>Sign up</Link></p>
      </div>
    </div>
   </div>
  )
}

export default AdminLogin
