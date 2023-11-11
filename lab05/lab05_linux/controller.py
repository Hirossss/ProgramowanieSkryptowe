#!/usr/bin/env python

from model.core import Vector2d, MoveDirection
from model.animal import Animal


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
    def __init__(
        self, directions: list[MoveDirection], positions: list[Vector2d]
    ) -> None:
        self.directions = directions
        self.positions = positions
        self.animals: list[Animal] = []

        for vector in self.positions:
            self.animals.append(Animal(vector))

    def run(self) -> None:
        for i in range(len(self.directions)):
            n = i % len(self.animals)
            self.animals[n].move(self.directions[i])
            print(f"Zwierze {n}: {self.animals[n].position} {self.animals[n].orientation}")
