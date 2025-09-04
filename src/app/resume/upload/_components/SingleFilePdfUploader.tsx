"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { handleAnalyze } from "../_utils/handleAnalyze"
import { useRouter } from "next/navigation"
import { useAppCtx } from "~/contexts/app"
import type { FileWithPreview } from "~/types"
import { FileDisplay } from "./FileDisplay"
import { FileDropZone } from "./DropZone"
import { CurrentRoleBadge } from "./CurrentRoleBadge"

export default function SinglePdfUploadPage() {
    const [file, setFile] = useState<FileWithPreview | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [selectedRole, setSelectedRole] = useState("Software Engineer");

    const removeFile = () => {
        setFile(null)
    }

    const { dispatch } = useAppCtx()

    const router = useRouter();

    const handleNavigate = () => {
        dispatch({ type: "UPDATE_RESUME_ROLE", payload: selectedRole })
        router.push("/resume/analysis");
    }

    const { handleFile } = handleAnalyze()

    useEffect(() => {
        if (!file) return;
        handleFile(file.data)
    }, [file])

    return (
        <div className="bg-transparent">
            <div className="container mx-auto px-4 py-8 max-w-4xl">

                {/* Drop Zone */}
                <FileDropZone setFile={setFile} setIsUploading={setIsUploading} />

                {/* File Display */}
                {file && (
                    <FileDisplay
                        file={file} isUploading={isUploading} removeFile={removeFile}
                    />
                )}

                {/* select user current role */}
                {
                    file && (
                        <CurrentRoleBadge selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                    )
                }

                {/* upload button */}
                {
                    file && file.status === "completed" && (
                        <div className="flex justify-center mt-6">
                            <Button onClick={handleNavigate} className="min-w-[27rem]" size={"lg"}>
                                Analyze Resume
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}