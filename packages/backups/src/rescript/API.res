let request = () => {
  open Js.Promise
  Fetch.fetch("https://httpbin.org/get") |> then_(result => result |> Js.log |> Js.Promise.resolve)
}
