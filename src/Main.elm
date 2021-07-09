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
    ( { components = components
      , current = List.head (Dict.values components)
      , ui = initUI
      }
    , Cmd.none
    )


initUI : UI
initUI =
    { dialog = Nothing
    , highlighted = Nothing
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StepForwards ->
            ( Components.stepForwards model, Cmd.none )

        StepBackwards ->
            ( Components.stepBackwards model, Cmd.none )

        ToggleHelp ->
            ( { model | ui = toggleDialog model.ui }, Cmd.none )

        Highlight btn ->
            ( handleHighlight model btn, Cmd.none )

        Noop ->
            ( model, Cmd.none )


getUI : Maybe Dialog -> Maybe Button -> UI
getUI maybeDialog maybeButton =
    { dialog = maybeDialog
    , highlighted = maybeButton
    }


handleHighlight : Model -> Maybe Button -> Model
handleHighlight model maybeButton =
    let
        dialog =
            model.ui.dialog
    in
    case maybeButton of
        Just HelpButton ->
            { model | ui = getUI dialog (Just HelpButton) }

        Just NextButton ->
            { model | ui = getUI dialog (Just NextButton) }

        Just PreviousButton ->
            { model | ui = getUI dialog (Just PreviousButton) }

        Nothing ->
            { model | ui = getUI dialog Nothing }


toggleDialog : UI -> UI
toggleDialog ui =
    if ui.dialog == Just ShowHelp then
        { ui | dialog = Nothing }

    else
        { ui | dialog = Just ShowHelp }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onKeyPress (keyDecoder navKey)
        , Browser.Events.onKeyDown (keyDecoder highlightKey)
        , Browser.Events.onKeyUp (keyDecoder releaseHighlight)
        ]


keyDecoder : (String -> Msg) -> Decode.Decoder Msg
keyDecoder keyFunction =
    Decode.map keyFunction (Decode.field "key" Decode.string)


releaseHighlight : String -> Msg
releaseHighlight _ =
    Highlight Nothing


highlightKey : String -> Msg
highlightKey char =
    case char of
        "?" ->
            ToggleHelp

        "s" ->
            StepForwards

        "b" ->
            StepBackwards

        _ ->
            Noop


navKey : String -> Msg
navKey char =
    case char of
        "?" ->
            Highlight (Just HelpButton)

        "s" ->
            Highlight (Just NextButton)

        "b" ->
            Highlight (Just PreviousButton)

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
            defaultView current model.ui

        Nothing ->
            errorView



-- TODO Show error


defaultView : Component -> UI -> Html Msg
defaultView component ui =
    let
        { index, chapter } =
            component

        hasNext =
            Components.hasDirection component Next

        hasPrevious =
            Components.hasDirection component Previous

        activate =
            "activate"

        disable =
            "disable"
    in
    div [ class "container" ]
        [ div [ id "pixi-canvas" ] []
        , div [ id "game-canvas" ] []
        , div
            [ id "help-overlay"
            , classList [ ( "show", ui.dialog == Just ShowHelp ) ]
            ]
            [ helpContainer ]
        , div [ id "help-control-wrapper" ]
            [ span
                [ id "help-control"
                , class "info-control"
                , classList [ ( activate, ui.highlighted == Just HelpButton ) ]
                ]
                [ text "?" ]
            ]
        , h1 [ id "chapter-title" ] [ text (parseChapter chapter) ]
        , div [ id "toolbar-controls" ]
            [ span [ id "game-control", class "info-control additional hide" ] [ text "P" ]
            , span [ id "video-control", class "info-control additional hide" ] [ text "V" ]
            , span
                [ id "next-control"
                , class "info-control"
                , classList
                    [ ( disable, not hasNext )
                    , ( activate, ui.highlighted == Just NextButton )
                    ]
                ]
                [ text "S" ]
            , span
                [ id "previous-control"
                , class "info-control"
                , classList
                    [ ( disable, not hasPrevious )
                    , ( activate, ui.highlighted == Just PreviousButton )
                    ]
                ]
                [ text "B" ]
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


errorView : Html Msg
errorView =
    div [ class "container" ]
        [ div [ id "pixi-canvas" ] []
        , div [ id "game-canvas" ] []
        , div [ id "help-overlay" ] [ helpContainer ]
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
