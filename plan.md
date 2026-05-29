# Plan: Rename master branch to main

## Context
The default branch is currently `master`, but GitHub defaults to `main`. The workflow file already references `main`, so renaming the branch will make everything consistent.

## Changes

### 1. Rename local branch
- `git branch -m master main`

### 2. Push new branch to remote
- `git push origin main`

### 3. Update remote HEAD reference
- `git remote set-head origin main`

### 4. Delete old master branch from remote
- `git push origin --delete master`

## Files to Modify
- `.github/workflows/release.yml` - Already references `main`, no changes needed

## Verification
- Check `git branch -a` shows only `main`
- Verify remote default branch is `main` on GitHub
