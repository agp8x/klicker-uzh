import React, { useState } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

interface Props {
  content: string
}

const defaultProps = {}

function LecturerFeedback({ content }: Props): React.ReactElement {
  const [votes, setVotes] = useState(0)
  return (
    <div className="container">
      <div className="feedback">
        <div className="content">{content}</div>
        <Button onClick={() => setVotes((prevVotes) => prevVotes + 1)}>{votes}</Button>
      </div>

      <style jsx>{`
        @import 'src/theme';

        .container {
          flex-direction: column;
        }

        .feedback {
          display: flex;

          background: $color-primary-10p;
          border: 1px solid $color-primary;

          .content,
          .delete {
            padding: 0.7rem;
          }

          .content {
            flex: 1;
          }
        }
      `}</style>
    </div>
  )
}

LecturerFeedback.defaultProps = defaultProps

export default LecturerFeedback
