# Sidescripts (Sidestream Scripts)

This repository contains a collection of [TamperMonkey](https://www.tampermonkey.net/) scripts that I use to improve my DX while working at [sidestream](https://sidestream.tech). Feel free to use any of the scripts contained inside this repository to also improve your DX!

## Scripts

### GitHub Issue / PR Slack message formatted ([View](https://github.com/zoey-kaiser/sidestream-utils/blob/main/scripts/slack-issue-pr-message.js))

Adds a small Slack button to the top of GitHub issues and pull requests. When pressed, a message that matches the PR or PD message formats is added to your clipboard to ping others in Slack on that issue or pull request. 

- Issue format: `PD: ISSUE_TITLE: https://github.com/org/repo/issues/ISSUE_ID`
- Pull Request format: `PR: PULL_REQUEST_TITLE: https://github.com/org/repo/pull/PULL_REQUEST_ID`

## Installation

1. Install [TamperMonkey](https://www.tampermonkey.net/) for your browser
   - Chrome: https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
   - Opera: https://addons.opera.com/en/extensions/details/tampermonkey-beta/
   - Edge: https://addons.opera.com/en/extensions/details/tampermonkey-beta/
   - Safari: https://apps.apple.com/us/app/tampermonkey/id1482490089
2. [Select the script](#scripts) you would like to install
3. Copy the content of the script file
4. Create a new TamperMonkey script
5. Paste the content of the selected script
6. Save and enjoy!

## Acknowledgements

Thank you to [damgen](https://github.com/damgem) for the original idea and the first script I modified and improved!
