import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutfn } from "../lib/api.js";
import { toast } from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutfn,
    onSuccess: () => {
      // Clear cached auth user
      queryClient.setQueryData(["authUser"], null);
      queryClient.removeQueries(["authUser"]);

      toast.success("Logged out successfully!", { duration: 3000 });

      // Redirect to login page
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed", {
        style: { background: "#000", color: "#fff" },
      });
    },
  });

  return { logout, isLoading };
}

export default useLogout;
