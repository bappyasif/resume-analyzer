// import { ResumeEntityRecogniser } from "./ResumeEntityRecogniser";
import { ClassifierTest } from "./classifierTest";
import NERAnalyzer from "./NerAnalyzer";
import { NerTest } from "./nerTest";

export const AnalyzeParsedPdf = ({pdfText}: {pdfText: string}) => {
    return (
        <div>
            <div>AnalyzeParsedPdf -- {pdfText}</div>
            {/* <ResumeEntityRecogniser 
                pdfText={pdfText} 
            /> */}
            {/* <ClassifierTest text={pdfText} /> */}
            {/* <ClassifierDemo resumeText={pdfText} /> */}
            {/* <NerTest parsedText={pdfText} /> */}
            <NERAnalyzer parsedText={pdfText} />
        </div>
    )
};