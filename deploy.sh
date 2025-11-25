#!/usr/bin/env bash
set -euo pipefail

# Deploys latest master to webgo. This will prompt for the webgo password.
ssh web31@s318.goserver.host "cd ~/www && git pull origin master"
