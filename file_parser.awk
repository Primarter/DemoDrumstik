#!/bin/zsh -f

BEGIN { print "Functions"}
/\w+\s([\s\*]*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/ { print $2 }
END { print " - DONE -" }

# word [_*]word([word [_*]word, word [_*]word, ...])[_\n]{
# /\w+\s([\s\*]*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/