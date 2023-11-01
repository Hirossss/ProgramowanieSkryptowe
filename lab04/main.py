'''
from Vector2d import Vector2d
from model import Animal, MapDirection


kot = Animal(Vector2d(2,0),MapDirection.SOUTH)

print(f'Dane zwierzecia kot: {kot}, a pozycja to {kot.position}')
'''

import sys
from model import Vector2d, MoveDirection
from controller import Simulation, OptionsParser

directions: list[MoveDirection] = OptionsParser.parse(sys.argv[1:]) 
positions: list[Vector2d] = [Vector2d(2,2), Vector2d(3,4)] # Pozycje początkowe dla zwierząt, odpowiednio, (2,2) oraz (3,4) 
simulation: Simulation = Simulation(directions, positions)
simulation.run()     