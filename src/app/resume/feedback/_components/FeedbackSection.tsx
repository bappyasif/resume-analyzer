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

    // console.log(data, "data!!");

    // console.log((data || []).length, "data length", label);

    return (
        <div className="my-4 rounded-md shadow-md gap-2" style={{ display: "flex", flexDirection: "column" }}>
            <h3 
                // className="font-bold text-3xl text-blue-200 uppercase"
                className="font-bold text-3xl uppercase"
            >{label}</h3>
            {/* {
                label === "ats_score" || label === "ats" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-transparent rounded-md shadow-md">
                            <h3 className="text-xl font-bold text-amber-400 capitalize">Before</h3>
                            <p className="text-blue-50">{content?.before}</p>
                        </div>
                        <div className="p-4 bg-transparent rounded-md shadow-md">
                            <h3 className="text-xl font-bold text-amber-400 capitalize">After</h3>
                            <p className="text-blue-50">{content?.after}</p>
                        </div>
                    </div>
                )
            } */}
            {
                label === "ats_score" || label === "ats" && (
                    <div className="p-4 bg-transparent rounded-md shadow-md">
                        <h3 
                            // className="text-xl font-bold text-amber-400 capitalize"
                            className="text-xl font-bold capitalize text-sidebar-primary"
                        >Before improvements</h3>
                        <p 
                            // className="text-blue-50"
                        >{content?.before} / 10</p>
                    </div>
                )
            }
            {
                status === "unauthenticated" && label !== "education" ? (
                    <p className="text-center text-lg text-gray-600">Sign in to view feedback</p>
                ) : (
                    <div
                        // className={`grid ${data?.length > 2 ? "grid-cols-3" : data?.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-4`}
                        // className={`grid ${(data || []).length <= 4 ? `grid-cols-${(data || []).length.toString()}` : "grid-cols-4"} gap-10`}
                        className={`grid ${((data || []).length <= 4 && !label.includes("ats")) ? `grid-cols-${(data || []).length.toString()}` : label.includes("ats") ? "grid-cols-2" : "grid-cols-4"} gap-2`}
                    >
                        {
                            data.map(([key, value]) => {
                                if (typeof value === 'string') {
                                    return <FeedbackSectionAsString key={key} label={key} content={value} />
                                } else if (Array.isArray(value)) {
                                    // console.log(value, "value>><<");
                                    return <FeedbackSectionAsArray key={key} label={key} content={value} />
                                }
                                // else if (typeof value === 'object') {
                                //     for(let key in value as any) {
                                //         if (typeof value[key] === 'string') {
                                //             return <FeedbackSectionAsString key={key} label={key} content={value[key]} />
                                //         } else if (Array.isArray(value[key])) {
                                //             return <FeedbackSectionAsArray key={key} label={key} content={value[key]} />
                                //         }
                                //     }
                                //     // const {} = value;
                                //     console.log(value, "value>>><><><<><>", typeof value);
                                // }                                 
                                else {
                                    return null;
                                }
                            })
                        }
                    </div>
                )
            }
            {/* {
                label === "ats_score" || label === "ats" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-transparent rounded-md shadow-md">
                            <h3 className="text-xl font-bold text-amber-400 capitalize">Before</h3>
                            <p className="text-blue-50">{content?.before}</p>
                        </div>
                        <div className="p-4 bg-transparent rounded-md shadow-md">
                            <h3 className="text-xl font-bold text-amber-400 capitalize">After</h3>
                            <p className="text-blue-50">{content?.after}</p>
                        </div>
                    </div>
                )
            } */}
            {
                label === "ats_score" || label === "ats" && (
                    <div className="p-4 bg-transparent rounded-md shadow-md">
                        <h3 
                            // className="text-xl font-bold text-amber-400 capitalize"
                            className="text-xl font-bold text-sidebar-primary capitalize"
                        >After improvements</h3>
                        <p 
                            // className="text-blue-50"
                        >{content?.after} / 10</p>
                    </div>
                )
            }
        </div>
    )
}

const FeedbackSectionAsString = ({ label, content }: { label: string, content: string }) => {
    if (!content || content.length === 0) return null;

    // label === "ats_score" && console.log(content, "content");

    return (
        <div className="p-4 bg-transparent rounded-md shadow-md space-y-2">
            <h3 
                // className="text-xl font-bold text-amber-400 capitalize"
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
                // className="text-lg font-semibold text-amber-400 capitalize"
                className="text-lg font-semibold text-sidebar-primary capitalize"
            >{label}</h3>
            <ul
                className="list-disc pl-4"
            // className={`list-disc pl-4 grid ${(content || []).length <= 2 ? `grid-cols-${(content || []).length.toString()}` : "grid-cols-2"} gap-4`}
            >
                {content.map((item, index) => (
                    <li key={index} 
                        // className="text-blue-50"
                    >{item}</li>
                ))}
            </ul>
        </div>
    )
}