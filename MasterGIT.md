# GIT & GITHUB — FULL GUIDE (A TO Z)

*Zero to hero. Every command. Real examples. No fluff.*

![Laptop with code on screen](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80)
*Photo by [Christopher Gower](https://unsplash.com/@cgower) on [Unsplash](https://unsplash.com)*

---

## Table of Contents

1. [What Git Actually Is (And Why Care)](#1-what-git-actually-is)
2. [Setup & Config](#2-setup--config)
3. [Create & Clone](#3-create--clone)
4. [Stage & Commit](#4-stage--commit)
5. [Branching](#5-branching)
6. [Update & Publish (Push/Pull/Remote)](#6-update--publish)
7. [Undo Changes](#7-undo-changes)
8. [Stash](#8-stash)
9. [Useful Extras](#9-useful-extras)
10. [Full Real-World Workflow (Start to Finish)](#10-full-real-world-workflow)
11. [Bonus: Advanced Commands (A-Z territory)](#11-bonus-advanced-commands)
12. [Common Screwups & Fast Fixes](#12-common-screwups--fast-fixes)
13. [Quick Reference Table](#13-quick-reference-table)
14. [Practice Plan](#14-practice-plan)

---

## 1. What Git Actually Is

Git = version control system. Tracks every change to code, forever. Undo mistake, see who broke what, work on feature without wrecking main code — all Git job.

GitHub = website that hosts Git repos in cloud. Git ≠ GitHub. Git tool on your machine. GitHub place to store + share repos + collaborate (PRs, issues, Actions).

**Real world:** 3 devs — Riya, Sam, Alex — build app called **TaskFlow**. No Git: they'd email zip files back and forth, overwrite each other work, lose code when laptop dies. With Git: everyone work same codebase, changes tracked, nothing lost, merge safely. This guide follow TaskFlow team through whole workflow.

**Git has 4 zones, memorize this:**

```
Working Directory  →  Staging Area  →  Local Repository  →  Remote Repository
   (edit files)        (git add)        (git commit)         (git push)
```

You edit file → stage it (mark "include this") → commit it (save snapshot locally) → push it (send to GitHub).

---

## 2. Setup & Config

One-time setup. Do this first, every new machine.

### `git --version`
Check Git installed, which version.
```bash
git --version
# git version 2.45.2
```

### `git config --global user.name "Your Name"`
Tell Git who you are. Name shows on every commit you make.
```bash
git config --global user.name "Riya Sharma"
```

### `git config --global user.email "you@example.com"`
Same, for email. **Must match your GitHub account email**, or GitHub won't link commits to your profile.
```bash
git config --global user.email "riya@taskflow.dev"
```

### `git config --list`
See all current config settings.
```bash
git config --list
# user.name=Riya Sharma
# user.email=riya@taskflow.dev
```

**Real world:** Riya new laptop, day 1 job. Runs these 2 config commands once. Never again on that machine — Git remembers.

---

## 3. Create & Clone

![Terminal showing code and output](https://images.unsplash.com/photo-1774901128283-64c62117216a?auto=format&fit=crop&w=1200&q=80)
*Photo by [Bernd Dittrich](https://unsplash.com/@hdbernd) on [Unsplash](https://unsplash.com)*

### `git init`
Turns current folder into Git repo. Creates hidden `.git` folder that tracks everything.
```bash
mkdir taskflow-app
cd taskflow-app
git init
# Initialized empty Git repository in /taskflow-app/.git/
```
**Real world:** Alex start brand-new project from scratch, no existing repo. `git init` is command #1.

### `git clone <repo_url>`
Copy existing remote repo (GitHub) to your machine, full history included.
```bash
git clone https://github.com/taskflow-team/taskflow-app.git
```
**Real world:** Riya join TaskFlow team, project already exists on GitHub. She don't `init` — she `clone`. One command, full codebase + history on her laptop.

### `git status`
Shows current state: what changed, what staged, what branch you on. **Most-used command, period.** Run it constantly.
```bash
git status
# On branch main
# Changes not staged for commit:
#   modified:   app.js
```

### `git remote -v`
List remote connections (where push/pull goes), shows URLs.
```bash
git remote -v
# origin  https://github.com/taskflow-team/taskflow-app.git (fetch)
# origin  https://github.com/taskflow-team/taskflow-app.git (push)
```

---

## 4. Stage & Commit

Core loop of Git. You do this dozens of times a day.

### `git add <file>`
Stage one specific file — mark it "ready to commit."
```bash
git add login.js
```

### `git add .`
Stage everything changed in current folder + subfolders. Fastest, most common way.
```bash
git add .
```

### `git commit -m "message"`
Save staged changes as permanent snapshot in history, with message explaining what/why.
```bash
git commit -m "Add user login validation"
```
Good message = short, present tense, explains *why* not just *what*. `"Fix bug"` bad. `"Fix crash when email field empty"` good.

### `git commit -am "message"`
Combo move: stage all **already-tracked** files (skips new/untracked files) + commit, one shot.
```bash
git commit -am "Fix typo in header"
```

**Real world:** Sam fixing login bug. Edits `login.js`, runs `git status` (sees it modified), `git add login.js`, `git commit -m "Fix login redirect loop"`. Snapshot saved locally. Repeat this cycle constantly — small, frequent commits, not one giant commit at end of week.

---

## 5. Branching

Branch = parallel copy of code, isolated from main. Build feature, break nothing on main, merge when ready.

![Two developers working together on laptop](https://images.unsplash.com/photo-1637073849667-91120a924221?auto=format&fit=crop&w=1200&q=80)
*Photo by [Flipsnack](https://unsplash.com/@flipsnack) on [Unsplash](https://unsplash.com)*

### `git branch`
List all local branches. Current one marked with `*`.
```bash
git branch
# * main
#   feature-login
```

### `git branch <branch_name>`
Create new branch (doesn't switch to it).
```bash
git branch feature-dark-mode
```

### `git checkout <branch_name>`
Switch to existing branch.
```bash
git checkout feature-dark-mode
```

### `git checkout -b <branch_name>`
Create + switch in one command. **Use this 95% of time**, not the two-step version above.
```bash
git checkout -b feature-dark-mode
# Switched to a new branch 'feature-dark-mode'
```
*(Newer Git also has `git switch -c <name>` — same job, newer syntax.)*

### `git merge <branch_name>`
Combine another branch's history into your **current** branch.
```bash
git checkout main
git merge feature-dark-mode
```

**Real world:** Alex assigned "dark mode" feature. Never touch `main` directly — that'd risk breaking production. Instead:
```bash
git checkout main
git pull origin main              # get latest first
git checkout -b feature-dark-mode # own isolated branch
# ...edit files, add, commit...
git push -u origin feature-dark-mode
# open Pull Request on GitHub, team reviews, then merge
```
This is **the** standard pattern. Never skip it on a team.

---

## 6. Update & Publish

Moving code between your machine and GitHub.

### `git pull origin <branch_name>`
Download + merge latest changes from remote branch into your current branch.
```bash
git pull origin main
```

### `git push origin <branch_name>`
Upload your commits to remote branch.
```bash
git push origin feature-dark-mode
```

### `git push -u origin <branch_name>`
Same as push, but also **links** local branch to remote branch (`-u` = set upstream). Do this once per new branch — after that, plain `git push` works.
```bash
git push -u origin feature-dark-mode
# next time: just "git push"
```

### `git fetch`
Download latest remote data **without** merging into your files. Safe way to peek at what changed before pulling.
```bash
git fetch origin
```

### `git log`
Show commit history: who, when, what message.
```bash
git log
# commit a1b2c3d (HEAD -> main)
# Author: Riya Sharma <riya@taskflow.dev>
# Date:   Mon Jul 13 10:15:00 2026
#     Add user login validation
```

**Real world:** Riya start work Monday morning. First move, always: `git pull origin main` — sync latest teammates' work before touching anything. End of day: `git push` her branch so nothing lives only on her laptop.

---

## 7. Undo Changes

![Server rack in data center](https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=80)
*Photo by [Kevin Ache](https://unsplash.com/@kevinache) on [Unsplash](https://unsplash.com)*

Mistakes happen. Git got layered undo tools — pick right one for right situation.

### `git restore <file>`
Discard uncommitted changes in one file — revert to last commit version. **Destructive, no undo.**
```bash
git restore app.js
```

### `git restore .`
Discard **all** uncommitted changes in working directory.
```bash
git restore .
```

### `git reset --soft HEAD^`
Undo last commit, but **keep changes staged**. Good when commit message wrong or you want to combine with next commit.
```bash
git reset --soft HEAD^
```

### `git reset --hard HEAD^`
Undo last commit **and delete the changes completely**. Nuclear option — changes gone for good.
```bash
git reset --hard HEAD^
```

### `git revert <commit_id>`
Create a **new** commit that undoes an old commit's changes. History stays intact (nothing deleted) — safest way to undo something already pushed/shared with team.
```bash
git revert a1b2c3d
```

**Real world:** Sam pushes commit Friday, breaks production Monday. Since teammates already pulled that commit, Sam can't rewrite history (`reset`) without chaos. Correct move: `git revert a1b2c3d` — adds new commit canceling the bad one, history stays clean and honest. `reset --hard` only safe for commits **nobody else has**.

---

## 8. Stash

Save uncommitted work temporarily without committing — like a clipboard for your changes.

### `git stash`
Shelve current uncommitted changes, return working directory to clean state.
```bash
git stash
```

### `git stash list`
See all stashed sets.
```bash
git stash list
# stash@{0}: WIP on feature-login: a1b2c3d Add validation
```

### `git stash pop`
Reapply most recent stash **and remove it** from stash list.
```bash
git stash pop
```

### `git stash apply`
Reapply most recent stash but **keep it** in stash list (can apply again elsewhere).
```bash
git stash apply
```

### `git stash drop`
Delete a stash without applying it.
```bash
git stash drop
```

**Real world:** Riya mid-way editing `dashboard.js`, feature half-done. Urgent bug ticket comes in, needs `main` branch **right now**, can't commit broken half-finished code. She runs `git stash`, switches branch, fixes bug, switches back, runs `git stash pop` — her half-done work reappears exactly where she left it.

---

## 9. Useful Extras

### `git diff`
Show line-by-line changes **not yet staged**.
```bash
git diff
```

### `git diff --staged`
Show changes that **are** staged (about to be committed).
```bash
git diff --staged
```

### `git show <commit_id>`
Show full details + diff of one specific commit.
```bash
git show a1b2c3d
```

### `git clean -fd`
Delete untracked files + folders from working directory. `-f` = force, `-d` = include directories. **Destructive** — run `git clean -nd` first (dry run) to preview.
```bash
git clean -nd     # preview first
git clean -fd      # then actually delete
```

### `git rm --cached <file>`
Stop tracking a file (Git forgets it) **without deleting it from disk**. Common after accidentally committing something that should've been in `.gitignore`.
```bash
git rm --cached .env
```

**Real world:** Alex accidentally commits `.env` file holding API secret keys. Fix: add `.env` to `.gitignore`, then `git rm --cached .env` to untrack it going forward (old commits still have it — see rebase/BFG note in Bonus section for scrubbing history).

---

## 10. Full Real-World Workflow

Putting it together. Day in the life, TaskFlow team, building a login feature end-to-end.

```bash
# 1. Sync latest main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature-login-validation

# 3. Work: edit files, check status often
git status
git diff

# 4. Stage + commit in small logical chunks
git add login.js
git commit -m "Add email format validation"
git add login.test.js
git commit -m "Add tests for email validation"

# 5. Keep branch synced with main during long work
git checkout main
git pull origin main
git checkout feature-login-validation
git merge main          # bring in latest main, resolve conflicts if any

# 6. Push branch, open Pull Request on GitHub
git push -u origin feature-login-validation

# 7. Team reviews PR on GitHub, requests changes
git add login.js
git commit -m "Address review: extract regex to constant"
git push               # -u already set, plain push works now

# 8. PR approved + merged on GitHub (usually via web UI, "Squash and Merge")

# 9. Clean up locally
git checkout main
git pull origin main
git branch -d feature-login-validation    # delete merged branch locally
```

That 9-step loop **is** professional Git workflow. Master this, you're 90% done learning Git.

---

## 11. Bonus: Advanced Commands (A-Z Territory)

Cheat sheet stops at basics. Real projects need these too.

### `.gitignore` file
Plain text file listing what Git should **never** track — secrets, build folders, OS junk files.
```
# .gitignore
node_modules/
.env
*.log
dist/
.DS_Store
```
**Real world:** Every project, day 1, before first commit — create `.gitignore`. Saves you from committing gigabytes of `node_modules` or leaking API keys.

### `git log --oneline --graph --all`
Visual branch history in terminal — one line per commit, ASCII graph of branch/merge shape.
```bash
git log --oneline --graph --all
# * a1b2c3d (HEAD -> main) Merge feature-login
# |\
# | * f4e5d6c Add email validation
# |/
# * 9876543 Initial commit
```

### `git tag`
Mark specific commit as a release point (v1.0, v2.1, etc). Doesn't move like a branch does.
```bash
git tag v1.0.0
git push origin v1.0.0
```
**Real world:** TaskFlow ships version 1.0 to production. Team tags that exact commit `v1.0.0` — six months later, instantly checkout exactly what shipped that day.

### `git rebase <branch>`
Replay your commits on top of another branch's latest commits — rewrites history into a straight line, no merge-bubble commit. Cleaner history, but **never rebase commits already pushed/shared** — rewrites history, breaks teammates' copies.
```bash
git checkout feature-login
git rebase main
```

### `git cherry-pick <commit_id>`
Copy **one specific commit** from another branch onto your current branch, without merging everything else.
```bash
git cherry-pick a1b2c3d
```
**Real world:** Critical security fix committed on `develop` branch. Production `main` branch needs *just that fix*, nothing else from `develop`. `git cherry-pick` grabs only that one commit.

### `git blame <file>`
Shows who last modified each line of a file, and in which commit. Great for "why does this weird line exist" archaeology.
```bash
git blame login.js
```

### `git bisect`
Binary-search through commit history to find **exactly which commit** introduced a bug. You mark a "good" and "bad" commit, Git checks out commits in between, you test + mark good/bad, repeats until it pinpoints the culprit.
```bash
git bisect start
git bisect bad                # current commit is broken
git bisect good v1.0.0         # this old tag was fine
# Git checks out a midpoint commit — you test it:
git bisect good   # or: git bisect bad
# ...repeats until exact breaking commit found
git bisect reset
```

### `git submodule`
Embed one Git repo inside another — e.g., a shared component library used by multiple projects.
```bash
git submodule add https://github.com/taskflow-team/shared-ui.git libs/shared-ui
```

### Git aliases
Shortcuts for long commands, saved in config.
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.cm "commit -m"
# now: git st  instead of  git status
```

### Git hooks
Scripts that auto-run at specific Git events (before commit, before push, etc). Live in `.git/hooks/`. Common use: run tests or linter before allowing a commit.

### SSH keys for GitHub
Password-free, secure way to push/pull. Generate once per machine:
```bash
ssh-keygen -t ed25519 -C "riya@taskflow.dev"
cat ~/.ssh/id_ed25519.pub
# paste output into GitHub → Settings → SSH and GPG keys
```
Then clone using SSH URL instead of HTTPS:
```bash
git clone git@github.com:taskflow-team/taskflow-app.git
```

### Fork & Pull Request (open-source workflow)
On someone else's project you don't have write access to:
1. Click **Fork** on GitHub — copies repo to your account.
2. `git clone` your fork.
3. Create branch, make changes, commit, push to **your fork**.
4. Open Pull Request from your fork → original repo.
5. Maintainer reviews, merges (or requests changes).

**Real world:** Sam wants to fix a typo in a popular open-source library's docs. Doesn't have write access to that repo — forks it, fixes typo on a branch, opens PR. This exact flow powers most open-source contribution on GitHub.

### Resolving merge conflicts
Happens when two branches change the **same lines**. Git can't auto-decide, marks it:
```
<<<<<<< HEAD
const timeout = 3000;
=======
const timeout = 5000;
>>>>>>> feature-branch
```
You manually edit file, pick the right version (or blend both), delete the `<<<<<<<`/`=======`/`>>>>>>>` markers, then:
```bash
git add <file>
git commit
```

### `git reflog`
Log of **everywhere HEAD has pointed**, including commits `reset --hard` deleted. Safety net for "I think I just destroyed my work."
```bash
git reflog
# a1b2c3d HEAD@{0}: reset: moving to HEAD^
# f4e5d6c HEAD@{1}: commit: Add validation   ← recover this
git reset --hard f4e5d6c
```

### GitHub Actions (brief mention)
YAML files in `.github/workflows/` that auto-run on events (push, PR) — run tests, deploy, lint. Beyond Git itself, but lives right next to your repo and most real projects use it.

---

## 12. Common Screwups & Fast Fixes

| Screwup | Fix |
|---|---|
| Committed to wrong branch | `git reset --soft HEAD^`, switch branch, `git stash pop`/re-commit |
| Wrote bad commit message, not pushed yet | `git commit --amend -m "new message"` |
| Forgot to add a file to last commit, not pushed | `git add forgotten.js && git commit --amend --no-edit` |
| Merge conflict panic | Don't `git merge --abort` unless truly stuck — resolve markers manually, it's routine |
| Accidentally deleted branch | `git reflog` to find last commit hash, `git checkout -b branch-name <hash>` |
| Pushed secret/password | Remove from code + `.gitignore`, rotate the secret immediately (assume it's compromised — history still has it until history rewritten) |

---

## 13. Quick Reference Table

| Category | Command |
|---|---|
| Setup | `git config --global user.name/email` |
| Start | `git init` / `git clone <url>` |
| Check | `git status` / `git diff` / `git log` |
| Stage | `git add <file>` / `git add .` |
| Save | `git commit -m "msg"` |
| Branch | `git checkout -b <name>` / `git merge <name>` |
| Sync | `git pull origin <branch>` / `git push origin <branch>` |
| Undo | `git restore <file>` / `git reset --soft HEAD^` / `git revert <id>` |
| Shelve | `git stash` / `git stash pop` |
| Advanced | `git rebase` / `git cherry-pick` / `git tag` / `git bisect` |

---

## 14. Practice Plan

Reading ≠ learning. Build muscle memory:

1. **Week 1:** `init` a throwaway repo, do 20 commits on random text file changes. Get `add`/`commit`/`status`/`log` into your fingers.
2. **Week 2:** Create 3 branches, merge them into `main`, force a merge conflict on purpose, resolve it.
3. **Week 3:** Push a real small project to GitHub, open a Pull Request against your own repo, merge it via GitHub UI.
4. **Week 4:** Fork someone else's small open-source repo, fix a typo, open your first real PR.
5. **Ongoing:** Every project after this, no exceptions — Git from commit #1, small frequent commits, always work on branches.

Practice daily. Build projects. Ship code. 🚀

---

### Image Credits
All photos via [Unsplash](https://unsplash.com), free license:
- [Christopher Gower](https://unsplash.com/@cgower)
- [Bernd Dittrich](https://unsplash.com/@hdbernd)
- [Flipsnack](https://unsplash.com/@flipsnack)
- [Kevin Ache](https://unsplash.com/@kevinache)