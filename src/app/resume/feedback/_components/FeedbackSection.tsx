export const FeedbackSection = ({ label, content, status }: { label: string, content: { [key: string]: string | string[] }, status: string }) => {
    if (!content) return null;
    if (Object.keys(content).length === 0) return null;

    const data = Object.entries(content)

    return (
        <div className="my-4 rounded-md shadow-md gap-2" style={{ display: "flex", flexDirection: "column" }}>
            <h3
                className="font-bold text-3xl uppercase"
            >{label}</h3>
            {
                label === "ats_score" || label === "ats" && (
                    <div className="p-4 bg-transparent rounded-md shadow-md">
                        <h3
                            className="text-xl font-bold capitalize text-sidebar-primary"
                        >Before improvements</h3>
                        <p
                        >{content?.before} / 10</p>
                    </div>
                )
            }
            {
                status === "unauthenticated" && label !== "education" ? (
                    <p className="text-center text-lg text-gray-600">Sign in to view feedback</p>
                ) : (
                    <div
                        className={`grid ${((data || []).length <= 4 && !label.includes("ats")) ? `grid-cols-${(data || []).length.toString()}` : label.includes("ats") ? "grid-cols-2" : "grid-cols-4"} gap-2`}
                    >
                        {
                            data.map(([key, value]) => {
                                if (typeof value === 'string') {
                                    return <FeedbackSectionAsString key={key} label={key} content={value} />
                                } else if (Array.isArray(value)) {
                                    return <FeedbackSectionAsArray key={key} label={key} content={value} />
                                }
                                else {
                                    return null;
                                }
                            })
                        }
                    </div>
                )
            }
            {
                label === "ats_score" || label === "ats" && (
                    <div className="p-4 bg-transparent rounded-md shadow-md">
                        <h3
                            className="text-xl font-bold text-sidebar-primary capitalize"
                        >After improvements</h3>
                        <p
                        >{content?.after} / 10</p>
                    </div>
                )
            }
        </div>
    )
}

const FeedbackSectionAsString = ({ label, content }: { label: string, content: string }) => {
    if (!content || content.length === 0) return null;

    return (
        <div className="p-4 bg-transparent rounded-md shadow-md space-y-2">
            <h3
                className="text-xl font-bold capitalize text-sidebar-primary"
            >{label}</h3>
            <p className="">{content}</p>
        </div>
    )
}

const FeedbackSectionAsArray = ({ label, content }: { label: string, content: string[] }) => {
    if (!content || content.length === 0) return null;

    label === "ats_score" && console.log(content, "content array");


    return (
        <div className="space-y-2 p-4">
            <h3
                className="text-lg font-semibold text-sidebar-primary capitalize"
            >{label}</h3>
            <ul
                className="list-disc pl-4"
            >
                {content.map((item, index) => (
                    <li key={index}
                    >{item}</li>
                ))}
            </ul>
        </div>
    )
}