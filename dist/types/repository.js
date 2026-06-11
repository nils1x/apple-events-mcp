/**
 * repository.ts
 * Shared type definitions for repository layer JSON interfaces and the
 * abstract contracts the application layer is allowed to depend on.
 *
 * Domain layer rule (CLAUDE.md): interfaces are defined in the *consuming*
 * layer, not the implementation layer. The handlers / orchestration code in
 * `src/tools/handlers/` are the consumers — these interfaces live here in
 * `src/types/` so the concrete repositories in `src/utils/` formally
 * implement them rather than the handlers being coupled to the
 * implementation.
 */
export {};
//# sourceMappingURL=repository.js.map