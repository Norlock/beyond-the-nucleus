module HelperFunctions exposing (..)


hasItem : Maybe a -> Bool
hasItem maybe =
    Maybe.map (\_ -> True) maybe
        |> Maybe.withDefault False
