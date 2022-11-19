import { DefaultSession } from "next-auth";

export interface Prompt {
  description: string;
  gpt3Prefix: string;
  placeholder: string;
  outputLimit: number;
  charLimit: number;
}

export interface PromptSet {
  prompts: Array<Prompt>;
}

export interface Subject {
  name: string;
  subjectPrefix: string;
}

export interface SubjectSelectorProps {
  subjects: Array<Subject> | null;
  setSelectedSubject: React.Dispatch<React.SetStateAction<Subject | null>>;
}

export interface PromptGeneratorProps {
  prompts: Array<Prompt> | null;
  selectedPrompt: Prompt | null;
  setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
}

export interface QueryInputProps {
  query: string;
  charCount: number;
  selectedPrompt: Prompt | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleQueryChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
  handleClear: (e: React.FormEvent) => void;
  history: Array<Array<string>>;
}

interface SubjectedSelectedAdditionalProps {
  history: Array<Array<string>>;
  selectedSubject: Subject | null;
  setSelectedSubject: React.Dispatch<React.SetStateAction<Subject | null>>;
  handleClear: (e: React.FormEvent) => void;
}

export type SubjectSelectedInterfaceProps = Omit<
  QueryInputProps,
  "selectedPrompt"
> &
  PromptGeneratorProps &
  SubjectedSelectedAdditionalProps & { selectedPrompt: Prompt | null };

export interface promptContextValue {
  balance: number;
  quota: number;
  name: string;
}

export interface NavbarProps {
  route: string;
}
