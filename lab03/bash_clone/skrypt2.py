import sys


allowed_options_cut = ["d", "f", "i", "w"]
allowed_options_grep = ["i", "w"]


def skrypt2(args):
    if args[0] == "cut":    # mozna to tez zrobic przy pomocy case
        from cut import cut_function

        d_ind = args.index(
            "-d"
        )  # mozna to podac na sztywno jesli zakladamy ze bash dopuszcza jedna skladnie, ale wole dowolnosc  # noqa: E501
        f_ind = args.index("-f")
        cut_function(args[d_ind + 1], args[f_ind + 1], args[5:])
    elif args[0] == "grep":
        from grep import grep_function

        i_flag = "-i" in args
        w_flag = "-w" in args

        if i_flag and w_flag:
            i_ind = args.index("-i")
            w_ind = args.index("-w")

            if i_ind > w_ind:
                word_to_grep_ind = i_ind + 1
            else:
                word_to_grep_ind = w_ind + 1
        elif i_flag:
            word_to_grep_ind = args.index("-i") + 1
        elif w_flag:
            word_to_grep_ind = args.index("-w") + 1
        else:
            word_to_grep_ind = 1

        grep_function(
            i_flag, w_flag, args[word_to_grep_ind], args[word_to_grep_ind + 1 :]
        )
    else:
        print("Podano zly argument")


if __name__ == "__main__":
    skrypt2(sys.argv[1:])
