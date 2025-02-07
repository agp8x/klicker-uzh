import { useState } from 'react'
import dayjs from 'dayjs'
import { Icon, Button, TextArea, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

interface IFeedbackResponse {
  id: string
  content: string
  positiveReactions: number
  negativeReactions: number
  createdAt: string
}

interface IFeedback {
  content: string
  createdAt: string
  votes: number
  resolved: boolean
  pinned: boolean
  responses: IFeedbackResponse[]
  resolvedAt: string
}

interface Props extends IFeedback {
  onDeleteFeedback: () => void
  onPinFeedback: (pinState: boolean) => void
  onResolveFeedback: (resolvedState: boolean) => void
  onRespondToFeedback: (response: string) => void
  onDeleteResponse: (responseId: string) => void
}

const defaultProps = {
  onDelete: (f): any => f,
}

function Feedback({
  content,
  createdAt,
  votes,
  resolved,
  pinned,
  responses,
  onDeleteFeedback,
  onDeleteResponse,
  onPinFeedback,
  onResolveFeedback,
  onRespondToFeedback,
}: Props) {
  const [isEditingActive, setIsEditingActive] = useState(false)
  const [isBeingDeleted, setIsBeingDeleted] = useState(false)

  const formik = useFormik({
    initialValues: {
      response: '',
    },
    validationSchema: Yup.object().shape({
      response: Yup.string().min(1).required(),
    }),
    onSubmit: (values, { resetForm }) => {
      onRespondToFeedback(values.response)
      resetForm()
    },
  })

  return (
    <div>
      <div
        className="flex items-center pl-4 p-2 border border-solid bg-primary-10% border-primary rounded shadow hover:shadow-md hover:cursor-pointer"
        role="button"
        onClick={() => setIsEditingActive((prev) => !prev)}
      >
        <div className="flex-1 no-page-break-inside">
          <p className="mb-0">{content}</p>
          <div className="flex flex-row items-end mt-2 text-gray-500">
            <div>{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}</div>
            <div className="ml-8">
              {resolved ? (
                <div>
                  <Icon name="check" /> Resolved during session
                </div>
              ) : (
                <div>
                  <Icon name="discussions" />
                </div>
              )}
            </div>
            <div className="ml-4">{pinned && <Icon name="pin" />}</div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-initial print:hidden">
          <div className="text-xl text-gray-500">
            {votes} <Icon name="thumbs up outline" />
          </div>
          <div className="flex flex-row items-end mt-2">
            {responses?.length > 0 && <div className="mr-4 text-gray-500">{responses.length} responses given</div>}
            <Button
              compact
              basic={!isBeingDeleted}
              className="!mr-2"
              color={isBeingDeleted ? 'red' : undefined}
              icon="trash"
              size="tiny"
              onClick={(e) => {
                e.stopPropagation()
                if (isBeingDeleted) {
                  onDeleteFeedback()
                } else {
                  setIsBeingDeleted(true)
                }
              }}
            />
            <Button
              basic
              compact
              icon={isEditingActive ? 'arrow up' : 'arrow down'}
              size="tiny"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditingActive((prev) => !prev)
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'p-4 print:p-2 print:pr-0 border print:border-0 border-t-0 border-gray-300 border-solid',
          !isEditingActive && 'hidden print:block'
        )}
      >
        <div>
          {responses.map((response) => (
            <div
              className="flex flex-row pl-4 mt-2 border border-solid border-l-[5px] print:border-l-[10px] first:mt-0 last:mb-4 items-start bg-gray-50 py-1 print:pr-0 rounded shadow-sm no-page-break-inside"
              key={response.createdAt}
            >
              <div className="flex-1">
                <p className="mb-0 prose">{response.content}</p>
                <div className="mt-1 text-sm text-gray-500">{dayjs(response.createdAt).format('DD.MM.YYYY HH:mm')}</div>
              </div>
              <div className="flex flex-row items-center flex-initial print:hidden">
                <div className={clsx('text-gray-500')}>
                  {response.positiveReactions} <Icon name="thumbs up outline" />
                </div>
                <div className={clsx('ml-2', 'text-gray-500')}>
                  {response.negativeReactions} <Icon name="question" />
                </div>
                <div className="ml-2 print:hidden">
                  <Button basic compact icon="trash" size="tiny" onClick={() => onDeleteResponse(response.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex print:hidden">
          <div className="flex-1">
            <Form className="h-full">
              <TextArea
                autoFocus
                className="h-full"
                disabled={resolved}
                id="response"
                placeholder={resolved ? 'Reopen the feedback to add a new response...' : 'Write your response here...'}
                rows={3}
                value={formik.values.response}
                onChange={formik.handleChange}
              />
            </Form>
          </div>
          <div className="flex flex-col flex-initial pl-4">
            <Button
              compact
              className="!mr-0"
              content={pinned ? 'Unpin' : 'Pin'}
              disabled={resolved}
              icon="pin"
              labelPosition="left"
              onClick={() => onPinFeedback(!pinned)}
            />
            <Button
              compact
              className="!mt-2 !mr-0"
              content={resolved ? 'Reopen' : 'Resolve'}
              icon={resolved ? 'lock open' : 'lock'}
              labelPosition="left"
              onClick={() => {
                onResolveFeedback(!resolved)
                if (!resolved) {
                  setIsEditingActive(false)
                }
              }}
            />
            <Button
              compact
              primary
              className="!mt-2 !mr-0"
              content="Respond"
              disabled={resolved || !formik.isValid || !formik.dirty}
              icon="send"
              labelPosition="left"
              onClick={() => {
                formik.submitForm()
                setIsEditingActive(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Feedback.defaultProps = defaultProps

export default Feedback
