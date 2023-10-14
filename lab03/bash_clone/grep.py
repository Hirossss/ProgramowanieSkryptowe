def grep_function(i_option, w_option,word,text):
    import re
    if not i_option and not w_option:
        for line in text:
            if word in line:
                print(line)

    elif i_option and not w_option:
        for line in text:
            if word.lower() in line.lower():
                print(line)

    elif w_option and not i_option:
        word_pattern = r'\b{}\b'.format(re.escape(word))    # reg ex stack overflow
        for line in text:
            if re.search(word_pattern, line):
                print(line)
        
    else:
        for line in text:
            word_pattern = r'\b{}\b'.format(re.escape(word))    # reg ex stack overflow
        for line in text:
            if re.search(word_pattern, line,re.IGNORECASE):
                print(line)
            