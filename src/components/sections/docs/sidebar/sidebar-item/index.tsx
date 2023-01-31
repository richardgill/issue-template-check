import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Link,
  Text,
  Tooltip
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

type SidebarItem = {
  href: string
  label: string
}

export type SidebarItemProps =
  | {
      content: (SidebarItem & {
        badge?: { label: string; backgroundColor: string }
        description?: string
      })[]
      accordion: boolean
      label: string
      href?: never
      position?: number
      allowTooltip?: boolean
    }
  | {
      label: string
      href: string
      accordion?: false
      content?: never
      allowTooltip?: boolean
    }

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  content,
  allowTooltip = false
}) => {
  const router = useRouter()

  return (
    <AccordionItem key={label} border="none">
      <AccordionButton
        fontSize="xs"
        p={0}
        textTransform="uppercase"
        fontWeight="bold"
      >
        {label}
        <AccordionIcon color="textSubtle" ml={1} />
      </AccordionButton>
      <AccordionPanel px={0} pt={1} pb={4}>
        {content?.map((item, index) => {
          const isActive = router.asPath === item.href
          let sidebarLink = (
            <Link
              as={NextLink}
              href={item.href}
              fontSize="sm"
              color={isActive ? 'text' : 'textSubtle'}
              fontWeight={isActive ? 'bold' : 'normal'}
              bg={isActive ? 'bgInfo' : 'transparent'}
              borderRadius="md"
              py={1}
              px={2}
              ml={1}
              noOfLines={1}
              display="flex"
              alignItems="center"
              gap={1}
              _hover={{
                color: 'text',
                textDecoration: 'none',
                bg: isActive ? 'bgInfo' : 'contrastLow'
              }}
            >
              <Box flexGrow={1}>
                <Text noOfLines={1}>{item.label}</Text>
              </Box>
              {item.badge && (
                <Badge
                  variant="subtle"
                  fontSize="xx-small"
                  py={0}
                  px={1}
                  minW={12}
                  textAlign="center"
                  colorScheme={item.badge.backgroundColor}
                  sx={{
                    textDecoration: 'none !important'
                  }}
                >
                  {item.badge.label}
                </Badge>
              )}
            </Link>
          )

          if (allowTooltip) {
            sidebarLink = (
              <Tooltip
                openDelay={500}
                label={
                  <>
                    <Text>{item.label}</Text>
                    <Text fontSize="xs">{item.description}</Text>
                  </>
                }
                key={index}
                placement="right"
              >
                {sidebarLink}
              </Tooltip>
            )
          }

          return sidebarLink
        })}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default SidebarItem
