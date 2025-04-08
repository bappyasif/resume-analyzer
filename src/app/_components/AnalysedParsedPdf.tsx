// import { ResumeEntityRecogniser } from "./ResumeEntityRecogniser";

import { ClassifierDemo } from "./classifierDemo";
import { ClassifierTest } from "./classifierTest";

export const AnalyzeParsedPdf = ({pdfText}: {pdfText: string}) => {
    return (
        <div>
            <div>AnalyzeParsedPdf -- {pdfText}</div>
            {/* <ResumeEntityRecogniser 
                pdfText={pdfText} 
            /> */}
            <ClassifierTest text={pdfText} />
            <ClassifierDemo resumeText={pdfText} />
        </div>
    )
};