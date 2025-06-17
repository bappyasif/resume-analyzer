"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent } from "../../../../components/ui/card"
import { Progress } from "../../../../components/ui/progress"
import { Badge } from "../../../../components/ui/badge"
import { Separator } from "../../../../components/ui/separator"
import { Upload, File, ImageIcon, Video, FileText, X, Check, AlertCircle, Cloud, FolderOpen } from "lucide-react"

interface FileWithPreview extends File {
    preview?: string
    progress?: number
    status?: "uploading" | "completed" | "error"
    id: string
}

export default function UploadPage() {
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => {
            const fileWithPreview = Object.assign(file, {
                preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
                progress: 0,
                status: "uploading" as const,
                id: Math.random().toString(36).substr(2, 9),
            })
            return fileWithPreview
        })

        setFiles((prev) => [...prev, ...newFiles])
        simulateUpload(newFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            "video/*": [".mp4", ".mov", ".avi", ".mkv"],
            "application/pdf": [".pdf"],
            "text/*": [".txt", ".md", ".csv"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxSize: 50 * 1024 * 1024, // 50MB
        multiple: true,
    })

    const simulateUpload = async (filesToUpload: FileWithPreview[]) => {
        setIsUploading(true)

        for (const file of filesToUpload) {
            // Simulate upload progress
            for (let progress = 0; progress <= 100; progress += 10) {
                await new Promise((resolve) => setTimeout(resolve, 100))
                setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
            }

            // Mark as completed
            setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "completed" } : f)))
        }

        setIsUploading(false)
    }

    const removeFile = (fileId: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== fileId))
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
        if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
        if (file.type === "application/pdf") return <FileText className="h-4 w-4" />
        return <File className="h-4 w-4" />
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const totalFiles = files.length
    const completedFiles = files.filter((f) => f.status === "completed").length
    const uploadingFiles = files.filter((f) => f.status === "uploading").length

    return (
        <div
            // className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
            className="bg-transparent min-h-screen"
        >
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Cloud className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">File Upload</h1>
                    <p className="text-muted-foreground">
                        Upload your files securely. Supports images, videos, documents up to 50MB each.
                    </p>
                </div>

                {/* Upload Stats */}
                {totalFiles > 0 && (
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{totalFiles}</div>
                                    <div className="text-sm text-muted-foreground">Total Files</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{completedFiles}</div>
                                    <div className="text-sm text-muted-foreground">Completed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{uploadingFiles}</div>
                                    <div className="text-sm text-muted-foreground">Uploading</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Drop Zone */}
                <Card className="mb-6">
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
                                    <h3 className="text-lg font-semibold mb-2">
                                        {isDragActive ? "Drop files here" : "Upload your files"}
                                    </h3>
                                    <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <Badge variant="secondary">Images</Badge>
                                        <Badge variant="secondary">Videos</Badge>
                                        <Badge variant="secondary">Documents</Badge>
                                        <Badge variant="secondary">Up to 50MB</Badge>
                                    </div>
                                </div>
                                <Button variant="outline" className="mt-4">
                                    <FolderOpen className="h-4 w-4 mr-2" />
                                    Browse Files
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* File List */}
                {files.length > 0 && (
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Uploaded Files</h3>
                                <Button variant="outline" size="sm" onClick={() => setFiles([])} disabled={isUploading}>
                                    Clear All
                                </Button>
                            </div>
                            <Separator className="mb-4" />
                            <div className="space-y-4">
                                {files.map((file) => (
                                    <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        {/* File Preview/Icon */}
                                        <div className="flex-shrink-0">
                                            {file.preview ? (
                                                <img
                                                    src={file.preview || "/placeholder.svg"}
                                                    alt={file.name}
                                                    className="h-12 w-12 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                                                    {getFileIcon(file)}
                                                </div>
                                            )}
                                        </div>

                                        {/* File Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <p className="text-sm font-medium truncate">{file.name}</p>
                                                {file.status === "completed" && <Check className="h-4 w-4 text-green-600" />}
                                                {file.status === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2">{formatFileSize(file.size)}</p>
                                            {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
                                            {file.status === "completed" && (
                                                <div className="text-xs text-green-600 font-medium">Upload completed</div>
                                            )}
                                        </div>

                                        {/* Remove Button */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile(file.id)}
                                            disabled={file.status === "uploading"}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                {files.length > 0 && (
                    <div className="flex justify-center space-x-4 mt-6">
                        <Button variant="outline" onClick={() => setFiles([])} disabled={isUploading}>
                            Clear All
                        </Button>
                        <Button disabled={isUploading || completedFiles === 0} className="min-w-[120px]">
                            {isUploading ? "Processing..." : `Save ${completedFiles} Files`}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
