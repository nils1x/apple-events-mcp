/**
 * server/prompts.ts
 * Central registry for MCP prompts and their runtime helpers
 */
import type { PromptMetadata, PromptName, PromptResponse, PromptTemplate } from '../types/prompts.js';
export declare const PROMPT_LIST: PromptMetadata[];
export declare const getPromptDefinition: (name: string) => PromptTemplate<PromptName> | undefined;
export declare const buildPromptResponse: <Name extends PromptName>(template: PromptTemplate<Name>, rawArgs: Record<string, unknown> | null | undefined) => PromptResponse;
