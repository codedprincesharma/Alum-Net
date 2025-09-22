import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { adminloginfn } from "../lib/api.js";
import { toast } from "react-hot-toast";

function useAdminLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: adminloginfn,
    onSuccess: (data) => {
      // Invalidate authUser query to refresh user state
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast.success("Admin logged in successfully!", { duration: 1000 });

      // Optionally navigate to admin dashboard
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed",
        {
          style: { background: "#000", color: "#fff" },
        }
      );
    },
  });

  return { login, isLoading };
}

export default useAdminLogin;
