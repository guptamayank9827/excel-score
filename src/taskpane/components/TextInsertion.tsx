import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, makeStyles } from "@fluentui/react-components";

interface TextInsertionProps {
  insertText: (text: string, startColumn: string) => void;
}

const useStyles = makeStyles({
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    margin:"20px",
    minHeight: "200px"
    // maxWidth: "50%",
  },
  textAreaFieldSmall: {
    margin:"20px",
    minHeight: "100px"
  },
});

const TextInsertion: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  const [text, setText] = useState<string>("");
  const [startColumn, setStartColumn] = useState<string>("F");

  const handleColumnChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setStartColumn(event.target.value);
  }

  const handleTextInsertion = async () => {
    await props.insertText(text, startColumn);
    setText("");
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>

      <Field className={styles.textAreaFieldSmall} size="small" label="Column Name to start scores.">
        <Textarea size="small" value={startColumn} onChange={handleColumnChange} />
      </Field>

      <Field className={styles.textAreaField} size="large" label="Enter feedback">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>

      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Save Score
      </Button>
    </div>
  );
};

export default TextInsertion;
