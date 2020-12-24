@react.component
let make = (~name) => {
  let (count, setCount) = React.useState(() => 0.0)
  let subheader = <li />
  open MaterialUi

  <div>
    <h1> {"wfwef name"->React.string} </h1>
    <MaterialUi_Typography> {"Some example text"->React.string} </MaterialUi_Typography>
    <List subheader>
      {React.array(
        [0, 1, 2, 3, 4] |> Array.map(sectionId =>
          <li key={"section-" ++ string_of_int(sectionId)}>
            <ul>
              {React.array(
                Array.append(
                  [
                    <ListSubheader key="header">
                      {React.string("I'm sticky " ++ string_of_int(sectionId))}
                    </ListSubheader>,
                  ],
                  [0, 1, 2] |> Array.map(item =>
                    <ListItem
                      button=true
                      key={"item-" ++ (string_of_int(sectionId) ++ ("-" ++ string_of_int(item)))}>
                      <ListItemText> {React.string("Item " ++ string_of_int(item))} </ListItemText>
                    </ListItem>
                  ),
                ),
              )}
            </ul>
          </li>
        ),
      )}
    </List>
  </div>
}
