# from typing import Self
from enum import Enum


class Vector2d:
    def __init__(self, x, y):
        self.__x = x
        self.__y = y

    def __str__(self):
        return f"({self.__x},{self.__y})"

    def __eq__(self, other):
        if not isinstance(other, Vector2d):
            # don't attempt to compare against unrelated types
            return False

        return self.__x == other.__x and self.__y == other.__y

    def __hash__(self) -> int:
        return hash((self.__x, self.__y))

    def get_info(self):
        return f"Przypisany atrybut x: {self.__x},przypisany atrybut y: {self.__y}"

    def add(self, other_Vector2d):
        new_vector = Vector2d(
            self.__x + other_Vector2d.__x, self.__y + other_Vector2d.__y
        )
        return new_vector

    def subtract(self, other_Vector2d):
        new_vector = Vector2d(
            self.__x - other_Vector2d.__x, self.__y - other_Vector2d.__y
        )
        return new_vector

    def precedes(self, other_Vector2d):
        if self.__x <= other_Vector2d.__x and self.__y <= other_Vector2d.__y:
            return True
        return False

    def follows(self, other_Vector2d):
        if self.__x >= other_Vector2d.__x and self.__y >= other_Vector2d.__y:
            return True
        return False

    def upperRight(self, other_Vector2d):
        new_x = max(self.__x, other_Vector2d.__x)
        new_y = max(self.__y, other_Vector2d.__y)
        new_vector = Vector2d(new_x, new_y)
        return new_vector

    def lowerLeft(self, other_Vector2d):
        new_x = min(self.__x, other_Vector2d.__x)
        new_y = min(self.__y, other_Vector2d.__y)
        new_vector = Vector2d(new_x, new_y)
        return new_vector

    def opposite(self):
        new_vector = Vector2d(-self.__x, -self.__y)
        return new_vector


class MoveDirection(Enum):
    FORWARD = 0
    BACKWARD = 1
    LEFT = 2
    RIGHT = 3


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
