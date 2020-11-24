import React from "react";
import { Box, Image, Flex, Icon, Link } from "@openmined/omui";
import { Link as RRDLink } from 'react-router-dom';
import logo from '../../assets/mark-primary-trans.png';
import { FaCaretLeft } from 'react-icons/fa';

const TextLink = ({ to, title, ...props }) => (
    <Link
        to={to}
        as={RRDLink}
        mt={{ base: 4, md: 0 }}
        mr={{ base: 0, md: 6 }}
        fontFamily="heading"
        fontWeight="medium"
        color="gray.800"
        sx={{ '&:hover': { textDecoration: 'none', color: 'blue.500' } }}
        {...props}
    >
        {title}
    </Link>
);

const isUnderLocation = ({ locations, homepage = false }) => {
    if (window.location.pathname === '/')
        return homepage
    return Array.isArray(locations) ?
        locations.some(location =>
            window.location.pathname.indexOf(location) !== -1)
        : window.location.pathname.indexOf(locations) !== -1
}

const Header = props => {
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
            {...props}
        >
            <Link to="/" as={RRDLink} ml={2} mr={4}>
                <Image src={logo} alt="PyGrid" width="50px" height="50px" />
            </Link>
            <Box
                width={{ base: 'full', md: 'auto' }}
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems="center"
                flexGrow={1}
            >
                {isUnderLocation({ locations: ['/datasets', '/users', '/infrastructure', '/settings'] }) && (
                    <Link to="/" as={RRDLink} ml={2} mr={4}>
                        <Icon
                            as={FaCaretLeft}
                            color="gray.400"
                            boxSize={22}
                        />
                    </Link>
                )}
                {isUnderLocation({ locations: ['/datasets', '/models', '/finances'], homepage: true }) && (
                    < TextLink
                        to="/datasets"
                        title="Datasets"
                    />
                )}
                {isUnderLocation({ locations: '/datasets' }) && (
                    <>
                        <TextLink
                            to="/datasets/requests"
                            title="Requests"
                        />
                        < TextLink
                            to="/datasets/tensors"
                            title="Tensors"
                        />
                    </>
                )}
                {isUnderLocation({ locations: ['/models', '/finances'], homepage: true }) && (
                    <>
                        <TextLink
                            to="/models"
                            title="Models"
                        />
                    </>
                )}
                {isUnderLocation({ locations: ['/users', '/models', '/finances'], homepage: true }) && (
                    <TextLink
                        to="/users"
                        title="Users"
                    />
                )}
                {isUnderLocation({ locations: '/users' }) && (
                    <>
                        <TextLink
                            to="/users/groups"
                            title="Groups"
                        />
                        <TextLink
                            to="/users/roles"
                            title="Roles"
                        />
                    </>
                )}
                {isUnderLocation({ locations: ['/infrastructure', '/models', '/finances'], homepage: true }) && (
                    <TextLink
                        to="/infrastructure"
                        title="Infrastructure"
                    />
                )}
                {isUnderLocation({ locations: '/infrastructure' }) && (
                    <>
                        <TextLink
                            to="/infrastructure/nodes"
                            title="Nodes"
                        />
                        <TextLink
                            to="/infrastructure/workers"
                            title="Workers"
                        />
                    </>
                )}
                {isUnderLocation({ locations: ['/finances', '/models', '/finances'], homepage: true }) && (
                    <TextLink
                        to="/finances"
                        title="Finances"
                    />
                )}
                {isUnderLocation({ locations: ['/settings', '/models', '/finances'], homepage: true }) && (
                    <TextLink
                        to="/settings"
                        title="Settings"
                    />
                )}
                {isUnderLocation({ locations: '/settings' }) && (
                    <>
                        <TextLink
                            to="/settings/infrastructure"
                            title="Infrastructure"
                        />
                        <TextLink
                            to="/settings/associations"
                            title="Associations"
                        />
                        <TextLink
                            to="/settings/monetization"
                            title="Monetization"
                        />

                        <TextLink
                            to="/settings/branding"
                            title="Branding"
                        />
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default Header;
