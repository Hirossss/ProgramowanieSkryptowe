import sys
from controller import OptionsParser


def display(args, show_index):
    print("Start")
    if show_index is True:
        i = 0
        for x in args:
            print("args[" + str(i) + "] = " + x)
            i += 1
    else:
        for x in args:
            print(x)
    print("Stop")


def run(moves, move_descriptions):
    result = []
    for x in moves:
        if x in move_descriptions.keys():
            result.append(move_descriptions[x])
    return result


# display(sys.argv, False)


if __name__ == "__main__":
    move_descp = {
        0: "Zwierzak idzie do przodu",
        1: "Zwierzak idzie do tyłu",
        2: "Zwierzak skręca w lewo",
        3: "Zwierzak skręca w prawo",
    }

    moves_list = OptionsParser.wejscie(sys.argv)

    display(run(moves_list, move_descp), False)  # mozna tez sprawdzic dla true
