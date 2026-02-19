// OpenAI API Types
export interface ChatCompletionMessage {
  role: "system" | "developer" | "user" | "assistant" | "tool";
  content: string | ChatCompletionContent[] | null;
  name?: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

// DuckDuckGo ready type
export interface DuckChatCompletionMessage {
  role: "system" | "developer" | "user" | "assistant" | "tool";
  content: string | DuckChatCompletionContent[] | null;
  name?: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

// image support
// open ai standard
// [0]: {text: string, type: "text"}
// [1]: {image_url: { url: string }, type: "image_url"}
export interface ChatCompletionContent {
  text?: string;
  image_url?: {
    url: string;
  };
  type: "text" | "image_url";
}

// what duckduckgo accepts
// [0]: {text: string, type: "text"}
// [1]: {image: string, mimeType: string, type: "image"}
export interface DuckChatCompletionContent {
  text?: string;
  image?: string;
  mimeType?: string;
  type: "text" | "image";
}

export interface FunctionDefinition {
  name: string;
  description?: string;
  parameters?: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ToolDefinition {
  type: "function";
  function: FunctionDefinition;
}

export interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export type ToolChoice =
  | "none"
  | "auto"
  | "required"
  | { type: "function"; function: { name: string } };

export interface ChatCompletionRequest {
  model: string;
  messages: ChatCompletionMessage[];
  metadata?: DuckAIMetadata;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string | string[];
  tools?: ToolDefinition[];
  tool_choice?: ToolChoice;
}

export interface ChatCompletionChoice {
  index: number;
  message: ChatCompletionMessage;
  finish_reason: "stop" | "length" | "content_filter" | "tool_calls" | null;
}

export interface ChatCompletionResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatCompletionStreamChoice {
  index: number;
  delta: {
    role?: "assistant";
    content?: string;
    tool_calls?: ToolCall[];
  };
  finish_reason: "stop" | "length" | "content_filter" | "tool_calls" | null;
}

export interface ChatCompletionStreamResponse {
  id: string;
  object: "chat.completion.chunk";
  created: number;
  model: string;
  choices: ChatCompletionStreamChoice[];
}

export interface Model {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
}

export interface ModelsResponse {
  object: "list";
  data: Model[];
}

// Duck.ai specific types
export interface VQDResponse {
  vqd: string;
  hash: string;
}

export interface DuckAIMetadata {
  customization: {
    additionalInstructions: string;
    shouldSeekClarity: boolean;
  };
  toolChoice: {
    NewsSearch: boolean;
    VideosSearch: boolean;
    LocalSearch: boolean;
    WeatherForecast: boolean;
  };
}

export interface DuckAIRequest {
  model: string;
  messages: DuckChatCompletionMessage[];
  metadata?: DuckAIMetadata;
}
