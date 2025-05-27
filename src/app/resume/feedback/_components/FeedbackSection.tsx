import { useSession } from "next-auth/react";

export const FeedbackSection = ({ label, content }: { label: string, content: { [key: string]: string | string[] } }) => {
    if (!content) return null;
    if (Object.keys(content).length === 0) return null;

    const { status } = useSession();
    console.log("status", status);

    // useEffect(() => {
    //     auth().then((session) => {
    //         console.log("session", session);
    //     }).catch((error) => {
    //         console.log("error", error);
    //     })
    // }, [content]);


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", margin: "1rem 0" }}>
            <h3>{label}</h3>
            {
                status === "unauthenticated" && label !== "education" ? (
                    <p>Sign in to view feedback</p>
                ) : (
                    Object.entries(content).map(([key, value]) => {
                        if (typeof value === 'string') {
                            return <FeedbackSectionAsString key={key} label={key} content={value} />
                        } else if (Array.isArray(value)) {
                            return <FeedbackSectionAsArray key={key} label={key} content={value} />
                        } else {
                            return null;
                        }
                    })
                )
            }
        </div>
    )
}

const FeedbackSectionAsString = ({ label, content }: { label: string, content: string }) => {
    if (!content || content.length === 0) return null;

    return (
        <div>
            <h3>{label}</h3>
            <p>{content}</p>
        </div>
    )
}

const FeedbackSectionAsArray = ({ label, content }: { label: string, content: string[] }) => {
    if (!content || content.length === 0) return null;

    return (
        <div>
            <h3>{label}</h3>
            <ul>
                {content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}