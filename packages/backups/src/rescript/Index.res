@react.component
let make = () => {
  let url = ReasonReactRouter.useUrl()
  <div>
    <Nav />
    {switch url.path {
    | list{"list"} => <BackupsList />
    | list{"create"} => <Create />
    | _ => <Create />
    }}
  </div>
}
