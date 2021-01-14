@react.component
let make = () => {
  let url = ReasonReactRouter.useUrl()
  let code = OpenDevToolsHooks.useQueryParam(~param="code")
  <div>
    <Nav />
    {switch url.path {
    | list{"redirect_uri"} => <AuthorizationCode code />
    | list{"list"} => <BackupsList />
    | list{"create"} => <Create />
    | _ => <Create />
    }}
  </div>
}
