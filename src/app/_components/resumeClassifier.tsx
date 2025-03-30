import { BertTokenizer, BertModel, DistilBertTokenizer, DistilBertModel } from '@huggingface/transformers';
import { useEffect, useState } from "react";

// Load the model and tokenizer outside the component (only once)
let tokenizer: DistilBertTokenizer | null = null;
let model: DistilBertModel | null = null;

const loadModelAndTokenizer = async () => {
  tokenizer = await DistilBertTokenizer.from_pretrained('distilbert-base-uncased');
  model = await DistilBertModel.from_pretrained('distilbert-base-uncased');
  // model = await DistilBertModel.from_pretrained('distilbert-base-uncased');
};

export const ResumeClassifier = ({ resumeText }: { resumeText: string }) => {
  const [resume, setResume] = useState('');
  const [classification, setClassification] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the model and tokenizer when the component mounts
    loadModelAndTokenizer().then((data) => {
      setIsLoading(false);
      console.log(data, "data");
    });
  }, []);

  useEffect(() => {
    // const tokenizer = new BertTokenizer('bert-base-uncased');
    // const model = new BertModel('bert-base-uncased');

    // const classifyResume = async () => {
    //   const inputs = tokenizer.encode(resume);
    //   const outputs = await model(inputs);
    //   const classification = outputs[0].classification;
    //   setClassification(classification);
    // };

    // classifyResume();
  }, [resume]);

  const handleResumeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResume(event.target.value);
  };

  return (
    <div>
      <h1>Resume Classifier</h1>
      <textarea value={resumeText} onChange={handleResumeChange} />
      <p>Classification: {classification}</p>
    </div>
  );
};