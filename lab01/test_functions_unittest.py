import unittest
from unittest.mock import patch
import io

# Import the functions to be tested
from skrypt import display, run


class TestDisplayFunction(unittest.TestCase):
    @patch("sys.stdout", new_callable=io.StringIO)
    def test_display_show_index_true(self, mock_stdout):
        args = ["a", "b", "c"]
        show_index = True
        display(args, show_index)
        output = mock_stdout.getvalue()
        expected_output = "Start\nargs[0] = a\nargs[1] = b\nargs[2] = c\nStop\n"
        self.assertEqual(output, expected_output)

    @patch("sys.stdout", new_callable=io.StringIO)
    def test_display_show_index_false(self, mock_stdout):
        args = ["a", "b", "c"]
        show_index = False
        display(args, show_index)
        output = mock_stdout.getvalue()
        expected_output = "Start\na\nb\nc\nStop\n"
        self.assertEqual(output, expected_output)


class TestRunFunction(unittest.TestCase):
    def test_run(self):
        moves = ["f", "b", "l", "r"]
        move_descp = {
            "f": "Zwierzak idzie do przodu",
            "b": "Zwierzak idzie do tyłu",
            "l": "Zwierzak skręca w lewo",
            "r": "Zwierzak skręca w prawo",
        }
        result = run(moves, move_descp)
        expected_result = [
            "Zwierzak idzie do przodu",
            "Zwierzak idzie do tyłu",
            "Zwierzak skręca w lewo",
            "Zwierzak skręca w prawo",
        ]
        self.assertEqual(result, expected_result)


if __name__ == "__main__":
    unittest.main()
