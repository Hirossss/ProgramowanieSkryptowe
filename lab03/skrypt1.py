import sys
from operations import *


def skrypt1(args):
    print(first_character(args))
    print(first_two_characters(args))
    print(all_characters_except_first_two(args))
    print(penultimate_character(args))
    print(last_three_characters(args))
    print(all_characters_in_even_positions(args))
    print(merge_characters_and_duplicate(args))


if __name__ == "__main__":
    concatenated_string = " ".join(
        sys.argv[1:]
    )  # to allow more than one word in terminal
    skrypt1(concatenated_string)
