#!/bin/zsh -f

function treat_function()
{
    params_str = gensub(/((.*)\()|(\)(.*))/, "", "G", $0);
    name = $0;
    return_type = ($1 == "char" || $1 == "char*") ? "string" : "number";

    gsub(/*/, "", name);
    sub(/\w+\s/, "", name);
    sub(/\(.*/, "", name);

    split(params_str, params_array, /\s*,\s*/);

    printf "return type: %s\nname: %s\narguments:\n", return_type, name;
    for (idx in params_array) {
        elem = params_array[idx];
        sub(/\s.*/, "", elem);
        elem = (elem == "char" || elem == "char*") ? "string" : "number"
        printf "\t%s\n", elem;
        params_array[idx] = elem;
    }
    print "cwrap for WebAssembly use:";
    printf "cwrap(\'%s\', \'%s\', [", name, return_type;
    for (idx in params_array) {
        if (params_array[idx + 1]) {
            printf "'%s', ", params_array[idx];
        } else {
            printf "'%s'", params_array[idx];
        }
    }
    print "])";
}

BEGIN { print "Functions" }
/\w+\s((\s|\*)*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/ { treat_function() }
END { print " - DONE -" }

# word [_*]word([word [_*]word, word [_*]word, ...])[_\n]{
# /\w+\s((\s|\*)*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/