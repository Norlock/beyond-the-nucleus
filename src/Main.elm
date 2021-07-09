module Main exposing (..)

import Browser
import Browser.Events
import Components
import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode
import Types exposing (..)


main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


init : () -> ( Model, Cmd Msg )
init _ =
    let
        components =
            Components.components
    in
    ( { showHelp = False
      , components = components
      , current = List.head (Dict.values components)
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StepForwards ->
            ( Components.stepForwards model, Cmd.none )

        StepBackwards ->
            ( Components.stepBackwards model, Cmd.none )

        ToggleHelp ->
            ( { model | showHelp = not model.showHelp }, Cmd.none )

        Noop ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onKeyPress keyDecoder


keyDecoder : Decode.Decoder Msg
keyDecoder =
    Decode.map toKey (Decode.field "key" Decode.string)


toKey : String -> Msg
toKey char =
    case char of
        "?" ->
            ToggleHelp

        "s" ->
            StepForwards

        "b" ->
            StepBackwards

        _ ->
            Noop


view : Model -> Browser.Document Msg
view model =
    { title = "Beyond the nucleus"
    , body = [ body model ]
    }


parseChapter : Chapter -> String
parseChapter chapter =
    case chapter of
        Ocean ->
            "Ocean"

        Zendo ->
            "Zendo"

        Natives ->
            "Natives"



-- TODO hide / show canvas blur


body : Model -> Html Msg
body model =
    case model.current of
        Just current ->
            defaultView current model.showHelp

        Nothing ->
            errorView model.showHelp



-- TODO Show error


errorView : Bool -> Html Msg
errorView showHelp =
    div [ class "container" ]
        [ div [ id "pixi-canvas" ] []
        , div [ id "game-canvas" ] []
        , div [ id "help-overlay", classList [ ( "show", showHelp ) ] ] [ helpContainer ]
        , div [ id "help-control-wrapper" ]
            [ span [ id "help-control", class "info-control" ] [ text "?" ]
            ]
        , h1 [ id "chapter-title" ] [ text "" ]
        , div [ id "toolbar-controls" ]
            [ span [ id "game-control", class "info-control additional hide" ] [ text "P" ]
            , span [ id "video-control", class "info-control additional hide" ] [ text "V" ]
            , span [ id "next-control", class "info-control disable" ] [ text "S" ]
            , span [ id "previous-control", class "info-control disable" ] [ text "B" ]
            , span [ id "page-number", class "info-control" ] [ text "-" ]
            ]
        ]


defaultView : Component -> Bool -> Html Msg
defaultView component showHelp =
    let
        { index, chapter } =
            component
    in
    div [ class "container" ]
        [ div [ id "pixi-canvas" ] []
        , div [ id "game-canvas" ] []
        , div [ id "help-overlay", classList [ ( "show", showHelp ) ] ] [ helpContainer ]
        , div [ id "help-control-wrapper" ]
            [ span [ id "help-control", class "info-control" ] [ text "?" ]
            ]
        , h1 [ id "chapter-title" ] [ text (parseChapter chapter) ]
        , div [ id "toolbar-controls" ]
            [ span [ id "game-control", class "info-control additional hide" ] [ text "P" ]
            , span [ id "video-control", class "info-control additional hide" ] [ text "V" ]
            , span [ id "next-control", class "info-control disable" ] [ text "S" ]
            , span [ id "previous-control", class "info-control disable" ] [ text "B" ]
            , span [ id "page-number", class "info-control" ] [ text (String.fromInt index) ]
            ]
        ]


helpContainer : Html Msg
helpContainer =
    div [ id "help-container", class "show" ]
        [ ul []
            [ helpContainerListItem "s" " => step forward"
            , helpContainerListItem "b" " => step backward"
            , helpContainerListItem "v" " => toggle video"
            , helpContainerListItem "c" " => toggle credits"
            , helpContainerListItem "?" " => toggle help"
            ]
        ]


helpContainerListItem : String -> String -> Html Msg
helpContainerListItem key action =
    li []
        [ span [ class "left" ] [ text key ]
        , span [ class "right" ] [ text action ]
        ]
