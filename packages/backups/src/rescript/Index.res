let request = () => {
  open Js.Promise
  Fetch.fetch("https://httpbin.org/get") |> then_(result =>
    {
      result |> Js.log
      ignore()
    } |> Js.Promise.resolve
  )
}

@react.component
let make = () => {
  open MaterialUi
  <Button onClick={event => request() |> ignore} color=#Primary variant=#Contained>
    {"Example Buttfefeon"->React.string}
  </Button>
}
