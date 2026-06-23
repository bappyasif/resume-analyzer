import { useEffect, useState } from "react";
import { useAppCtx } from "~/contexts/app";

export const useToUpdateRole = () => {
    const [selectedRole, setSelectedRole] = useState("");

    const {dispatch, state} = useAppCtx();

    const updateRole = (role: string) => {
        setSelectedRole(role);
        dispatch({type: "UPDATE_RESUME_ROLE", payload: role});
    }

    const {resume} = state;
    
    const {role} = resume;

    useEffect(() => {
        if (role) {
            setSelectedRole(role);
        }
    }, [role]);

    return {
        selectedRole,
        updateRole,
    }
}