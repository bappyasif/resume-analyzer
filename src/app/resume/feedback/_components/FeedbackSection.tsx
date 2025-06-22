import { useSession } from "next-auth/react";

export const FeedbackSection = ({ label, content, status }: { label: string, content: { [key: string]: string | string[] }, status: string }) => {
    if (!content) return null;
    if (Object.keys(content).length === 0) return null;

    // changing this as renderToString method is not working accessing next-auth session, as its for client side whereas server side method cant access it
    // const { status } = useSession();
    // console.log("status", status);

    // useEffect(() => {
    //     auth().then((session) => {
    //         console.log("session", session);
    //     }).catch((error) => {
    //         console.log("error", error);
    //     })
    // }, [content]);

    const data = Object.entries(content)


    return (
        <div className="my-4 rounded-md shadow-md" style={{ display: "flex", flexDirection: "column" }}>
            <h3 className="font-bold text-3xl text-blue-200 uppercase">{label}</h3>
            {
                status === "unauthenticated" && label !== "education" ? (
                    <p className="text-center text-lg text-gray-600">Sign in to view feedback</p>
                ) : (
                    <div 
                        // className={`grid ${data?.length > 2 ? "grid-cols-3" : data?.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-4`}
                        className={`grid ${(data || []).length <= 4 ? `grid-cols-${(data || []).length.toString()}` : "grid-cols-4"} gap-10`}
                    >
                        {
                            data.map(([key, value]) => {
                                if (typeof value === 'string') {
                                    return <FeedbackSectionAsString key={key} label={key} content={value} />
                                } else if (Array.isArray(value)) {
                                    return <FeedbackSectionAsArray key={key} label={key} content={value} />
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

const FeedbackSectionAsString = ({ label, content }: { label: string, content: string }) => {
    if (!content || content.length === 0) return null;

    return (
        <div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-amber-400 capitalize">{label}</h3>
            <p className="text-blue-50">{content}</p>
        </div>
    )
}

const FeedbackSectionAsArray = ({ label, content }: { label: string, content: string[] }) => {
    if (!content || content.length === 0) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-400 capitalize">{label}</h3>
            <ul 
                className="list-disc pl-4"
                // className={`list-disc pl-4 grid ${(content || []).length <= 2 ? `grid-cols-${(content || []).length.toString()}` : "grid-cols-2"} gap-4`}
            >
                {content.map((item, index) => (
                    <li key={index} className="text-blue-50">{item}</li>
                ))}
            </ul>
        </div>
    )
}