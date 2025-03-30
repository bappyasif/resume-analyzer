import { useState, useEffect } from 'react';
import { RobertaTokenizer, RobertaModel } from '@huggingface/transformers';

export const ResumeEntityRecognizer = () => {
  const [resume, setResume] = useState('');
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const tokenizer = new RobertaTokenizer('roberta-base');
    const model = new RobertaModel('roberta-base');

    const recognizeEntities = async () => {
      const inputs = tokenizer.encode(resume, { addSpecialTokens: true });
      const outputs = await model(inputs);
      const entities = outputs[0].entities;
      setEntities(entities);
    };

    recognizeEntities();
  }, [resume]);

  const handleResumeChange = (event) => {
    setResume(event.target.value);
  };

  return (
    <div>
      <h1>Resume Entity Recognizer</h1>
      <textarea value={resume} onChange={handleResumeChange} />
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>{entity.text}</li>
        ))}
      </ul>
    </div>
  );
};