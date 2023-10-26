import unittest
from lab03.lab03_zad_dom.Vector2d import Vector2d

class TestVector2d(unittest.TestCase):
    def setUp(self):
        # Create two Vector2d instances for testing
        self.vector1 = Vector2d(2, 3)
        self.vector2 = Vector2d(4, 5)

    def test_add(self):
        result = self.vector1.add(self.vector2)
        self.assertEqual(result._Vector2d__x, 6)
        self.assertEqual(result._Vector2d__y, 8)

    def test_subtract(self):
        result = self.vector1.subtract(self.vector2)
        self.assertEqual(result, Vector2d(-2, -2))

    def test_precedes(self):
        self.assertTrue(self.vector1.precedes(self.vector2))
        self.assertFalse(self.vector2.precedes(self.vector1))

    def test_follows(self):
        self.assertTrue(self.vector2.follows(self.vector1))
        self.assertFalse(self.vector1.follows(self.vector2))

    def test_upperRight(self):
        result = self.vector1.upperRight(self.vector2)
        self.assertEqual(result._Vector2d__x, 4)
        self.assertEqual(result._Vector2d__y, 5)

    def test_lowerLeft(self):
        result = self.vector1.lowerLeft(self.vector2)
        self.assertEqual(result._Vector2d__x, 2)
        self.assertEqual(result._Vector2d__y, 3)

    def test_opposite(self):
        result = self.vector1.opposite()
        self.assertEqual(result._Vector2d__x, -2)
        self.assertEqual(result._Vector2d__y, -3)

    def test_str(self):
        self.assertEqual(str(self.vector1), "(2,3)")

    def test_eq(self):
        vector3 = Vector2d(2, 3)
        vector4 = Vector2d(3, 4)

        self.assertTrue(self.vector1 == vector3)
        self.assertFalse(self.vector1 == vector4)



    def test_get_info(self):
        info = self.vector1.get_info()
        self.assertEqual(info, "Przypisany atrybut x: 2,przypisany atrybut y: 3")


if __name__ == "__main__":
    unittest.main()
