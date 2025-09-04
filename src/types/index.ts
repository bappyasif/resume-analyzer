interface FileWithPreview extends File {
    progress?: number
    status?: "uploading" | "completed" | "error"
    id: string,
    data?: File
}

type Resume = {
    parsedText: string;
    role: string;
    feedback: any;
    analysis: any;
};

type ActionTypes = {
    type: "UPDATE_RESUME_PARSED_TEXT" | "UPDATE_RESUME_ROLE" | "UPDATE_RESUME_FEEDBACK" | "UPDATE_RESUME_ANALYSIS" | "UPDATE_USER";
    payload: any;
}

export type { FileWithPreview, ActionTypes, Resume };