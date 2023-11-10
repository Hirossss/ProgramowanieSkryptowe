from interface import IMoveValidator, IWorldMap
from model.core import Vector2d, MoveDirection
from model.animal import Animal
from view import MapVisualizer


class RectangularMap(IMoveValidator, IWorldMap):
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.animals: dict[Vector2d, Animal] = {}

    def place(self, animal: Animal) -> bool:
        if self.isOccupied(animal.position):
            return False
        self.animals[animal.position] = animal
        return True

    def move(self, animal: Animal, direction: MoveDirection) -> None:
        new_position = self.calculate_new_position(animal.position, direction)
        if self.canMoveTo(new_position) and not self.isOccupied(new_position):
            del self.animals[animal.position]
            animal.position = new_position
            self.animals[new_position] = animal

    def isOccupied(self, position: Vector2d) -> bool:
        return position in self.animals

    def objectAt(self, position: Vector2d) -> Animal | None:
        return self.animals.get(position, None)

    def __str__(self) -> str:
        lower_left = Vector2d(0, 0)
        upper_right = Vector2d(self.width - 1, self.height - 1)
        visualizer = MapVisualizer(self)
        return visualizer.draw(lower_left, upper_right)

    def calculate_new_position(
        self, position: Vector2d, direction: MoveDirection
    ) -> Vector2d:
        if direction == MoveDirection.FORWARD:
            return position.add(Vector2d(0, 1))
        elif direction == MoveDirection.BACKWARD:
            return position.subtract(Vector2d(0, 1))
        elif direction == MoveDirection.RIGHT:
            return position.add(Vector2d(1, 0))
        elif direction == MoveDirection.LEFT:
            return position.subtract(Vector2d(1, 0))

    def canMoveTo(self, position: Vector2d) -> bool:
        lower_left = Vector2d(0, 0)
        upper_right = Vector2d(self.width - 1, self.height - 1)
        return lower_left.precedes(position) and position.follows(upper_right)
