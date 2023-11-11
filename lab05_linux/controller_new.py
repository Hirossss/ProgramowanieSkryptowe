

import time
from model.core import Vector2d, MoveDirection
from model.animal_new import Animal
from model.interface import IWorldMap


class OptionsParser:
    @staticmethod
    def parse(list_str):
        result = []
        for option in list_str:
            if option == "f":   
                result.append(MoveDirection.FORWARD)
            elif option == "b":
                result.append(MoveDirection.BACKWARD)
            elif option == "l":
                result.append(MoveDirection.LEFT)
            elif option == "r":
                result.append(MoveDirection.RIGHT)
        return result


class Simulation:
    def __init__(self, directions: list[MoveDirection], positions: list[Vector2d], iwmap: IWorldMap) -> None:
        self.directions = directions
        self.positions = positions
        self.animals: list[Animal] = []
        self.iwmap = iwmap

        for vector in self.positions:
            if self.iwmap.place(Animal(vector)):
                self.animals.append(Animal(vector))

    def run(self) -> None:
        for i in range(len(self.directions)):
            print(self.iwmap)
            time.sleep(1)
            
            n = i % len(self.animals)
            self.iwmap.move(self.animals[n],self.directions[i])
