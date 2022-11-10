export interface Prompt {
    description: string;
    gpt3Prefix: string;
    placeholder: string;
    outputLimit: number;
    charLimit: number;
}

export interface PromptSet {
    prompts: Array<Prompt>
}

export interface Subject {
    name: string;
    subjectPrefix: string;
}