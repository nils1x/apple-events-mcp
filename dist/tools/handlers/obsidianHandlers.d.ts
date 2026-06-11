import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
export declare function handleObsidianRead({ path: notePath, }: {
    path: string;
}): Promise<CallToolResult>;
export declare function handleObsidianSearch({ query, folder, maxResults, }: {
    query: string;
    folder?: string;
    maxResults?: number;
}): Promise<CallToolResult>;
export declare function handleObsidianWrite({ path: notePath, content, overwrite, }: {
    path: string;
    content: string;
    overwrite?: boolean;
}): Promise<CallToolResult>;
export declare function handleObsidianDaily({ action, content, }: {
    action: 'read' | 'append';
    content?: string;
}): Promise<CallToolResult>;
