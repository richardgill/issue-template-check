import {
  Icon,
  Box,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Text,
  Link,
  SimpleGrid,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useEffect, useState, type FC } from 'react'
import { ConsoleWithCode } from '~/components/sections/docs/markdown-content/ConsoleWithCode'

import mdToTxt from 'markdown-to-txt'
import { ChatModal } from '~/components/common/chat'
import { PageLayout } from '~/components/layout/page'
import Sidebar, { SidebarEntries } from '~/components/sections/docs/sidebar'
import { buildSidebar } from '~/components/sections/docs/sidebar/sidebar'
import { siteOrigin } from '~/lib/constants'
import theme from '~/theme/theme'
import { headerLinks } from '~/util/header-links'
import { useRouter } from 'next/router'
import { XataAnimated } from '~/components/common/loader'
import { NextIcon } from '~/components/icons/nextjs'
import { AstroIcon } from '~/components/icons/astro'
import { TypeScriptIcon } from '~/components/icons/typescript'
import { PythonIcon } from '~/components/icons/python'
import { RemixIcon } from '~/components/icons/remix'
import { SvelteIcon } from '~/components/icons/svelte'
import { OpenAIIcon } from '~/components/icons/openai'
import { ViteIcon } from '~/components/icons/vite'
import { SolidIcon } from '~/components/icons/solid'
import { VercelIcon } from '~/components/icons/vercel'

type Heading = { level: number; slug: string; text: string }

type Props = {
  sidebar: SidebarEntries
}

const ButtonCard: FC<{
  icon: JSX.Element
  title: string
  slug: string
}> = ({ icon, title, slug }) => (
  <Flex
    as="a"
    href={slug}
    bg="contrastLowest"
    border="solid 1px"
    borderColor="stroke"
    p={8}
    borderRadius={8}
    flexDir="column"
    align="center"
    gap={2}
    _hover={{
      bg: 'contrastLow',
      borderColor: 'contrastMedium',
    }}
  >
    {icon}
    {title}
  </Flex>
)

const ButtonExample: FC<{
  icon: JSX.Element
  title: string
  slug: string
}> = ({ icon, title, slug }) => (
  <Flex
    as="a"
    href={slug}
    gap={2}
    alignItems="center"
    border="solid 1px"
    borderColor="transparent"
    px={4}
    py={2}
    borderRadius="md"
    filter="grayscale(100%)"
    _hover={{ borderColor: 'contrastMedium' }}
  >
    {icon}
    <Text>{title}</Text>
  </Flex>
)

const Overview: FC<Props> = ({ sidebar }) => {
  const [showChat, setShowChat] = useState(false)
  const activeSidebarItem = '/docs/overview'

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    if (router.query['show-chat'] !== undefined) {
      setShowChat(true)
    }
  }, [router.isReady, router.query])

  return (
    <ChakraProvider theme={theme}>
      <PageLayout
        mainOverflowing={false}
        announcement={false}
        seoMetadata={{
          title: 'Xata documentation',
          description: 'Xata is a serverless database solution',
          ogImage: {
            width: 1920,
            height: 1080,
            url: `https://docs.xata.io/api/og-image?title=${encodeURIComponent(
              'Xata documentation'
            )}&subtitle=${encodeURIComponent(
              `${siteOrigin}/docs/overview`
            )}&content=${encodeURIComponent(
              mdToTxt('Xata is a serverless database solution')
            )}`,
          },
        }}
        header={{
          links: headerLinks.links,
        }}
      >
        <Flex flexDir={{ base: 'column', lg: 'row' }}>
          <Sidebar entries={sidebar} active={activeSidebarItem} />
          <Box
            as="main"
            flexGrow={1}
            mt={{ base: 24, lg: 8 }}
            px={{ base: 4, lg: 12 }}
          >
            <Flex maxW={1200} w="full" m="auto" gap={12}>
              <Box
                flexGrow={1}
                width={{ base: '100%', lg: 'calc(100vw - 690px)' }}
                maxW={960}
                m="auto"
              >
                <Flex align="center" mb={4} gap={4}>
                  <Text color="textSubtle">Want to find the answer quick?</Text>
                  <ChatModal defaultOpen={showChat} />
                </Flex>
                <Divider mb={4} />
                <Heading as="h1" size="xl" mb={4}>
                  Xata documentation
                </Heading>
                <Text mb={4}>
                  Xata is a <strong>Serverless Data Platform</strong>. It
                  combines the features of a relational database, a{' '}
                  <Link href="/docs/typescript-client/search">
                    search engine
                  </Link>
                  , and an{' '}
                  <Link href="/docs/typescript-client/aggregate">
                    analytics engine
                  </Link>{' '}
                  and exposes a single consistent REST API. Xata has first-class
                  support for{' '}
                  <Link href="/docs/cli/branches-git">branches</Link>, a
                  workflow for zero-downtime schema migrations, and edge
                  caching. Optionally it provides an{' '}
                  <Link href="/docs/api-reference/db/db_branch_name/tables/table_name/ask#ask-table">
                    ask endpoint
                  </Link>{' '}
                  to engage with with OpenAI&apos;s GPT-3 API.
                </Text>
                <Flex mb={12} gap={8}>
                  <Link href="/docs/concepts/how-it-works">
                    Xata as a data platform
                  </Link>
                  <Link href="/docs/concepts/how-it-works">
                    Learn how Xata works
                  </Link>
                  <Link href="/docs/concepts/data-model">
                    Explore the data model
                  </Link>
                </Flex>
                <Box>
                  <Heading as="h2" size="lg" mb={4}>
                    Start here
                  </Heading>
                  <Text mb={4}>
                    If you are new to Xata, we recommend you start by{' '}
                    <Link href="https://app.xata.io">creating an account</Link>,{' '}
                    <Link href="/docs/getting-started/installation">
                      installing the CLI
                    </Link>{' '}
                    and then learning about a SDK client or the REST API.
                  </Text>
                  <ConsoleWithCode language="bash">
                    {`# Installs the CLI globally
npm install -g @xata.io/cli

# Authenticate the CLI to your account
xata auth login

# Initialize xata in your project directory
xata init

# Regenerate client code and optional typings for your project
xata codegen
`}
                  </ConsoleWithCode>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
                    <Box>
                      <Heading as="h2" size="md" mb={4} mt={12}>
                        Platform quickstarts
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                        <ButtonCard
                          icon={<NextIcon boxSize={12} />}
                          title="Next.js"
                          slug="/docs/getting-started/quickstart-nextjs"
                        />
                        <ButtonCard
                          icon={<AstroIcon boxSize={12} />}
                          title="Astro"
                          slug="/docs/getting-started/quickstart-astro"
                        />
                      </SimpleGrid>
                    </Box>
                    <Box>
                      <Heading as="h2" size="md" mb={4} mt={12}>
                        Supported clients
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                        <ButtonCard
                          icon={<TypeScriptIcon boxSize={12} />}
                          title="TypeScript"
                          slug="/docs/typescript-client/overview"
                        />
                        <ButtonCard
                          icon={<PythonIcon boxSize={12} />}
                          title="Python"
                          slug="/docs/python-sdk/overview"
                        />
                      </SimpleGrid>
                    </Box>
                  </SimpleGrid>
                  <Box mt={8}>
                    <Text>
                      For managing authentication, we provide an official{' '}
                      <Link href="/docs/integrations/auth-js">
                        Auth JS integration
                      </Link>
                      .
                    </Text>
                  </Box>
                  <Heading as="h2" size="lg" mb={4} mt={12}>
                    Example code repositories on Github
                  </Heading>
                  <Text mb={12}>
                    We have several{' '}
                    <Link href="https://github.com/xataio/examples/tree/main/apps">
                      example applications
                    </Link>{' '}
                    to walk you through more complicated use cases.
                  </Text>
                  <SimpleGrid columns={{ base: 3, md: 6 }} gap={4} mb={12}>
                    <ButtonExample
                      title="Remix"
                      slug="https://github.com/remix-run/examples/tree/main/xata"
                      icon={<RemixIcon boxSize={8} />}
                    />
                    <ButtonExample
                      title="Svelte"
                      slug="https://github.com/xataio/examples/tree/main/apps/starter-sveltekit"
                      icon={<SvelteIcon boxSize={8} />}
                    />
                    <ButtonExample
                      title="GPT3"
                      slug="https://github.com/xataio/examples/tree/main/apps/sample-chatgpt"
                      icon={<OpenAIIcon boxSize={8} />}
                    />
                    <ButtonExample
                      title="Vite"
                      slug="https://github.com/xataio/examples/tree/main/apps/sample-workers-vite-react"
                      icon={<ViteIcon boxSize={8} />}
                    />
                    <ButtonExample
                      title="Solid"
                      slug="https://github.com/xataio/examples/tree/main/apps/starter-solidstart"
                      icon={<SolidIcon boxSize={8} />}
                    />
                    <ButtonExample
                      title="Vercel"
                      slug="https://github.com/xataio/examples/tree/main/apps/starter-vercel-serverless-functions"
                      icon={<VercelIcon boxSize={8} />}
                    />
                  </SimpleGrid>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </PageLayout>
    </ChakraProvider>
  )
}

export default Overview

export const getStaticProps: GetStaticProps = async () => {
  const { sidebar } = await buildSidebar('/docs/overview')
  return {
    props: {
      sidebar,
    },
  }
}
