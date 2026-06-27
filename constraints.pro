% Keep internal workspace dependencies on the workspace protocol.
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:*', DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, Range, DependencyType),
  workspace_ident(_, DependencyIdent),
  Range \= 'workspace:*'.

% Keep eslint aligned wherever a workspace declares it.
gen_enforced_dependency(WorkspaceCwd, 'eslint', '^10.5.0', DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, 'eslint', Range, DependencyType),
  Range \= '^10.5.0'.

% Keep Node engines consistent across the monorepo.
gen_enforced_field(WorkspaceCwd, 'engines', '{"node": ">=20"}') :-
  workspace(WorkspaceCwd).
