#!/bin/bash
# TODO complete
PARENT_PATH="$(dirname $(realpath $0))"

function main {
    # cp -r * ../../rock_cancer_care/client/
    tar cf - --exclude=node_modules . | (cd ../../rock_cancer_care/client && tar xvf - )
}
main "$@"