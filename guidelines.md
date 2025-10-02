# Project Guidelines

These guidelines document the core engineering practices established in this project so far. Use them as the default approach for new code and when refactoring existing code.

## Stack and Architecture

- Angular 20 with standalone components (no NgModules)
- State management with NgRx 20 (Actions, Reducers, Selectors, Effects)
- UI Libraries: Angular Material, Bootstrap 5, PrimeNG (Chart)
- Testing: Jest + jest-preset-angular, snapshot testing

## Angular component practices

- Standalone components only
  - Import dependencies via the `imports: []` array in the `@Component` metadata
  - Do NOT declare standalone components in testing `declarations` — import them instead
- Prefer `inject()` for DI over constructor injection for services and Angular utilities
- Prefer signals-based inputs for strict typing
  - Example: `readonly dialogRef = input.required<MatDialogRef<MyDialog>>()`
  - In tests, set inputs with: `fixture.componentRef.setInput('dialogRef', signal(mockRef))`
- Use Angular’s rxjs-interop for cleanup
  - Prefer `takeUntilDestroyed(DestroyRef)` over manual `Subject` with `OnDestroy`
- Encapsulate view logic with small private helpers
  - Example patterns used: `parseDate`, `sortEntriesByDate`, `createChartData`, `createChartOptions`
- Centralize constants (labels, colors, dimensions) into readonly config objects for clarity and reuse
- Prefer `ChangeDetectionStrategy.OnPush` for components to optimize rendering and reduce unnecessary change detection cycles
- Use `trackBy` functions (e.g., `trackById`) in `@for` loops to improve list rendering performance
- Always use Angular's control flow blocks (`@for`, `@if`, etc.) in templates for clarity, performance, and future compatibility

## UI and Responsiveness

- Bootstrap grid for layout consistency
- Responsive text labels
- Prefer uniform padding and spacing utilities to keep cards and buttons visually consistent
- Use Material components (e.g., `mat-paginator`) where appropriate for accessibility and consistency

## Dialogs

- Open dialogs via `MatDialog` with strong typing for the component
- Keep dialog animations predictable for tests and UX (0ms in this project)
- Keep dialog content focused — larger UIs live in dedicated standalone components injected into dialogs

## NgRx patterns

- Action naming convention
  - User-facing data domain actions: `[Entry] Get Entries`, `[Entry] Get Entries Success`
  - App/system actions: `[Default] Reset app state`, `[Default] Create Entry`, `[Default] Delete Entry`, `[Default] GetFailure Error`
- Reducers
  - Defined with `createReducer`/`on`
  - Keep reducers pure and immutable; compute derived values like `nextId` inside reducers
  - Keep the feature state small and explicit (e.g., `loading`, `data`, `nextId`)
- Selectors
  - Use `createFeatureSelector` and `createSelector`
  - Expose granular selectors like `getDataState`, `getNextEntryId`
- Effects
  - Use `createEffect(() => actions$.pipe(ofType(...), switchMap(...), catchError(...)))`
  - Map HTTP success to a single success action
  - Map failures to a typed error action

## Services and HTTP

- Keep services thin and typed (e.g., `Observable<Array<Entry>>`)
- Use `HttpClientTestingModule` in tests with `HttpTestingController`
- Test success, empty, error (404) and malformed payload scenarios

## Code organization

- Keep domain-focused folders:
  - `components/` for UI (standalone components only)
  - `services/` for HTTP and shared behavior
  - `store/` for NgRx actions/reducers/selectors/effects
  - `models/` for interfaces and pure types
  - `utils/` for framework-agnostic utilities (e.g., snackbar wrapper)
- Prefer explicit file names: `*.component.ts`, `*.service.ts`, `*.effects.ts`, `*.reducers.ts`
- Barrel exports (e.g., `store/default/index.ts`) can simplify imports when useful

## TypeScript and data handling

- Prefer explicit interfaces for structured data
  - Example: chart datasets, chart options, and app state are explicitly typed
- Keep private helpers small and typed for clarity and testability
- Treat dates consistently
  - This project uses `dd-mm-yyyy` strings and a simple `parseDate` helper for ordering

## UX and accessibility

- Use Material components (paginator, dialog) for baseline a11y
- Use descriptive labels and icons; keep button labels concise on small screens
- Maintain adequate hit targets for mobile by stacking buttons (`col-12`) and full-width (`w-100`)

## When to prefer these patterns

- New UI? Create a standalone component; import Material/Bootstrap as needed
- Dialog content? Move UI into its own component and open via `MatDialog`
- Async data? Create typed service + NgRx effect; reduce to state via reducer; read via selector
- Subscriptions? Prefer `takeUntilDestroyed(DestroyRef)` in components
- Tests failing on Material/Chart? Add required providers in tests and rely on global canvas mock

---

This document reflects practices already present in the repository. Treat it as a living guideline — keep it updated as we evolve conventions and tooling.
