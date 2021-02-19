import type {FunctionComponent} from 'react'

// until we get the login working
const authed = true

const Homepage: FunctionComponent = () => {
  return null
}

export const getServerSideProps = async context => {
  const session = authed

  if (context.res && !session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  return {
    props: {session},
    redirect: {
      permanent: false,
      destination: '/dashboard'
    }
  }
}

export default Homepage
