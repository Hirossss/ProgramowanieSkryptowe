class Student:

    def __init__(self, name):
        self.__name = name
        
    def __repr__(self):
        return f"{self.__name}"
    
    def __str__(self):
        return f"{self.__name}"
        