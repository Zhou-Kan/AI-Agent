export interface Message {
  role: "user" | "assistant";
  content: string;
  time: Date;
}

export type SuggestionList = string[];