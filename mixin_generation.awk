#!/bin/zsh -f

function treat_function()
{
    params_str = gensub(/((.*)\()|(\)(.*))/, "", "G", $0);
    name = $0;
    return_type = ($1 == "char" || $1 == "char*") ? "string" : "number";

    gsub(/*/, "", name);
    sub(/\w+\s/, "", name);
    sub(/\(.*/, "", name);
    gsub(/\s/, "", name);

    split(params_str, params_array, /\s*,\s*/);

    printf "\t\t\t\t\"%s\": Module.cwrap('%s', '%s', [", name, name, return_type;
    for (idx in params_array) {
        elem = params_array[idx];
        sub(/\s.*/, "", elem);
        elem = (elem == "char" || elem == "char*") ? "string" : "number"
        params_array[idx] = elem;
        if (params_array[idx + 1]) {
            printf "'%s', ", params_array[idx];
        } else {
            printf "'%s'", params_array[idx];
        }
    }
    print "]),";
}

BEGIN { print "export default {\n\tmethods: {\n\t\textractModule() {\n\t\t\treturn {" }
/\w+\s((\s|\*)*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/ { treat_function(); }
END { print "\t\t\t}\n\t\t}\n\t},\n}" }