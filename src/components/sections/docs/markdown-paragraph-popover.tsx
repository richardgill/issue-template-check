import clsx from 'clsx'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const MarkdownParagraphPopover: FC<{
  clientRect: ClientRect
  isCollapsed: boolean
  textContent: string
}> = ({ clientRect, isCollapsed, textContent }) => {
  const [issueCreationState, setIssueCreationState] =
    useState<RequestState>('initial')
  const [didCopyText, setDidCopyText] = useState(false)
  const [didCopyLink, setDidCopyLink] = useState(false)

  useEffect(() => {
    if (!isCollapsed) {
      return
    }
    setIssueCreationState('initial')
    setDidCopyLink(false)
    setDidCopyText(false)
  }, [isCollapsed])

  useEffect(() => {
    if (didCopyText) {
      setDidCopyLink(false)
    }
  }, [didCopyText])

  useEffect(() => {
    if (didCopyLink) {
      setDidCopyText(false)
    }
  }, [didCopyLink])

  const createIssue = (selectedText: string) => {
    setIssueCreationState('pending')
    fetch('/api/open-issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedText, page: window.location.href })
    })
      .then(() => {
        setIssueCreationState('success')
        alert(
          "Thank you, we've notified the docs maintainers and we'll resolve this for you."
        )
      })
      .catch((e) => {
        setIssueCreationState('error')
        alert("We're very sorry, but this failed with message: " + e.message)
      })
  }

  if (clientRect == null || isCollapsed) {
    return null
  }

  return (
    <div
      className="fixed items-center hidden overflow-hidden text-xs rounded shadow-lg md:flex dark:border-8 dark:border-black"
      style={{
        left: `${clientRect.left + clientRect.width / 2}px`,
        top: `${clientRect.top - 40}px`
      }}
    >
      {textContent.includes(' ') && textContent.length > 140 && (
        <Button
          onClick={() => createIssue(textContent)}
          className="px-2 py-1 border-r border-r-white"
          state={issueCreationState}
        >
          {issueCreationState === 'initial'
            ? 'Please clarify this'
            : issueCreationState === 'pending'
            ? 'Flagging...'
            : issueCreationState === 'success'
            ? 'Flagged'
            : ''}
        </Button>
      )}
      <CopyToClipboard
        onCopy={() => setDidCopyLink(true)}
        text={`${
          window.location.href.split('#')[0]
        }#:~:text=${encodeURIComponent(textContent)}`}
      >
        <Button state={didCopyLink ? 'success' : 'initial'}>
          {didCopyLink ? 'Copied!' : 'Copy link'}
        </Button>
      </CopyToClipboard>
      <CopyToClipboard text={textContent} onCopy={() => setDidCopyText(true)}>
        <Button state={didCopyText ? 'success' : 'initial'}>
          {didCopyText ? 'Copied!' : 'Copy text'}
        </Button>
      </CopyToClipboard>
    </div>
  )
}

const Button: FC<
  HTMLAttributes<HTMLButtonElement> & { state: RequestState }
> = ({ children, state, ...props }) => (
  <button
    {...props}
    style={{ backdropFilter: 'blur(4px)' }}
    className={clsx(
      'py-1 px-2 border-r border-r-white dark:border-r-neutral-600 last-of-type:border-r-0 text-white font-bold transition',
      state === 'success' && 'bg-green-600',
      state === 'pending' && 'bg-yellow-600',
      state === 'initial' &&
        'bg-black/75 hover:bg-black dark:hover:bg-neutral-600 dark:bg-neutral-800'
    )}
  >
    {children}
  </button>
)
