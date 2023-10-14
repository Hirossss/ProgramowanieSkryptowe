import sys
from operations import *


def skrypt1(args):
    concatenated_string = " ".join(args)
    print(first_character(concatenated_string))
    print(first_two_characters(concatenated_string))
    print(all_characters_except_first_two(concatenated_string))
    print(penultimate_character(concatenated_string))
    print(last_three_characters(concatenated_string))
    print(all_characters_in_even_positions(concatenated_string))
    print(merge_characters_and_duplicate(concatenated_string))


if __name__ == "__main__":
    concatenated_string = " ".join(
        sys.argv[1:]
    )  # to allow more than one word in terminal
    skrypt1(concatenated_string)
