@react.component
let make = () => {
  open MaterialUi
  <Typography>
    <Link
      href="#"
      onClick={event => {
        event->ReactEvent.Mouse.preventDefault
        ReasonReactRouter.push("/list")
      }}>
      "Backups List"
    </Link>
    <br />
    <Link
      href="#"
      onClick={event => {
        event->ReactEvent.Mouse.preventDefault
        ReasonReactRouter.push("/create")
      }}>
      "Create"
    </Link>
    <br />
    <br />
  </Typography>
}
