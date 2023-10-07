import sys


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


def run(moves,move_descriptions):
    result=[]
    for x in moves:
        if x in move_descriptions:
            result.append(move_descriptions[x])
    return result
        




#display(sys.argv, False)


move_descp = {'f': "Zwierzak idzie do przodu", 'b': "Zwierzak idzie do tyłu", 'l': "Zwierzak skręca w lewo", 'r': "Zwierzak skręca w prawo"}
print(run(sys.argv,move_descp))