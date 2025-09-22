import axiosInstance from '/src/Lib/axios.js';

// --- User Signup ---
export const signupfn = async (signupData) => {
  const response = await axiosInstance.post('/auth/signup', signupData);
  return response.data;
};

// --- Add Admin ---
export const addAdminFn = async (adminData) => {
  const response = await axiosInstance.post('/auth/add-admin', adminData);
  return response.data;
};

// --- User Login ---
export const loginfn = async (loginData) => {
  const response = await axiosInstance.post('/auth/login', loginData);
  return response.data;
};

// --- Admin Login ---
export const adminloginfn = async (loginData) => {
  const response = await axiosInstance.post('/auth/adminlogin', loginData);
  return response.data;
};

// --- Logout ---
export const logoutfn = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

// --- Fetch Authenticated User ---
export const fetchAuthUser = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/me");
    return data;        // backend returns user object directly
  } catch (err) {
    return null;        // if 401, just return null
  }
};

// --- Change Password ---
export const changePasswordFn = async (data) => {
  const response = await axiosInstance.put("/auth/change-password", data);
  return response.data;
};

// --- Delete Account ---
export const deleteAccountFn = async () => {
  const response = await axiosInstance.delete("/auth/delete-account");
  return response.data;
};
