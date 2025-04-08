import { useState } from "react";
import { extractEntities } from "~/utils/entityRecognition";

interface Entity {
    word: string;
    entity: string;
  }

export const ClassifierDemo = ({ resumeText }: { resumeText: string }) => {
    const [entities, setEntities] = useState<Entity[]>([]);

  const handleAnalyze = async () => {
    const extractedEntities = await extractEntities(resumeText);
    setEntities(extractedEntities);
  };

  return (
    <div>
      <h1>Resume Analyzer</h1>
      <p>Resume Text:</p>
      {/* <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} /> */}
      <button onClick={handleAnalyze}>Analyze</button>
      <ul>
        {entities.map((entity, index) => (
          <li key={index}>
            <strong>Word:</strong> {entity.word}
            <br />
            <strong>Entity:</strong> {entity.entity}
          </li>
        ))}
      </ul>
    </div>
  );
}