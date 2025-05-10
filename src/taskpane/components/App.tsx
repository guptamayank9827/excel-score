import * as React from "react";
import TextInsertion from "./TextInsertion";
import { makeStyles, tokens } from "@fluentui/react-components";
import { insertText } from "../taskpane";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  message: {
      fontSize: tokens.fontSizeBase500,
      fontColor: tokens.colorNeutralBackgroundStatic,
      fontWeight: tokens.fontWeightRegular,
      paddingLeft: "10px",
      paddingRight: "10px",
    },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>

      <h2 className={styles.message}>Save the Scores!</h2>

      <TextInsertion insertText={insertText} />
    </div>
  );
};

export default App;
