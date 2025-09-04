import { useState } from "react";
import { useAppCtx } from "~/contexts/app";

export const useToUpdateRole = () => {
    const [selectedRole, setSelectedRole] = useState("Software Engineer");

    const {dispatch} = useAppCtx();

    const updateRole = (role: string) => {
        setSelectedRole(role);
        dispatch({type: "UPDATE_RESUME_ROLE", payload: role});
    }

    return {
        selectedRole,
        updateRole,
    }
}