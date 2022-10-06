#!/usr/bin/env python

"""
Pandoc filter to allow interpolation of metadata fields
into a document.  %{fields} will be replaced by the field's
value, assuming it is of the type MetaInlines or MetaString.
"""

import sys
from pandocfilters import toJSONFilter, attributes, Span, Str, Table
import re

pattern = re.compile('([^%]*)\{\{(.*)\}\}([^%]*)')

def metavars(key, value, format, meta):
    if key == 'Str':
        m = pattern.match(value)
        if m:
            pre = m.group(1)
            field = m.group(2)
            post = m.group(3)

            result = meta.get(field, {})
            if result:
                if 'MetaInlines' in result['t']:
                    return Span(attributes({'class': 'interpolated',
                                            'field': field}),
                                [Str(pre)] + result['c'] + [Str(post)])
                elif 'MetaString' in result['t']:
                    return Str(result['c'])
            else:
                sys.stderr.write("\n\n1 Error: Variable %{{{0}}} used but not declared in document.\n\n".format(field))
                # exit(-1)
    elif key == 'Para' and type(value) == list and len(value) == 1 and value[0]['t'] == 'Str':
        # Test to see if contained string is a variable
        m = pattern.match(value[0]['c'])

        if m:
            pre = m.group(1)
            field = m.group(2)
            post = m.group(3)

            # Get substitution value
            result = meta.get(field, {})

            if result:
                # Only substitute at this level _if_ the replacement is a MetaBlocks containing a Table
                if 'MetaBlocks' in result['t'] and result['c'][0]['t'] == 'Table':
                    res = result['c'][0]

                    # sys.stderr.write("Key: {0}, Value: {1}, Result: {2}\n".format(key, value, res))
                    return res

            else:
                sys.stderr.write("\n\n2 Error: Variable %{{{0}}} used but not declared in document.\n\n".format(field))
                # exit(-1)



if __name__ == "__main__":
    toJSONFilter(metavars)