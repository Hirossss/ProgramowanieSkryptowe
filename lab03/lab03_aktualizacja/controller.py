from model import MoveDirection

class OptionsParser:
    @staticmethod
    def wejscie(list_str):
        result = []
        for option in list_str:
            if option == "f":
                result.append(MoveDirection["FORWARD"].value)
            elif option == "b":
                result.append(MoveDirection["BACKWARD"].value)
            elif option == "l":
                result.append(MoveDirection["LEFT"].value)
            elif option == "r":
                result.append(MoveDirection["RIGHT"].value)
        return result
