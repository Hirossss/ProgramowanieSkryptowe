#from typing import Self
from enum import Enum
from Vector2d import Vector2d



class MapDirection(Enum):
    NORTH = "↑"
    EAST = "→"
    SOUTH = "↓"
    WEST = "←"

    def __str__(self) -> str:
        return self.value
    
    def next(self) -> 'MapDirection':
        directions = list(MapDirection)
        next_index = (directions.index(self) + 1) % len(directions)
        return directions[next_index]
    
    def previous(self) -> 'MapDirection':
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
