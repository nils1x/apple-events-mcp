import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { cliCall } from '../../utils/cliExecutor.js';
import { OBSIDIAN } from '../../utils/constants.js';
function assertInsideVault(resolved) {
    const rel = relative(OBSIDIAN.VAULT_PATH, resolved);
    if (rel.startsWith('..') || resolve(rel) === rel) {
        throw new Error('Path escapes vault');
    }
}
function textResult(text) {
    return { content: [{ type: 'text', text }] };
}
function errorResult(text) {
    return { content: [{ type: 'text', text }], isError: true };
}
export async function handleObsidianRead({ path: notePath, }) {
    const resolved = resolve(OBSIDIAN.VAULT_PATH, notePath);
    assertInsideVault(resolved);
    try {
        const result = await cliCall([
            '--action',
            'obsidian-read',
            '--root',
            OBSIDIAN.VAULT_PATH,
            '--path',
            notePath,
        ]);
        return textResult(result.content);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes('Note not found')) {
            return errorResult(`Note not found: ${notePath}`);
        }
        throw err;
    }
}
export async function handleObsidianSearch({ query, folder, maxResults, }) {
    const searchRoot = folder
        ? resolve(OBSIDIAN.VAULT_PATH, folder)
        : OBSIDIAN.VAULT_PATH;
    assertInsideVault(searchRoot);
    const limit = maxResults ?? OBSIDIAN.SEARCH_MAX_RESULTS;
    try {
        const results = await cliCall([
            '--action',
            'obsidian-search',
            '--root',
            searchRoot,
            '--query',
            query,
            '--max',
            String(limit),
            '--context',
            String(OBSIDIAN.SEARCH_CONTEXT_LINES),
        ]);
        if (results.length === 0) {
            return textResult('No matches found');
        }
        return textResult(JSON.stringify(results, null, 2));
    }
    catch {
        return textResult('No matches found');
    }
}
export async function handleObsidianWrite({ path: notePath, content, overwrite, }) {
    const resolved = resolve(OBSIDIAN.VAULT_PATH, notePath);
    assertInsideVault(resolved);
    if (overwrite !== true) {
        try {
            await access(resolved);
            return errorResult('Note already exists. Pass overwrite: true to replace.');
        }
        catch {
            // file does not exist, proceed
        }
    }
    await mkdir(dirname(resolved), { recursive: true });
    await writeFile(resolved, content, 'utf-8');
    return textResult(`Written: ${notePath} (${Buffer.byteLength(content)} bytes)`);
}
export async function handleObsidianDaily({ action, content, }) {
    const today = new Date();
    const dateStr = today.toLocaleDateString('sv');
    const todayPath = join(OBSIDIAN.DAILY_FOLDER, `${dateStr}.md`);
    const resolvedToday = resolve(OBSIDIAN.VAULT_PATH, todayPath);
    assertInsideVault(resolvedToday);
    if (action === 'read') {
        let todayContent;
        try {
            todayContent = await readFile(resolvedToday, 'utf-8');
        }
        catch (err) {
            if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
                todayContent = 'No daily note for today yet.';
            }
            else {
                throw err;
            }
        }
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toLocaleDateString('sv');
        const yesterdayPath = join(OBSIDIAN.DAILY_FOLDER, `${yesterdayStr}.md`);
        const resolvedYesterday = resolve(OBSIDIAN.VAULT_PATH, yesterdayPath);
        let yesterdayExists = false;
        try {
            await access(resolvedYesterday);
            yesterdayExists = true;
        }
        catch {
            // does not exist
        }
        return textResult(JSON.stringify({
            today: todayPath,
            content: todayContent,
            yesterdayPath: yesterdayExists ? yesterdayPath : null,
        }, null, 2));
    }
    if (action === 'append') {
        if (!content) {
            return errorResult('content is required for append');
        }
        await mkdir(dirname(resolvedToday), { recursive: true });
        const timestampBlock = `\n\n---\n*${today.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}*\n${content}`;
        let existingContent = '';
        try {
            existingContent = await readFile(resolvedToday, 'utf-8');
        }
        catch (err) {
            if (!(err instanceof Error && 'code' in err && err.code === 'ENOENT')) {
                throw err;
            }
        }
        await writeFile(resolvedToday, existingContent + timestampBlock, 'utf-8');
        return textResult(`Appended to ${todayPath}`);
    }
    return errorResult(`Unknown action: ${action}`);
}
//# sourceMappingURL=obsidianHandlers.js.map