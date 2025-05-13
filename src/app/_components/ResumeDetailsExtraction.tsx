import React, { useEffect } from 'react'
import { api } from '~/trpc/react';

export const ResumeDetailsExtraction = ({pdfText}: {pdfText: string}) => {
    const {mutate, data} = api.resume.extractDetails.useMutation({
        onSuccess: (data) => {
            console.log("data extraction is complete", data, data?.output);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    useEffect(() => {
        if (pdfText) {
            mutate({text: pdfText, role: "Full Stack Developer"});
            // feedbackMutate({text: pdfText, role: "Full Stack Developer"});
        }
    }, [pdfText]);
   
    // console.log("data", data);

    // const Data = data?.output;
    // console.log("Data", Data);

    
    return (
        <div>
        <h3>Extracted Details (via tRPC):</h3>
        {data ? (
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <p>Name: {data?.name}</p>
                <p>Email: {data?.email}</p>
                <p>Phone: {data?.phone}</p>
                
                <div>
                    <p>Experience</p>
                    {
                    data?.experience?.map((exp: any, index: number) => (
                        <div key={index} style={{marginBottom: "1rem"}}>
                            <p>Position: {exp.title}</p>
                            <p>Company: {exp.company}</p>
                            <p>Start Date: {exp.dates}</p>
                            <p>Description: {exp.responsibilities}</p>
                        </div>

                    ))
                }
                </div>

                <div style={{marginBottom: "1rem"}}>
                    <p>Certifications:  </p>
                    {
                    data?.certifications?.map((cert: any, index: number) => (
                        <DisplayText text={cert} key={index} />
                    ))
                }
                </div>

                <div style={{marginBottom: "1rem"}}>
                    <p>Skills</p>
                    {
                        data?.skills?.map((skill: any, index: number) => (
                            <DisplayText text={skill} key={index} />
                        ))
                    }
                </div>
                {/* <p>Summary: {Data?.summary}</p>
                <p>Experience: {Data?.experience}</p>
                <p>Skills: {Data?.skills}</p>
                <p>Education: {Data?.education}</p>
                <p>Projects: {Data?.projects}</p>
                <p>Certifications: {Data?.certifications}</p>
                <p>Languages: {Data?.languages}</p>
                <p>Interests: {Data?.interests}</p>
                <p>References: {Data?.references}</p> */}
                </div>
        ) : (
            <p>No details extracted yet or extraction in progress.</p>
        )}
        {/* Optionally, add a button to re-trigger if needed, though useEffect handles initial load */}
        {/* <button onClick={handleExtractDetails} disabled={extractMutation.isPending}>
            {extractMutation.isPending ? 'Extracting...' : 'Re-Extract Details'}
        </button> */}
    </div>
    )
}

const DisplayText = ({text}: {text: string}) => {
    return (
        <div>{text}</div>
    )
}

// export const ResumeDetailsExtraction = ({pdfText}: {pdfText: string}) => {
//     const [data, setData] = React.useState<any | null>(null);

//     // const fetchResumeDetails = async () => {
//     //     try {
//     //         const data = await fetch('http://localhost:3001/resume-gemini', { method: 'POST', body: JSON.stringify({ text: pdfText, role: "Full Stack Developer" }) }).then(response => response.json())
//     //         setData(data);
//     //     } catch (error) {
//     //         console.error('Error fetching resume details:', error);
//     //     }
//     // };

//     const fetchResumeDetails = async () => {
//         try {
//     const response = await fetch('http://localhost:3001/resume-gemini', { // Adjust endpoint
//       method: 'POST', // Or PUT, PATCH
//       headers: {
//         'Content-Type': 'application/json', // <-- Important!
//       },
//       body: JSON.stringify({ text: pdfText, role: "Full Stack Developer" }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json(); // Or response.text()
//       console.error('Error from server:', errorData);
//       // Handle error appropriately
//       return;
//     }

//     const result = await response.json();
//     console.log('Success:', result);
//     // Handle success
//   } catch (error) {
//     console.error('Network error or other issue:', error);
//     // Handle network error
//   }
//     }
            

//     useEffect(() => {
//         if (pdfText) {
//             fetchResumeDetails();
//         }
//     }, [pdfText]);
//   return (
//     <div>ResumeDetailsExtraction {JSON.stringify(data)}</div>
//   )
// }
