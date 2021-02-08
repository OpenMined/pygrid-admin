import React from 'react'
import Image from 'next/image'
import {Box, Flex, Icon, Link} from '@openmined/omui'

import {default as NextLink} from 'next/link'
import {useRouter} from 'next/router'

import {FaCaretLeft} from 'react-icons/fa'

const TextLink = ({href, title, ...props}) => (
  <NextLink href={href} passHref>
    <Link
      mt={{base: 4, md: 0}}
      mr={{base: 0, md: 6}}
      fontFamily="heading"
      fontWeight="medium"
      color="gray.800"
      sx={{'&:hover': {textDecoration: 'none', color: 'blue.500'}}}
      {...props}>
      {title}
    </Link>
  </NextLink>
)

const Header = props => {
  const router = useRouter()

  const isUnderLocation = ({locations, homepage = false}) => {
    if (router.pathname === '/') return homepage
    return Array.isArray(locations)
      ? locations.some(location => router.pathname.indexOf(location) !== -1)
      : router.pathname.indexOf(locations) !== -1
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={3}
      bg="gray.50"
      shadow="base"
      fontFamily="heading"
      {...props}>
      <NextLink href="/" passHref>
        <Link ml={2} mr={4}>
          <Image src="/assets/logo.png" alt="PyGrid logo" width={50} height={50} />
        </Link>
      </NextLink>
      <Box
        width={{base: 'full', md: 'auto'}}
        flexDirection={{base: 'column', md: 'row'}}
        alignItems="center"
        flexGrow={1}>
        {isUnderLocation({
          locations: ['/datasets', '/users', '/infrastructure', '/settings']
        }) && (
          <NextLink href="/" passHref>
            <Link ml={2} mr={4}>
              <Icon as={FaCaretLeft} color="gray.400" boxSize={22} />
            </Link>
          </NextLink>
        )}
        {isUnderLocation({
          locations: ['/datasets', '/models', '/finances'],
          homepage: true
        }) && <TextLink href="/datasets" title="Datasets" />}
        {isUnderLocation({locations: '/datasets'}) && (
          <>
            <TextLink href="/datasets/requests" title="Requests" />
            <TextLink href="/datasets/tensors" title="Tensors" />
          </>
        )}
        {isUnderLocation({
          locations: ['/models', '/finances'],
          homepage: true
        }) && (
          <>
            <TextLink href="/models" title="Models" />
          </>
        )}
        {isUnderLocation({
          locations: ['/users', '/models', '/finances'],
          homepage: true
        }) && <TextLink href="/users" title="Users" />}
        {isUnderLocation({locations: '/users'}) && (
          <>
            <TextLink href="/users/groups" title="Groups" />
            <TextLink href="/users/roles" title="Roles" />
          </>
        )}
        {isUnderLocation({
          locations: ['/infrastructure', '/models', '/finances'],
          homepage: true
        }) && <TextLink href="/infrastructure" title="Infrastructure" />}
        {isUnderLocation({locations: '/infrastructure'}) && (
          <>
            <TextLink href="/infrastructure/nodes" title="Nodes" />
            <TextLink href="/infrastructure/workers" title="Workers" />
          </>
        )}
        {isUnderLocation({
          locations: ['/finances', '/models', '/finances'],
          homepage: true
        }) && <TextLink href="/finances" title="Finances" />}
        {isUnderLocation({
          locations: ['/settings', '/models', '/finances'],
          homepage: true
        }) && <TextLink href="/settings" title="Settings" />}
        {isUnderLocation({locations: '/settings'}) && (
          <>
            <TextLink href="/settings/infrastructure" title="Infrastructure" />
            <TextLink href="/settings/associations" title="Associations" />
            <TextLink href="/settings/monetization" title="Monetization" />
            <TextLink href="/settings/branding" title="Branding" />
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Header
