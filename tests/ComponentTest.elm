module ComponentTest exposing (..)

import Expect
import Http exposing (Expect)
import Test exposing (..)


addComponent : Test
addComponent =
    describe "add component"
        [ test "adds component" <|
            \_ ->
                Expect.equal (1 + 1) 2
        ]
