#!/usr/bin/env python

from .core import Vector2d, MapDirection, MoveDirection


class Animal:
    def __init__(
        self, vector: Vector2d, orientation: MapDirection = MapDirection.NORTH
    ):
        self.position = vector
        self.orientation = orientation

    def __str__(self) -> str:
        return f"{self.position} {self.orientation}"

    def __repr__(self) -> str:
        return str(self)

    def isAt(self, position: Vector2d) -> bool:
        return self.position == position

    def move(self, direction: MoveDirection) -> None:
        if direction == MoveDirection.RIGHT:
            self.orientation = self.orientation.next()
        elif direction == MoveDirection.LEFT:
            self.orientation = self.orientation.previous()
        elif direction in {MoveDirection.FORWARD, MoveDirection.BACKWARD}:
            if direction == MoveDirection.FORWARD:
                target = self.position.add(self.orientation.toUnitVector())
            else:
                target = self.position.subtract(self.orientation.toUnitVector())

            if target.precedes(Vector2d(4, 4)) and target.follows(Vector2d(0, 0)):
                self.position = target

