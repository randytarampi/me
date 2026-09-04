#!/usr/bin/env bash
# Probe generated PDFs for the recurring verification triad: page counts, footer-on-page-1,
# embedded Font Awesome fonts. Ad-hoc diagnosis companion to the CI-level checks in
# `test/integration/pdf-output.js` (which assert the same properties as real tests).
#
# Usage:
#   scripts/probe-pdf.sh                      # probe all dist/*.pdf
#   scripts/probe-pdf.sh dist/a4.resume.pdf   # probe specific files
set -euo pipefail

cd "$(dirname "$0")/.."

files=("$@")
if [ ${#files[@]} -eq 0 ]; then
    files=(dist/*.pdf)
    if [ ! -e "${files[0]}" ]; then
        echo "no PDFs in dist/ — run \`yarn lerna run job-applications\` from the repo root first" >&2
        exit 2
    fi
fi

fail=0
for pdf in "${files[@]}"; do
    pages=$(pdfinfo "$pdf" 2>/dev/null | grep -i '^Pages' | awk '{print $2}')
    fa=$(pdffonts "$pdf" 2>/dev/null | grep -ci fontawesome || true)
    footer_kind=""
    if pdftotext -f 1 -l 1 "$pdf" - 2>/dev/null | grep -q "randytarampi.ca/resume"; then
        footer_kind="resume"
    elif pdftotext -f 1 -l 1 "$pdf" - 2>/dev/null | grep -q "randytarampi.ca/letter"; then
        footer_kind="letter"
    fi
    status="OK"
    if [ "$pages" != "1" ] || [ "$fa" -eq 0 ] || [ -z "$footer_kind" ]; then
        status="FAIL"
        fail=1
    fi
    printf "%-36s pages=%s fa-fonts=%s footer-p1=%s %s\n" "$(basename "$pdf")" "$pages" "$fa" "${footer_kind:-missing}" "$status"
done

if [ "$fail" -ne 0 ]; then
    echo "::error::PDF probe failed — see rows marked FAIL above." >&2
    exit 1
fi
echo "all probes passed"