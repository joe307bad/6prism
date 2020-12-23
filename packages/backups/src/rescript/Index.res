@react.component
let make = (~name) => {
  let (count, setCount) = React.useState(() => 0.0)

  <div>
    <h1> {React.string("qwqwe name")} </h1>
    <button onClick={_ => setCount(prevCount => prevCount +. 1.1)}> {React.float(count)} </button>
  </div>
}
