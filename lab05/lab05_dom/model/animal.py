from model.core import Vector2d, MapDirection, MoveDirection

class Animal:
    def __init__(
        self, vector: Vector2d, orientation: MapDirection = MapDirection.NORTH
    ) -> None:
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
        elif direction == MoveDirection.FORWARD:
            new_position = self.position.add(self.orientation.toUnitVector())
            if Vector2d(0, 0).precedes(new_position) and new_position.precedes(
                Vector2d(4, 4)
            ):
                self.position = new_position
        elif direction == MoveDirection.BACKWARD:
            new_position = self.position.subtract(self.orientation.toUnitVector())
            if Vector2d(0, 0).precedes(new_position) and new_position.precedes(
                Vector2d(4, 4)
            ):
                self.position = new_position
