import sys
import unittest
from io import StringIO
from skrypt import display, run

class TestDisplay(unittest.TestCase):
    def test_display_without_index(self):
        args = ["arg1", "arg2"]
        with unittest.mock.patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            display(args, False)
            output = mock_stdout.getvalue()
        self.assertEqual(output, "arg1\narg2\n")

    def test_display_with_index(self):
        args = ["arg1", "arg2"]
        with unittest.mock.patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            display(args, True)
            output = mock_stdout.getvalue()
        self.assertEqual(output, "args[0] = arg1\nargs[1] = arg2\n")

class TestRun(unittest.TestCase):
    def setUp(self):
        self.move_descriptions = {
            "f": "Zwierzak idzie do przodu",
            "b": "Zwierzak idzie do tyłu",
            "l": "Zwierzak skręca w lewo",
            "r": "Zwierzak skręca w prawo",
        }

    def test_run(self):
        sample_moves = ["f", "b", "l", "r"]
        result = run(sample_moves, self.move_descriptions)
        expected_result = [
            "Zwierzak idzie do przodu",
            "Zwierzak idzie do tyłu",
            "Zwierzak skręca w lewo",
            "Zwierzak skręca w prawo",
        ]
        self.assertEqual(result, expected_result)

if __name__ == '__main__':
    unittest.main()
