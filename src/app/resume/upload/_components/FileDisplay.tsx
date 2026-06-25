import { AlertCircle, Check, FileText, X } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Separator } from "~/components/ui/separator"
import type { FileWithPreview } from "~/types"

export const FileDisplay = ({
    file, isUploading, removeFile,
}: {
    file: FileWithPreview, isUploading: boolean, removeFile: () => void,
}) => {
    const getFileIcon = () => <FileText className="h-4 w-4 text-red-600" />

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
        <Card className="bg-transparent">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Uploaded File</h3>
                    <Button variant="destructive" size="sm" onClick={removeFile} disabled={isUploading}>
                        Remove File
                    </Button>
                </div>
                <Separator className="mb-4" />
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    {/* File Icon */}
                    <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-secondary rounded flex items-center justify-center">
                            {getFileIcon()}
                        </div>
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium truncate text-muted-foreground">{file.data?.name}</p>
                            {file.status === "completed" && <Check className="h-4 w-4 text-green-600" />}
                            {file.status === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{formatFileSize(file?.data?.size ?? 0)}</p>
                        {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
                        {file.status === "completed" && (
                            <div className="text-xs text-green-600 font-medium">Upload completed</div>
                        )}
                    </div>

                    {/* Remove Button */}
                    <Button variant="ghost" size="sm" onClick={removeFile} disabled={file.status === "uploading"} className="hover:bg-accent hover:text-accent-foreground">
                        <X className="h-8 w-8 text-destructive" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}