import { useState } from "react";

const withCommentInput = (OriginalComponent) => {
      function NewComponent() {
            const [comment, setComment] = useState("");
            return <OriginalComponent
                  comment={comment}
                  setComment={setComment}
            />
      }
      return NewComponent;
}

export default withCommentInput;