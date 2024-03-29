import pytest
from skrypt import display, run


@pytest.fixture
def sample_moves():  # to musi byc na poczatku bo program wlacza wszystkie testy na raz i pozniej nie widzi tej def  # noqa: E501
    return ["f", "b", "l", "r"]


def test_display_without_index(capsys):
    args = ["arg1", "arg2"]
    display(args, False)
    captured = capsys.readouterr()
    assert captured.out == "Start\narg1\narg2\nStop\n"


def test_display_with_index(capsys):
    args = ["arg1", "arg2"]
    display(args, True)
    captured = capsys.readouterr()
    assert captured.out == "Start\nargs[0] = arg1\nargs[1] = arg2\nStop\n"


def test_run(sample_moves):
    move_descriptions = {
        "f": "Zwierzak idzie do przodu",
        "b": "Zwierzak idzie do tyłu",
        "l": "Zwierzak skręca w lewo",
        "r": "Zwierzak skręca w prawo",
    }
    result = run(sample_moves, move_descriptions)
    assert result == [
        "Zwierzak idzie do przodu",
        "Zwierzak idzie do tyłu",
        "Zwierzak skręca w lewo",
        "Zwierzak skręca w prawo",
    ]
