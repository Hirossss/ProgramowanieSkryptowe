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
        self.animals = [Animal(position) for position in positions]
        self.current_animal_index = 0

    def run(self) -> None:
        for direction in self.directions:
            animal = self.animals[self.current_animal_index]
            animal.move(direction)
            print(
                f"Zwierzę {self.current_animal_index} : {animal.position} {animal.orientation.value}"
            )
            self.current_animal_index = (self.current_animal_index + 1) % len(
                self.animals
            )
