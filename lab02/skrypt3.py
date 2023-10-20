import argparse


parser = argparse.ArgumentParser(description="Bash Clone and operations")


subparsers = parser.add_subparsers(  # tworze kolejne podinstancje parserow
    dest="command"
)


grep_parser = subparsers.add_parser(  # subparser dla 'grep'
    "grep", help="Use the grep functionality from bash on given text"
)
grep_parser.add_argument("word", help="Word to search")
grep_parser.add_argument("text", help="Text in which we look for things", nargs="*")
grep_parser.add_argument(
    "-i",
    action="store_true",  # jesli sie pojawi w command line to zapisujemy jako true  # noqa: E501
    help="Case-insensitive search",
)
grep_parser.add_argument("-w", action="store_true", help="Whole word search")


cut_parser = subparsers.add_parser(  # subparser dla 'cut'
    "cut", help="Use the cut functionality from bash on given text"
)
cut_parser.add_argument(
    "-d",
    required=True,  # required=True zapewnia nas ze user musi podac wartosc dla danej opcji  # noqa: E501
    help="Delimiter",
)
cut_parser.add_argument("-f", required=True, type=int, help="Field")
cut_parser.add_argument("text", help="Text to cut", nargs="*")


operations_parser = subparsers.add_parser(  # subparser dla operations.py
    "operations", help="Perform basic operations on given string"
)
operations_parser.add_argument("text", nargs="*", help="Text for operations")


args = parser.parse_args()  # parsujemy command line'a


if args.command == "grep":
    i_option = args.i  # True lub False jesli istnieje takowa
    w_option = args.w
    from bash_clone.grep import *

    grep_function(i_option, w_option, args.word, args.text)
elif args.command == "cut":
    from bash_clone.cut import *

    cut_function(args.d, args.f, args.text)
elif args.command == "operations":
    from skrypt1 import skrypt1

    skrypt1(args.text)
