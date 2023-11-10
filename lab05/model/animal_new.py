from model.core import MoveDirection, Vector2d, MapDirection
from model.interface import IMoveValidator

class Animal:
    def __init__(self, position: Vector2d, orientation = MapDirection.NORTH) -> None:
        self.position = position
        self.orientation = orientation

    def __str__(self) -> str:
        return f'{self.orientation}'

    def __repr__(self) -> str:
        return str(self)

    def isAt(self, position: Vector2d) -> bool:
        return self.position.x == position.x and self.position.y == position.y

    def move(self, direction: MoveDirection, validator: IMoveValidator) -> None:
        if direction.name == MoveDirection.RIGHT.name:
            self.orientation = self.orientation.next()
        
        elif direction.name == MoveDirection.LEFT.name:
            self.orientation = self.orientation.previous()
        
        if direction.name == MoveDirection.FORWARD.name or direction.name == MoveDirection.BACKWARD.name:
            if direction.name == MoveDirection.FORWARD.name:
                target: Vector2d = self.position.add(self.orientation.toUnitVector())
            else:
                target = self.position.subtract(self.orientation.toUnitVector())

            if validator.canMoveTo(target):
                self.position = target