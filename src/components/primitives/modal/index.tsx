import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import Image from 'next/image'

import { ButtonLink } from '../../primitives/button-link'
import { Button } from '../button'
import { Input } from '../input'
import s from './modal.module.scss'

type ModalProps = {
  open: boolean
  onOpenChange: () => void
}

export const Modal = ({ open, onOpenChange }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[60] bg-black bg-opacity-80" />
      <Dialog.Content
        className={clsx(
          s['fade-in'],
          'fixed z-[60] border border-gray rounded-lg overflow-y-hidden left-1/2 -translate-y-1/2 top-1/2 -translate-x-1/2 w-full h-full max-h-[395px] max-w-[90vw] md:max-w-[80vw] md:max-h-[70vh] lg:max-h-[450px] 2xl:max-w-[1098px] 2xl:max-h-[468px] outline-none'
        )}
      >
        <div className="flex flex-col w-full h-full bg-blue-darker lg:grid lg:grid-cols-2">
          <div className="relative z-50 flex-1 hidden lg:block">
            <Image
              alt="xata logo banner"
              fill
              loading="eager"
              priority
              src="/images/primitives/modal/modal-image.svg"
            />
          </div>
          <div
            className={clsx(
              s['gradient'],
              'relative top-0 lg:border-l border-gray overflow-y-auto flex w-full flex-col justify-center items-center bottom-0 z-20 flex-1 transform -translate-x-1/2 left-1/2 max-w-max px-7 py-14 sm:px-20 sm:py-10 md:px-28 md:py-20 lg:p-14 2xl:p-[72px]'
            )}
          >
            <Dialog.Close asChild>
              <Button
                variant="unstyled"
                className="absolute z-20 flex top-2 right-2 lg:top-6 lg:right-6"
              >
                <Image
                  src="/icons/layout/header/cross.svg"
                  width={24}
                  height={24}
                  alt="close"
                />
              </Button>
            </Dialog.Close>
            <Dialog.Title asChild>
              <h4 className="font-semibold text-center text-xata-xl leading-8 sm:text-3xl md:leading-9 lg:text-3xl lg:leading-10 xl:text-[38px] xl:leading[53px]">
                Join the Xata waitlist
              </h4>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="mt-6 mb-10 text-lg text-center leading-mobile md:leading-6">
                Add your email address to be among the first to try out our new
                serverless database service.
              </p>
            </Dialog.Description>
            <form
              className="w-full space-y-4 lg:space-y-6"
              action="https://Xata.us7.list-manage.com/subscribe/post?u=a7342938b4d3b5f53889dac94&amp;id=05d2d686b7"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
            >
              <Input
                name="EMAIL"
                id="mce-EMAIL"
                type="email"
                placeholder="Email"
                autoFocus
              />
              <ButtonLink
                className="w-full whitespace-nowrap !text-sm md:!text-lg"
                centered
                withLogo={true}
                href="https://app.xata.io/signin"
              >
                Start building for free
              </ButtonLink>
            </form>
            <Dialog.Close asChild>
              <Button
                variant="unstyled"
                className="absolute z-20 flex top-2 right-2 lg:top-6 lg:right-6"
              >
                <Image
                  alt="close"
                  height={24}
                  src="/icons/layout/header/cross.svg"
                  width={24}
                />
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
