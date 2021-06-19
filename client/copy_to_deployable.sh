#!/bin/bash
# TODO complete
PARENT_PATH="$(dirname $(realpath $0))"

function main {
    cp -r * ../../rock_cancer_care/client/
}
main "$@"