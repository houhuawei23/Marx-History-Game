#!/bin/bash
cd "$(dirname "$0")/.."
python3 -m http.server 8000&
xdg-open "http://127.0.0.1:8000" >/dev/null 2>&1
