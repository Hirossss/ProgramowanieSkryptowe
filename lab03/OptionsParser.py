from MoveDirection import MoveDirection

class OptionsParser:
    @staticmethod
    def wejscie(text_str):
        text=text_str.split(" ")
        result = []
        for option in text:
            if option == "f":
                result.append(MoveDirection.f.value)
            elif option == "b":
                result.append(MoveDirection.b.value)
            elif option == "l":
                result.append(MoveDirection.l.value)
            elif option == "r":
                result.append(MoveDirection.r.value)
            else: 
                continue
        return result
    
'''
> py -i OptionsParser.py
>>> print(OptionsParser.wejscie("f a bb r l"))
'''
