# from typing import Self
from decimal import DefaultContext
from enum import Enum

from Vector2d import Vector2d
from MoveDirection import MoveDirection



class MapDirection(Enum):
    NORTH = "↑"
    EAST = "→"
    SOUTH = "↓"
    WEST = "←"

    def __str__(self) -> str:
        return self.value

    def next(self) -> "MapDirection":
        directions = list(MapDirection)
        next_index = (directions.index(self) + 1) % len(directions)
        return directions[next_index]

    def previous(self) -> "MapDirection":
        directions = list(MapDirection)
        next_index = (directions.index(self) - 1) % len(directions)
        return directions[next_index]

    def toUnitVector(self) -> Vector2d:
        if self == MapDirection.NORTH:
            return Vector2d(0, 1)
        elif self == MapDirection.SOUTH:
            return Vector2d(0, -1)
        elif self == MapDirection.WEST:
            return Vector2d(-1, 0)
        elif self == MapDirection.EAST:
            return Vector2d(1, 0)
        else:
            return NotImplemented

class Animal:
    
    def __init__(self, vector: Vector2d, orientation: MapDirection=MapDirection.NORTH) -> None:
        self.position = vector
        self.orientation = orientation

    def __str__(self) -> str:
        return f'{self.position} {self.orientation}'
    
    def __repr__(self) -> str:
        return str(self)
    
    def isAt(self, position: Vector2d) -> bool:
        return self.position == position

    def move(self, direction: MoveDirection) -> None:
        if direction == MoveDirection.RIGHT:
            self.orientation = self.orientation.next()
        elif direction == MoveDirection.LEFT:
            self.orientation = self.orientation.previous()
        elif direction == MoveDirection.FORWARD:
            new_position = self.position.add(self.orientation.toUnitVector())
            if Vector2d(0, 0).precedes(new_position) and new_position.precedes(Vector2d(4, 4)):
                self.position = new_position
        elif direction == MoveDirection.BACKWARD:
            new_position = self.position.subtract(self.orientation.toUnitVector())
            if Vector2d(0, 0).precedes(new_position) and new_position.precedes(Vector2d(4, 4)):
                self.position = new_position
            


