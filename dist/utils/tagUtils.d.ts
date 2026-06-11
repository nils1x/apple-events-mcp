/**
 * tagUtils.ts
 * Utilities for handling tags stored in reminder notes.
 *
 * Supports two tag formats:
 * - Bracket format: [#tagname]  (written by this MCP server)
 * - Bare format:    #tagname    (used by Apple Reminders native UI)
 *
 * Writing always uses bracket format for unambiguous round-tripping.
 * Reading parses both formats so native Apple Reminders tags are recognized.
 */
/**
 * Extracts tags from notes content, supporting both [#tag] and bare #tag formats
 * @param notes - The notes string that may contain tags
 * @returns Array of tag names (without # prefix), deduplicated and lowercased
 */
export declare function extractTags(notes: string | null | undefined): string[];
/**
 * Removes tag markers from notes, returning clean content.
 * Strips both [#tag] bracket format and bare #tag format.
 * @param notes - The notes string with potential tags
 * @returns Notes content without tag markers
 */
export declare function stripTags(notes: string | null | undefined): string;
/**
 * Formats tags into the [#tag] format for storage
 * @param tags - Array of tag names (with or without # prefix)
 * @returns Formatted tag string
 */
export declare function formatTags(tags: string[]): string;
/**
 * Combines tags with notes content
 * @param tags - Array of tag names
 * @param notes - Notes content (may already have tags)
 * @returns Combined notes with tags prepended
 */
export declare function combineTagsAndNotes(tags: string[] | undefined, notes: string | undefined): string;
/**
 * Adds tags to existing notes
 * @param tagsToAdd - Tags to add
 * @param notes - Existing notes content
 * @returns Updated notes with added tags
 */
export declare function addTagsToNotes(tagsToAdd: string[], notes: string | undefined): string;
/**
 * Removes tags from existing notes
 * @param tagsToRemove - Tags to remove
 * @param notes - Existing notes content
 * @returns Updated notes with specified tags removed
 */
export declare function removeTagsFromNotes(tagsToRemove: string[], notes: string | undefined): string;
/**
 * Checks if a reminder has all specified tags
 * @param reminderTags - Tags the reminder has
 * @param filterTags - Tags to check for
 * @returns true if reminder has ALL filter tags
 */
export declare function hasAllTags(reminderTags: string[] | undefined, filterTags: string[]): boolean;
