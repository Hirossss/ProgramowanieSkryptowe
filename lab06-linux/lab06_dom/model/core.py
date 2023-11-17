#!/usr/bin/env python

# from typing import Self
from enum import Enum


def log(function):
    def wrapper(*args, **kwargs):
        print(f"Nazwa kwalifikowana: {function.__qualname__}")
        args_str = " ".join(map(str, args))
        print(f"Argumenty: {args_str}")
        return function(*args, **kwargs)

    return wrapper


def log_to(file):
    def log(function):
        def wrapper(*args, **kwargs):
            args_str = " ".join(map(str, args))
            with open(file, "a") as f:
                f.writelines(f"{function.__qualname__}\t| {args_str}\n")
            return function(*args, **kwargs)

        return wrapper

    return log


class Vector2d:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x},{self.y})"

    def __eq__(self, other):
        if not isinstance(other, Vector2d):
            # don't attempt to compare against unrelated types
            return False

        return self.x == other.x and self.y == other.y

    def __hash__(self) -> int:
        return hash((self.x, self.y))

    @property
    @log_to(file="dziennik_log")
    def get_x(self):
        return self.x

    @property
    @log_to(file="dziennik_log")
    def get_y(self):
        return self.y

    def get_info(self):
        return f"Przypisany atrybut x: {self.x},przypisany atrybut y: {self.y}"

    @log_to(file="dziennik_log")
    def add(self, other_Vector2d):
        new_vector = Vector2d(self.x + other_Vector2d.x, self.y + other_Vector2d.y)
        return new_vector

    @log
    def subtract(self, other_Vector2d):
        new_vector = Vector2d(self.x - other_Vector2d.x, self.y - other_Vector2d.y)
        return new_vector

    def precedes(self, other_Vector2d):
        if self.x <= other_Vector2d.x and self.y <= other_Vector2d.y:
            return True
        return False

    def follows(self, other_Vector2d):
        if self.x >= other_Vector2d.x and self.y >= other_Vector2d.y:
            return True
        return False

    def upperRight(self, other_Vector2d):
        new_x = max(self.x, other_Vector2d.x)
        new_y = max(self.y, other_Vector2d.y)
        new_vector = Vector2d(new_x, new_y)
        return new_vector

    def lowerLeft(self, other_Vector2d):
        new_x = min(self.x, other_Vector2d.x)
        new_y = min(self.y, other_Vector2d.y)
        new_vector = Vector2d(new_x, new_y)
        return new_vector

    def opposite(self):
        new_vector = Vector2d(-self.x, -self.y)
        return new_vector


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
            return Vector2d(0, 0)

    def __eq__(self, other):
        if isinstance(other, MapDirection):
            return self.value == other.value
        return NotImplemented


class MoveDirection(Enum):
    FORWARD = 0
    BACKWARD = 1
    LEFT = 2
    RIGHT = 3


"""
$env:PYTHONPATH += ";$(Get-Location)"
"""
