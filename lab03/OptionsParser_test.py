import unittest
from MoveDirection import MoveDirection
from OptionsParser import OptionsParser


class TestOptionsParser(unittest.TestCase):
    def test_wejscie(self):
        # Test case 1: Valid input
        input_str = "fblr"
        result = OptionsParser.wejscie(input_str)
        expected = [
            'Forward',
            'Backward',
            'Left',
            'Right',
        ]
        self.assertEqual(result, expected)

        # Test case 2: Invalid characters should be ignored
        input_str = "xyz"
        result = OptionsParser.wejscie(input_str)
        expected = []
        self.assertEqual(result, expected)

        # Test case 3: Mixed valid and invalid characters
        input_str = "flxbr"
        result = OptionsParser.wejscie(input_str)
        expected = [
            'Forward',
            'Left',
            'Backward',
            'Right',
        ]
        self.assertEqual(result, expected)


if __name__ == "__main__":
    unittest.main()
