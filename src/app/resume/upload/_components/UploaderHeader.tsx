import { FileText } from "lucide-react"

export const UploaderHeader = () => {
    return (
        <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-transparent rounded-full">
                    <FileText className="h-8 w-8 text-accent" />
                </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">PDF Upload</h1>
            <p className="text-sm">Upload your PDF document securely. Supports PDF files up to 5MB.</p>
        </div>
    )
}