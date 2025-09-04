import { Badge } from "~/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useToUpdateRole } from "../_hooks/useToUpdateRole"

export const CurrentRoleBadge = () => {
    const {updateRole, selectedRole} = useToUpdateRole();

    return (
        <div className="flex justify-center items-center mt-6">
            <Badge variant="outline" className="text-primary p-4">
                Current Role: <span className="font-semibold ml-2">{selectedRole}</span>
            </Badge>

            <Select
                value={selectedRole}
                onValueChange={(value) => updateRole(value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select your current role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>                                    <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}