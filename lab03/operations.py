# Zadanie 2/3, zasada TDD (Test Driven Development)

# Faza zielona. Na razie chce przechodzic testy.


"""
def first_character(text):
    return text[0]


def first_two_characters(text):
    if len(text) < 2:
        return ""
    else:
        return text[0:2]


def all_characters_except_first_two(text):
        return text[2:]
    


def penultimate_character(text):
    if len(text) < 2:
        return ""
    else:
        return text[-2]
    

def last_three_characters(text):
    if len(text)<2:
        return ""
    else:
        return text[-3:]
    

def all_characters_in_even_positions(text):
    return text[0::2]
"""


# Faza refactor


def first_character(text):
    return text[0]


def first_two_characters(text):
    return text[:2] if len(text) > 1 else ""


def all_characters_except_first_two(text):
    return text[2:]


def penultimate_character(text):
    return text[-2] if len(text) > 1 else ""


def last_three_characters(text):
    return text[-3:] if len(text) > 1 else ""


def all_characters_in_even_positions(text):
    return text[::2]


# Zadanie 4


# Faza Zielona

"""
def merge_characters_and_duplicate(string):
    if len(string) < 2:
        return ""
    else:
        a=string[0]+string[-2]
        return a*len(string)
"""


# Faza Refactor


def merge_characters_and_duplicate(string):
    return (first_character(string) + penultimate_character(string)) * len(string)
    
