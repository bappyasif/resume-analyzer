import { FolderOpen, Upload } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import type { FileWithPreview } from "~/types"

export const FileDropZone = ({ setFile, setIsUploading }: { setFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>, setIsUploading: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const simulateUpload = async (fileToUpload: FileWithPreview) => {
        setIsUploading(true)

        setFile(fileToUpload)

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            setFile((prev) => (prev ? { ...prev, progress } : null))
        }

        // Mark as completed
        setFile((prev) => (prev ? { ...prev, status: "completed" } : null))
        setIsUploading(false)
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]?.name) {

            const newFile = {
                progress: 0,
                status: "uploading",
                id: Math.random().toString(36).substr(2, 9),
                data: acceptedFiles[0]
            }

            simulateUpload(newFile as FileWithPreview)
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

    return (
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
                            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
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
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Browse Files
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}