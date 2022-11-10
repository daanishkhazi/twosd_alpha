export interface Prompt {
    description: string;
    gpt3_prefix: string;
    placeholder_text: string;
    output_limit: number;
    char_limit: number;
}

export interface PromptSet {
    prompts: Array<Prompt>
}

export interface Subject {
    name: string;
    subject_prefix: string;
}

export interface PromptSet {
    prompts: Array<Prompt>
}

export interface Subject {
    name: string;
    subject_prefix: string;
}