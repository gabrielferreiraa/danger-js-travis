import { fail, message, danger } from "danger";

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

function refBranchNameIsCorrect(branchName) {
  return /^(feature|bugfix|hotfix|rt|build|enhancement)\/(\S+)$/.test(
    branchName
  );
}

const refBranch = (!!danger.github && danger.github.pr.head.ref) || false;
if (refBranch && !refBranchNameIsCorrect(refBranch)) {
  fail(`The branch **${refBranch}** is out of the pattern`);
}

const merges = danger.git.commits.filter(commit => commit.message.include("Merge Master"))
if (merges.length) {
  fail("Please rebase your PR")
}
