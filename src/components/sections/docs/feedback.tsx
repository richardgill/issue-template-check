import {
  Alert,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

export const FeedbackButton = () => {
  const [userId, setUserId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postingFeedbackState, setPostingFeedbackState] =
    useState<RequestState>('initial')
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const $textarea = useRef<HTMLTextAreaElement>(null)

  const reset = () => {
    setFeedback('')
    setError('')
    setPostingFeedbackState('initial')
  }

  const sendFeedback = () => {
    if (!feedback) return

    setError('')
    setPostingFeedbackState('pending')
    fetch('/api/send-feedback', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        feedback,
        route: window.location.href,
        userId
      })
    })
      .then(async (r) => {
        reset()
        if (!r.ok) {
          const response = await r.text()
          throw new Error(
            `Sending feedback failed with the following output: ${response}. Please reach out to us on Slack and try again later.`
          )
        }
        reset()
        setPostingFeedbackState('success')
        $textarea.current?.focus()
      })
      .catch((e) => {
        reset()
        setPostingFeedbackState('error')
        setError(e.message)
        $textarea.current?.focus()
      })
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="primary">
        Feedback
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.metaKey) {
                sendFeedback()
              }
            }}
            onSubmit={(e) => {
              e.preventDefault()
              sendFeedback()
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <ModalHeader>Feedback</ModalHeader>
            <ModalBody>
              {postingFeedbackState === 'success' ? (
                <Alert status="success">
                  <AlertTitle>Thanks for your feedback!</AlertTitle>
                </Alert>
              ) : (
                <>
                  <Text>
                    Feel free to share any thoughts below about your experience
                    on with Xata.
                  </Text>
                  <FormControl mt={4}>
                    <FormLabel>Your Message</FormLabel>
                    <Textarea
                      placeholder="Please add as much detail as possible, and contact information if you'd like a response."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      ref={$textarea}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Your email (optional)</FormLabel>
                    <Input
                      type="email"
                      placeholder=""
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </FormControl>
                </>
              )}
              {error && (
                <Alert status="error">
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
            </ModalBody>
            <ModalFooter justifyContent="start">
              <Flex alignItems="center" gap={2}>
                <Button
                  colorScheme="primary"
                  type="submit"
                  disabled={!feedback || postingFeedbackState === 'pending'}
                >
                  {postingFeedbackState === 'initial'
                    ? 'Send'
                    : postingFeedbackState === 'error'
                    ? 'Try Again'
                    : postingFeedbackState === 'pending'
                    ? 'Sending...'
                    : postingFeedbackState === 'success'
                    ? 'Send More'
                    : ''}
                </Button>
                <Button onClick={onClose}>Close</Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
