#!/usr/bin/env python

import sys
from model.core import MoveDirection, Vector2d # Import bezwzględny
from controller import Simulation, OptionsParser

directions = OptionsParser.parse(sys.argv[1:])
positions = [Vector2d(2,2), Vector2d(3,4)] # Pozycje początkowe dla zwierząt, odpowiednio, (2,2) oraz (3,4) 
Simulation = Simulation(directions, positions)
simulation.run()
