"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, type File, FileText, X, Check, AlertCircle, FolderOpen } from "lucide-react"
import { handleAnalyze } from "../_utils/handleAnalyze"
import { useRouter } from "next/navigation"

interface FileWithPreview extends File {
    progress?: number
    status?: "uploading" | "completed" | "error"
    id: string,
    data?: File
}

export default function SinglePdfUploadPage() {
    const [file, setFile] = useState<FileWithPreview | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    // const [pdf, setPdf] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]?.name) {

            const newFile = {
                // ...acceptedFiles[0],
                progress: 0,
                status: "uploading",
                id: Math.random().toString(36).substr(2, 9),
                data: acceptedFiles[0]
            }

            // console.log(newFile, "new file", acceptedFiles[0])
            setFile(newFile as FileWithPreview)
            // acceptedFiles[0] && setPdf(acceptedFiles[0])
            simulateUpload(newFile as FileWithPreview)
            // console.log(newFile, "new file")
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: false,
    })

    const simulateUpload = async (fileToUpload: FileWithPreview) => {
        setIsUploading(true)

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            setFile((prev) => (prev ? { ...prev, progress } : null))
        }

        // Mark as completed
        setFile((prev) => (prev ? { ...prev, status: "completed" } : null))
        setIsUploading(false)
    }

    const removeFile = () => {
        setFile(null)
    }

    const getFileIcon = () => <FileText className="h-4 w-4 text-red-600" />

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }


    //   const {} = handleAnalyze(file!)


    const router = useRouter();


    const handleNavigate = () => {
        // navigate.push("/resume/analysis")
        // navigate.useRouter().push("/resume-analysis");
        router.push("/resume/analysis");
    }

    const { handleFile } = handleAnalyze()

    useEffect(() => {
        if (!file) return;
// const blob: Blob = new Blob([file], { type: file.type });
        // handleFile(file)
        // console.log(pdf, "pdf text", file?.type, file?.name, file?.size, file.name)
        handleFile(file.data)
        // console.log(file, "file")

        // handleFile(pdf)
        // handleFile(file.text)
    }, [file])


    return (
        <div className="min-h-screen bg-transparent">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-transparent dark:bg-red-950 rounded-full">
                            <FileText className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary-foreground">PDF Upload</h1>
                    <p className="text-muted-foreground text-sm">Upload your PDF document securely. Supports PDF files up to 5MB.</p>
                </div>

                {/* Drop Zone */}
                <Card className="mb-6 bg-transparent">
                    <CardContent className="p-0">
                        <div
                            {...getRootProps()}
                            className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200
                ${isDragActive
                                    ? "border-primary bg-primary/5 scale-[1.02]"
                                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                                }
              `}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center space-y-4">
                                <div
                                    className={`p-4 rounded-full transition-colors ${isDragActive ? "bg-primary text-primary-foreground" : "bg-muted"
                                        }`}
                                >
                                    <Upload className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-primary-foreground">
                                        {isDragActive ? "Drop PDF file here" : "Upload your PDF document"}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4">Drag and drop a PDF file here, or click to browse</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <Badge variant="secondary" className="text-primary">PDF Only</Badge>
                                        <Badge variant="secondary" className="text-primary">Up to 50MB</Badge>
                                        <Badge variant="secondary" className="text-primary">Single File</Badge>
                                    </div>
                                </div>
                                <Button variant="outline" className="mt-4">
                                    <FolderOpen className="h-4 w-4 mr-2 text-primary" />
                                    Browse Files
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* File Display */}
                {file && (
                    <Card className="bg-transparent">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-primary-foreground">Uploaded File</h3>
                                <Button variant="outline" size="sm" onClick={removeFile} disabled={isUploading}>
                                    Remove File
                                </Button>
                            </div>
                            <Separator className="mb-4" />
                            <div className="flex items-center space-x-4 p-4 border rounded-lg">
                                {/* File Icon */}
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 bg-red-50 dark:bg-red-950 rounded flex items-center justify-center">
                                        {getFileIcon()}
                                    </div>
                                </div>

                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium truncate text-primary-foreground">{file.data?.name}</p>
                                        {file.status === "completed" && <Check className="h-4 w-4 text-green-600" />}
                                        {file.status === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">{formatFileSize(file?.data?.size || 0)}</p>
                                    {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
                                    {file.status === "completed" && (
                                        <div className="text-xs text-green-600 font-medium">Upload completed</div>
                                    )}
                                </div>

                                {/* Remove Button */}
                                <Button variant="ghost" size="sm" onClick={removeFile} disabled={file.status === "uploading"}>
                                    <X className="h-4 w-4 text-primary-foreground" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                {file && (
                    <div className="flex justify-center space-x-4 mt-6">
                        <Button variant="outline" onClick={removeFile} disabled={isUploading} className="text-primary">
                            Remove File
                        </Button>
                        <Button disabled={isUploading || file.status !== "completed"} className="min-w-[120px]" onClick={handleNavigate}>
                            {isUploading ? "Processing..." : "Analyze Resume"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
