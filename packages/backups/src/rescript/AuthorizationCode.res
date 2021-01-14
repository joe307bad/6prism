@react.component
let make = (~code) => {
  code |> Js.log
  <div> {"Authorizing"->React.string} </div>
}
