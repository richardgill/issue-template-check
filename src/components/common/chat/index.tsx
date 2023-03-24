import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MarkdownContent } from '~/components/sections/docs/markdown-content'
import { useAskXataDocs } from '~/hooks/use-ask-docs'
import { useGetXataDocs } from '~/hooks/use-get-docs'
import { XataAnimated } from '../loader/'

interface ChatModalProps {
  defaultOpen?: boolean
}

const questions = [
  'How do I install the Xata CLI?',
  'How do I paginate records?',
  'How do you get a record by id?',
  'How do I perform an aggregate request?',
  'How do you filter a table named users by the email?',
  'What is the version column used for?',
  'How can I import a CSV file with custom column types?',
  'What is the difference between the aggregate and summarize API?',
]

export const ChatModal: React.FC<ChatModalProps> = ({ defaultOpen }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { answer, records, askQuestion, isLoading, clearAnswer, error } =
    useAskXataDocs()
  const relatedDocs = useGetXataDocs(records)

  const [value, setValue] = useState('')
  const handleClose = () => {
    onClose()
    setValue('')
    clearAnswer()
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    askQuestion(value)
  }

  const handleQuestionClick = (question: string) => {
    setValue(question)
    askQuestion(question)
  }

  useEffect(() => {
    if (value === '') {
      clearAnswer()
    }
  }, [value])

  useEffect(() => {
    if (defaultOpen) onOpen()
  }, [defaultOpen])

  return (
    <>
      <Button size="xs" colorScheme="primary" onClick={onOpen}>
        Ask our chat bot
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent h={isLoading || !!answer ? '60vh' : 'auto'}>
          <ModalHeader mt={2}>
            <form onSubmit={handleFormSubmit}>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Ask any question about Xata"
                  size="lg"
                  pr={16}
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <InputRightElement w={12} mt={2} mr={2}>
                  <Button colorScheme="primary" type="submit">
                    Ask
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          </ModalHeader>

          <ModalBody
            maxH="100%"
            overflow="hidden"
            display="flex"
            flexDir="column"
          >
            {!!answer ? (
              <>
                <Flex
                  p={4}
                  borderTopRadius="md"
                  borderBottomRadius={records?.length > 0 ? 'inherit' : 'md'}
                  bg="contrastLowest"
                  overflowY="auto"
                  flexGrow={1}
                >
                  <MarkdownContent>{answer}</MarkdownContent>
                </Flex>
                {relatedDocs?.length > 0 ? (
                  <Flex
                    wrap="wrap"
                    p={4}
                    gap={2}
                    alignItems="center"
                    bg="contrastLowest"
                    borderBottomRadius="md"
                    borderTop="solid 1px"
                    borderColor="stroke"
                  >
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      color="textSubtle"
                    >
                      More details
                    </Text>
                    {relatedDocs.map(({ id, title, slug }) => (
                      <Button
                        key={`related-docs-${id}`}
                        size="xs"
                        onClick={() =>
                          window.open(
                            `https://xata.io/${slug}`,
                            '_blank',
                            'noopener'
                          )
                        }
                      >
                        {title}
                      </Button>
                    ))}
                  </Flex>
                ) : null}
              </>
            ) : isLoading ? (
              <Flex justifyContent="center" alignItems="center" h="100%">
                <XataAnimated />
              </Flex>
            ) : error ? (
              <Text fontWeight="semibold" fontSize="sm">
                {error}
              </Text>
            ) : (
              <>
                <Text fontSize="xs" fontWeight="semibold" color="textSubtle">
                  Some questions to try
                </Text>
                <Flex flexWrap="wrap" my={4} gap={4}>
                  {questions.map((question, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </Flex>
              </>
            )}
          </ModalBody>

          <ModalFooter
            justifyContent="start"
            flexDir="column"
            alignItems="start"
          >
            <Text color="textSubtle" fontWeight="normal" fontSize="xs">
              This feature is powered by Xata and OpenAI. Read this{' '}
              <Link href="https://xata.io/blog/chatgpt-on-your-data">
                blog post
              </Link>{' '}
              to learn more.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
