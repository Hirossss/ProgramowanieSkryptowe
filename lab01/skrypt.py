import sys
     

def display(args,show_index):
    print("Start")
    if show_index is True:
        i=0
        for x in args:
            print("args["+ str(i) +"] = "+x)
            i+=1
    else:
        for x in args:
            print(x)
    print("Stop")

display(sys.argv,False)

