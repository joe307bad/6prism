@react.component
let make = () => {
  open MaterialUi
  <Button onClick={event => API.request() |> ignore} color=#Primary variant=#Contained>
    {"Example Buttfefeefewfon"->React.string}
  </Button>
}
