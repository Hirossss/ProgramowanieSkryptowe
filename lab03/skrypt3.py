import argparse


# Create the argparse parser
parser = argparse.ArgumentParser(description="Bash Clone")

# Define subparsers for the different commands
subparsers = parser.add_subparsers(dest="command")

# Subparser for 'grep' command
grep_parser = subparsers.add_parser("grep", help="Use the grep functionality from bash on given text")
grep_parser.add_argument("word", help="Word to search")
grep_parser.add_argument("text", help="Text in which we look for things", nargs='*')
grep_parser.add_argument("-i", action="store_true", help="Case-insensitive search (i_option)")
grep_parser.add_argument("-w", action="store_true", help="Whole word search (w_option)")

# Subparser for 'cut' command
cut_parser = subparsers.add_parser("cut", help="Use the cut functionality from bash on given text")
cut_parser.add_argument("-d", required=True, help="Delimiter")
cut_parser.add_argument("-f", required=True, type=int, help="Field")
cut_parser.add_argument("text", help="Text to cut", nargs='*')

# Subparser for 'operations' command
operations_parser = subparsers.add_parser("operations", help="Perform basic operations on given string")
operations_parser.add_argument("text", nargs="*", help="Text for operations")

# Parse the command-line arguments
args = parser.parse_args()

# Determine the selected command and execute the corresponding script
if args.command == "grep":
    # Determine the values of i_option and w_option based on command-line arguments
    i_option = args.i
    w_option = args.w
    from bash_clone.grep import *
    # Call grep_function with the appropriate arguments
    grep_function(i_option, w_option, args.word, args.text)
elif args.command == "cut":
    from bash_clone.cut import *
    cut_function(args.d, args.f,args.text)
elif args.command == "operations":
    from skrypt1 import skrypt1
    skrypt1(args.text)
