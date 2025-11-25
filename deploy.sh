#!/usr/bin/env bash
set -euo pipefail

# Deploys latest master to webgo. This will prompt for the webgo password.
# Use fast-forward only to avoid pull strategy warnings on the server.
ssh web31@s318.goserver.host "cd ~/www && git pull --ff-only origin master"
