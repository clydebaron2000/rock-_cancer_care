#!/bin/bash
# TODO complete
PARENT_PATH="$(dirname $(realpath $0))"

function main {
    # cp -r * ../../cyruscapitalfund/client/
    tar cf - --exclude=node_modules . | (cd ../../cyruscapitalfund/client && tar xvf - )
}
main "$@"